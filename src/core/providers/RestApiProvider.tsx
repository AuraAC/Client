import React, {Context, useCallback, useState} from "react";
import axios from "axios";
import config from "../../config";
import {tokenStorage} from "../../bundles/common/tokenStorage";
import {navigate} from "@reach/router";

export interface RestApiContextProps {
	isReady: boolean;
	get: (url: string) => Promise<any>;
	post: (url: string, params: object, timeout?: number) => Promise<any>;
	del: (url: string, params: object) => Promise<any>;
	upload: (url: string, formData: any, timeout?: number) => Promise<any>;
}

export const RestApiContext: Context<RestApiContextProps> = React.createContext(
	null
);

let refreshPromise: Promise<string> = null; // keep track of the current refresh request, don't call it if it's in progress

const refreshParams = {
	operationName: "RefreshToken",
	query: `mutation RefreshToken { refreshToken }`,
};

export const RestApiProvider: React.FC = ({children}) => {
	const [isReady] = useState(false);

	axios.defaults.baseURL = config.apiUrlRest;

	const processRefreshPromise = () => {
		if (refreshPromise) return;

		refreshPromise = axios
			.post("/", refreshParams, {
				baseURL: config.apiUrl,
				withCredentials: true,
				headers: {"Content-Type": "application/json; charset=utf-8"},
			})
			.then((refreshResponse: any) => {
				if (
					refreshResponse.status === 200 &&
					// refreshResponse.data &&
					// refreshResponse.data.data &&
					refreshResponse.data?.data?.refreshToken
				) {
					const newAccessToken = refreshResponse.data.data.refreshToken;
					tokenStorage.accessToken = newAccessToken;
					return newAccessToken;
				}

				try {
					const errorCode = refreshResponse.data.errors[0].extensions.code;
					if (errorCode === "auth.token_verification") {
						// authContext.clearSession();
						navigate("/login").then();
						return;
					}
				} catch {
				}

				// TODO: what should actually be thrown here?
				throw new Error();
			})
			.catch((err) => {
				console.warn("processRefreshPromise refreshPromise error:", err);
				refreshPromise = null;
			});
	};

	const get = useCallback((url: string) => {
		let requestConfig: any = {};
		if (tokenStorage.accessToken)
			requestConfig.headers = {
				Authorization: `Bearer ${tokenStorage.accessToken}`,
			};

		return axios.get(url, requestConfig).catch((error: any) => {
			if (error.response && error.response.status === 403) {
				processRefreshPromise();

				return refreshPromise.then((newAccessToken) => {
					refreshPromise = null;
					if (newAccessToken) {
						// Set the authorization header on the original options parameter to the new access token we got
						(requestConfig.headers as any)["Authorization"] = `Bearer ${newAccessToken}`;

						// Return the promise from the new fetch (which should now have used an active access token)
						// If the initialRequest had errors, this fetch that is returned below is the final result.
						return axios.get(url, requestConfig);
					}
				});
			} else {
				console.warn("EAP error", JSON.stringify(error));
				// Just rethrow as is if error code is not 403
				refreshPromise = null;
				throw error;
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const post = useCallback((url: string, params: any, timeout?: number) => {

		console.log('>> RestApiProvider post', url, params, tokenStorage.accessToken);

		let requestConfig: any = {
			timeout: timeout ? timeout : 60000,
		};
		if (tokenStorage.accessToken)
			requestConfig.headers = {
				Authorization: `Bearer ${tokenStorage.accessToken}`,
			};

		return axios.post(url, params, requestConfig).catch((error: any) => {
			if (error.response && error.response.status === 403) {
				processRefreshPromise();

				return refreshPromise.then((newAccessToken) => {
					refreshPromise = null;
					(requestConfig.headers as any)[
						"Authorization"
						] = `Bearer ${newAccessToken}`;
					return axios.post(url, params, requestConfig);
				});
			} else {
				refreshPromise = null;
				throw error;
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const del = useCallback((url: string, params: any) => {
		let requestConfig: any = {
			data: params,
		};
		if (tokenStorage.accessToken)
			requestConfig.headers = {
				Authorization: `Bearer ${tokenStorage.accessToken}`,
			};

		return axios.delete(url, requestConfig).catch((error: any) => {
			if (error.response && error.response.status === 403) {
				processRefreshPromise();

				return refreshPromise.then((newAccessToken) => {
					refreshPromise = null;
					(requestConfig.headers as any)[
						"Authorization"
						] = `Bearer ${newAccessToken}`;
					return axios.delete(url, requestConfig);
				});
			} else {
				refreshPromise = null;
				throw error;
			}
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	// deps: post

	// const upload = useCallback((url: string, formData: any, timeout?: number) => {
	//
	// 	let uploadConfig: any = {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data"
	// 		},
	// 		timeout: timeout ? timeout : 60000
	// 	};
	//
	// 	if (tokenStorage.accessToken) uploadConfig.headers = {Authorization: `Bearer ${tokenStorage.accessToken}`};
	//
	// 	return axios.post(url, formData, uploadConfig)
	// 		.catch((error: any) => {
	// 			if (error.response && error.response.status === 403) {
	// 				processRefreshPromise();
	//
	// 				return refreshPromise.then((newAccessToken) => {
	// 					refreshPromise = null;
	// 					(uploadConfig.headers as any)['Authorization'] = `Bearer ${newAccessToken}`;
	// 					return axios.post(url, formData, uploadConfig);
	// 				});
	// 			} else {
	// 				refreshPromise = null;
	// 				throw error;
	// 			}
	// 		});
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	const upload = (url: string, formData: any, timeout?: number) => {
		let uploadConfig: any = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			timeout: timeout ? timeout : 60000,
		};

		if (tokenStorage.accessToken)
			uploadConfig.headers = {
				Authorization: `Bearer ${tokenStorage.accessToken}`,
			};

		return axios.post(url, formData, uploadConfig).catch((error: any) => {
			if (error.response && error.response.status === 403) {
				processRefreshPromise();

				return refreshPromise.then((newAccessToken) => {
					refreshPromise = null;
					(uploadConfig.headers as any)[
						"Authorization"
						] = `Bearer ${newAccessToken}`;
					return axios.post(url, formData, uploadConfig);
				});
			} else {
				refreshPromise = null;
				throw error;
			}
		});
	};

	return (
		<RestApiContext.Provider
			value={{
				isReady: isReady,
				post: post,
				get: get,
				del: del,
				upload: upload,
			}}
		>
			{children}
		</RestApiContext.Provider>
	);
};
