import React, {useContext, useRef, useState} from "react";
import {Link, RouteComponentProps} from '@reach/router';
import styled from 'styled-components';
import config from "../../../config";
import {useMutation} from '@apollo/react-hooks';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {LoginResult, MutationLoginArgs, OAuthProvider} from "../../../store/generated-models";
import {FormContent} from "../elements/FormContent";
import {SocialButton} from "./SocialButton";
import {TabWrap} from "../elements/TabWrap";
import {AuthContext} from "../../../core/providers/AuthProvider";
import {ConfirmName} from "./ConfirmName";
import {Confirm2fa} from "./Confirm2fa";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {gqlLogin} from "../../../core/providers/gql";
import {Password} from '../../../core/ui/text-fields/Password';
import {tokenStorage} from "../../common/tokenStorage";

const ForgotPasswordLink = styled(Link)`
  display: block;
  width: 100%;
  margin: 12px 0 0 0;
  color: #000;
  text-decoration: none;
  font-size: 13px;
  text-align: center;      
  
  &:hover {
    // text-decoration: underline;
    opacity: 0.87;
  }
`;

export interface LoginProps extends RouteComponentProps {
}

export const Login: React.FC<LoginProps> = (props) => {
	const [isConfirmNameStep, setIsConfirmNameStep] = useState(false);
	const [isConfirm2faStep, setIsConfirm2faStep] = useState(false);
	const [requestIsProcessing, setRequestIsProcessing] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [token, setToken] = useState(null);
	const [modalMessage, setModalMessage] = useState(null);
	const submitFormValues = useRef(null);

	const authContext = useContext(AuthContext);

  const [login] = useMutation<{ login: LoginResult }, MutationLoginArgs>(gqlLogin);

	const onFormSubmit = (e: any) => {
		e.preventDefault();

		setRequestIsProcessing(true);

		if (!email || !password) {
			authContext.showMessage('error', 'Enter email and password to continue');
			return;
		}

		submitFormValues.current = {
			email: email,
			password: password
		};

		authContext.updateRecaptcha()
			.then((recaptchaToken) => {
				login({
					variables: {
						email: submitFormValues.current.email,
						password: submitFormValues.current.password,
						recaptcha: recaptchaToken
					}
				})
					.then((res) => {
						const loginData = res.data.login;
						if (loginData.authToken && loginData.authTokenAction === 'TwoFactorAuth') {
							setToken(loginData.authToken);
							tokenStorage.accessToken = loginData.authToken;
							setIsConfirm2faStep(true);
						} else if (loginData.authToken && loginData.authTokenAction === 'ConfirmName') {
							// setName(loginData.user.name);
							setName(loginData.authTokenActionParam ? loginData.authTokenActionParam : '');
							setToken(loginData.authToken);
							setIsConfirmNameStep(true);
						} else {
							authContext.login(loginData);
						}

					})
					.catch((error) => {
						let errorCode = '';
						try {
							errorCode = error.graphQLErrors[0].extensions.code;
						} catch (ignored) {
						}

						if (errorCode === 'auth.access_denied' || errorCode === 'auth.login_invalid') {
							authContext.showMessage('error', 'Invalid credentials');
						} else if (errorCode === 'auth.unconfirmed_email') {
							setModalMessage('Your email is still not confirmed. Please follow the instructions in the message that we have sent to your email.');
						} else if (errorCode === 'auth.unconfirmed_device') {
							setModalMessage('You are trying to log in from an unknown device. For your security, please confirm the device using the link sent to your email.');
						} else {
							authContext.showMessage('error', 'Unknown error occurred');
						}
					})
					.finally(() => {
						setRequestIsProcessing(false);
					});
			})
			.catch(() => {
				console.warn('gr promise error');
			});
	};

	const oAuthLogin = (provider: OAuthProvider, token: string) => {
		setRequestIsProcessing(true);

		authContext.updateRecaptcha()
			.then((recaptchaToken) => {
				login({
					variables: {
						oAuthProvider: provider,
						oAuthToken: token,
						recaptcha: recaptchaToken
					}
				})
					.then((res) => {
						const loginData = res.data.login;
						if (loginData.authToken && loginData.authTokenAction === 'TwoFactorAuth') {
							setToken(loginData.authToken);
							setIsConfirm2faStep(true);
						} else if (loginData.authToken && loginData.authTokenAction === 'ConfirmName') {

							// setName(loginData.user && loginData.user.name ? loginData.user.name : '');
							setName(loginData.user && loginData.user.email ? loginData.user.email : '');

							setToken(loginData.authToken);
							setIsConfirmNameStep(true);
						} else {
							authContext.login(loginData);
						}
					})
					.catch((error) => {
						let errorCode = '';
						try {
							errorCode = error.graphQLErrors[0].extensions.code;
						} catch (ignored) {
						}

						if (errorCode === 'auth.access_denied' || errorCode === 'auth.login_invalid') {
							authContext.showMessage('error', 'Invalid credentials');
						} else if (errorCode === 'auth.unconfirmed_email') {
							setModalMessage('Your email is still not confirmed. Please follow the instructions in the message that we have sent to your email.');
						} else if (errorCode === 'auth.unconfirmed_device') {
							setModalMessage('You are trying to log in from an unknown device. For your security, please confirm the device using the link sent to your email.');
						} else {
							authContext.showMessage('error', 'Unknown error occurred');
						}
					})
					.finally(() => {
						setRequestIsProcessing(false);
					});
			})
			.catch(() => {
				console.warn('recaptcha promise error');
			});
	};

	const googleLoginCallback = (response: any) => {
		if (response.tokenId) {
			oAuthLogin(OAuthProvider.Google, response.tokenId);
		} else {
			console.error('google login error');
		}
	};

	const facebookLoginCallback = (response: any) => {
		if (response.accessToken) {
			oAuthLogin(OAuthProvider.Facebook, response.accessToken);
		} else {
			console.error('facebook login error');
		}
	};

	if (modalMessage) {
		return (
			<>
				<div>{modalMessage}</div>
				<Button
					fullWidth
					style={{marginTop: '24px', minWidth: '100px'}}
					variant="contained"
					color="primary"
					onClick={() => setModalMessage(null)}
				>
					OK
				</Button>
			</>
		);
	} else if (isConfirm2faStep) {
		return (
			<Confirm2fa
				token={token}
			/>
		);
	} else if (isConfirmNameStep) {
		return (
			<ConfirmName
				name={name}
				token={token}
			/>
		);
	} else {
		/* Render form */
		return (
			<>
				<TabWrap>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign up</Link>
				</TabWrap>
				<form onSubmit={onFormSubmit} autoComplete="off">
					<FormContent>
						<TextField
							variant='outlined'
							fullWidth
							label='Email'
							autoComplete="email"
							value={email}
							disabled={requestIsProcessing}
							onChange={e => setEmail(e.target.value)}
						/>
						{/*<TextField*/}
						{/*	style={{margin: '24px 0'}}*/}
						{/*	variant='outlined'*/}
						{/*	fullWidth*/}
						{/*	type="password"*/}
						{/*	label="Password"*/}
						{/*	autoComplete="password"*/}
						{/*	value={password}*/}
						{/*	disabled={requestIsProcessing}*/}
						{/*	onChange={e => setPassword(e.target.value)}*/}
						{/*/>*/}
						<Password
							style={{margin: '24px 0'}}
							fullWidth
							label="Password"
							autoComplete="password"
							value={password}
							disabled={requestIsProcessing}
							onChange={e => setPassword(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							size={"large"}
							disabled={requestIsProcessing || !email || !password}
						>
							{!requestIsProcessing ? `Login` : 'Signing in...'}
						</Button>
					</FormContent>
				</form>

				<ForgotPasswordLink to="/forgot-password">Forgot password?</ForgotPasswordLink>

				{/*<div style={{textAlign: 'center', margin: '32px 0 16px 0'}}>*/}
				{/*	Login with your social network account*/}
				{/*</div>*/}

				{/*<Grid container spacing={3}>*/}
				{/*	<Grid item xs={6}>*/}
				{/*		<GoogleLogin*/}
				{/*			clientId={config.googleSiteId}*/}
				{/*			onSuccess={googleLoginCallback}*/}
				{/*			onFailure={googleLoginCallback}*/}
				{/*			cookiePolicy="single_host_origin"*/}
				{/*			render={renderProps => (*/}
				{/*				<SocialButton*/}
				{/*					provider="google"*/}
				{/*					onClick={renderProps.onClick}*/}
				{/*					label="Google"*/}
				{/*				/>*/}
				{/*			)}*/}
				{/*		/>*/}
				{/*	</Grid>*/}
				{/*	<Grid item xs={6}>*/}
				{/*		<FacebookLogin*/}
				{/*			appId={config.facebookSiteId}*/}
				{/*			callback={facebookLoginCallback}*/}
				{/*			autoLoad={false}*/}
				{/*			fields="name,email,picture"*/}
				{/*			render={(renderProps: any) => (*/}
				{/*				<SocialButton*/}
				{/*					provider="facebook"*/}
				{/*					onClick={renderProps.onClick}*/}
				{/*					label="Facebook"*/}
				{/*				/>*/}
				{/*			)}*/}
				{/*		/>*/}
				{/*	</Grid>*/}
				{/*</Grid>*/}
			</>
		);
	}
};
