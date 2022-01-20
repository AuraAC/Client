import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createUploadLink} from "apollo-upload-client";
import {tokenStorage} from "../bundles/common/tokenStorage";
import remoteSchema from "./remote.schema.graphql";
import localSchema from "./local.schema.graphql";
import {localResolvers} from "./local.resolvers";
//import { navigate } from "@reach/router";
import config from "../config";

import {split} from "apollo-link";
import {WebSocketLink} from "apollo-link-ws";
import {getMainDefinition} from "apollo-utilities";
import {navigate, useLocation} from "@reach/router";

const cache = new InMemoryCache();

let refreshPromise: Promise<string> = null; // keep track of the current refresh request, don't call it if it's in progress

const fetchWithToken = (
	uri: string,
	options: RequestInit
): Promise<Response> => {
	let originalResponse: Response = null;

	// console.log('>>> fetchWithToken', uri, options, tokenStorage.accessToken);

	// Do not remove!
	if (tokenStorage.accessToken) {
		(options.headers as any)["Authorization"] = `Bearer ${tokenStorage.accessToken}`;
	}

	return fetch(uri, options)
		.then((response) => {
			originalResponse = response;
			// console.log('>>> fetchWithToken then 1, response:', response);
			return response.clone().json();
		})
		.then((json) => {

			// console.log('>>> fetchWithToken then 2 json:', json);

			if (
				json &&
				json.errors &&
				json.errors[0] &&
				json.errors[0].extensions &&
				json.errors[0].extensions.code === "UNAUTHENTICATED"
			) {
				if (!refreshPromise) {
					const params = {
						operationName: "RefreshToken",
						query: `
									mutation RefreshToken {
										refreshToken
									}
								`,
					};

					// Execute the re-authorization request and set the promise returned to this.refreshPromise
					refreshPromise = fetch(uri, {
						method: "POST",
						credentials: "include",
						headers: {
							"Content-Type": "application/json; charset=utf-8",
						},
						body: JSON.stringify(params),
					})
						.then((refreshResponse) => refreshResponse.json())
						.then((refreshResponseJson) => {
							if (refreshResponseJson.data && refreshResponseJson.data.refreshToken) {
								const newToken = refreshResponseJson.data.refreshToken as string;

								// console.log('>>> fetchWithToken refreshPromise newToken:', newToken);

								tokenStorage.accessToken = newToken;
								return newToken;
							} else {
								tokenStorage.clearToken();

								const location = useLocation();
								console.log('>>> apolloClient redirect to login, location:', location);

								navigate("/login").then();
							}
						})
						.catch((error) => {
							return Promise.reject(error);
						});
				}

				return refreshPromise.then((newAccessToken) => {
					refreshPromise = null;

					// Set the authorization header on the original options parameter to the new access token we got
					(options.headers as any)["Authorization"] = `Bearer ${newAccessToken}`;

					// Return the promise from the new fetch (which should now have used an active access token)
					// If the initialRequest had errors, this fetch that is returned below is the final result.
					// console.log('>>> fetchWithToken fetch promise:', uri, options);
					return fetch(uri, options);
				});
			}

			// If there were no errors in the initialRequest, return original response.
			// console.log('>>> fetchWithToken return originalResponse');
			return originalResponse;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
};

const wsLink = new WebSocketLink({
	uri: config.apiUrlWS,
	options: {
		reconnect: true,
		// timeout: 10000,
		// connectionParams: {
		// 	authToken: tokenStorage.accessToken,
		// },
	},
});

const uploadLink = createUploadLink({
	uri: config.apiUrl,
	credentials: "include",
	fetch: fetchWithToken,
});

const link = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	uploadLink
);

export const apolloClient = new ApolloClient({
	cache,
	typeDefs: [remoteSchema, localSchema],
	resolvers: localResolvers,
	link: link,
});
