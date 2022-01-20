import React, {useContext, useState} from "react";
import {Link, navigate, RouteComponentProps} from "@reach/router";
import {useMutation} from "@apollo/react-hooks";
import {LoginResult, MutationSignupArgs, OAuthProvider, UserMode,} from "../../../store/generated-models";
import {TabWrap} from "../elements/TabWrap";
import {AuthContext} from "../../../core/providers/AuthProvider";
import {ConfirmName} from "./ConfirmName";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import MuiFormControlLabel from "@material-ui/core/FormControlLabel";
import styled from "styled-components";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {gqlSignup} from "../../../core/providers/gql";
import {Password} from "../../../core/ui/text-fields/Password";
// import config from "../../../config";
// import {SocialButton} from "./SocialButton";
// import {GoogleLogin} from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const useStyles = makeStyles(() =>
	createStyles({
		noMaxWidth: {
			maxWidth: "none",
		},
	})
);

const FormControlLabel = styled(MuiFormControlLabel)`
  .MuiButtonBase-root {
    padding: 0 8px;
  }

  .MuiTypography-root {
    margin-left: 8px;
    font-size: 12px;
  }
`;

const TooltipText = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface SignupProps extends RouteComponentProps {
}

export const Signup: React.FC<SignupProps> = (props) => {
	const [isConfirmNameStep, setIsConfirmNameStep] = useState(false);
	const [requestIsProcessing, setRequestIsProcessing] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [name, setName] = useState("");
	const [termsOfUse, setTermsOfUse] = useState(true);

	const [token, setToken] = useState(null);
	const [modalMessage, setModalMessage] = useState(null);
	// const [givenReferralCode, setGivenReferralCode] = useState('');

	const authContext = useContext(AuthContext);
	const classes = useStyles();

	const [signup] = useMutation<{ signup: LoginResult }, MutationSignupArgs>(
		gqlSignup
	);

	const onStepOneFormSubmit = (e: any) => {
		e.preventDefault();

		if (!email || !password) {
			authContext.showMessage("error", "Enter email and password to continue");
			return;
		}

		if (password !== passwordConfirmation) {
			authContext.showMessage(
				"error",
				"Password and password confirmation do not match"
			);
			return;
		}

		if (!termsOfUse) {
			authContext.showMessage(
				"error",
				"You need to agree with the terms and conditions"
			);
			return;
		}

		if (
			!/(?=.*[0-9])(?=.*[!@#$%^&*()_+}{":;?./><,-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+}{":;?./><,-]{6,}/g.test(
				password
			)
		) {
			authContext.showMessage(
				"error",
				"New password must contain at least 6 characters, uppercase and lowercase letters, a number and a special character"
			);
			// const prmErrMsg = 'Incorrect password';
			// setErrors({...errs, newPassword: prmErrMsg});
			// showSnackbarErr('New password must contain at least 6 characters, uppercase and lowercase letters, a number and a special character', {autoHideDuration: 4000});
			return;
		}

		authContext
			.updateRecaptcha()
			.then((recaptchaToken) => {
				signup({
					variables: {
						email: email,
						password: password,
						// name: name,
						termsOfUse: termsOfUse,
						recaptcha: recaptchaToken,
						// givenReferralCode: givenReferralCode
						mode: UserMode.StandardUser
					},
				})
					.then((res) => {
						setModalMessage(
							"Your email is still not confirmed. Please follow the instructions in the message that we have sent to your email."
						);
					})
					.catch((error) => {
						const errorCode = error.graphQLErrors[0].extensions.code;
						if (errorCode === "auth.password_invalid") {
							authContext.showMessage(
								"error",
								"Password should be at least 6 symbols long and contain at least one letter (lower- and uppercase), number and special symbol"
							);
						} else if (errorCode === "auth.user_already_exists") {
							authContext.showMessage("error", "User already exists");
						} else if (errorCode === "auth.referral_code_invalid") {
							authContext.showMessage("error", "Referral code is invalid");
						} else {
							authContext.showMessage("error", "Unknown error occurred");
						}
					});
			})
			.catch(() => {
				console.warn("gr promise error");
			});
	};

	// const oAuthSignup = (provider: OAuthProvider, token: string) => {
	//   setRequestIsProcessing(true);
	//
	//   authContext
	//     .updateRecaptcha()
	//     .then((recaptchaToken) => {
	//       signup({
	//         variables: {
	//           oAuthProvider: provider,
	//           oAuthToken: token,
	//           recaptcha: recaptchaToken,
	//         },
	//       })
	//         .then((res) => {
	//           const loginData = res.data.signup;
	//           if (
	//             loginData.authToken &&
	//             loginData.authTokenAction === "ConfirmName"
	//           ) {
	//             setName(
	//               loginData.user && loginData.user.name ? loginData.user.name : ""
	//             );
	//             setToken(loginData.authToken);
	//             setIsConfirmNameStep(true);
	//           } else {
	//             authContext.login(loginData);
	//           }
	//         })
	//         .catch((error) => {
	//           const errorCode = error.graphQLErrors[0].extensions.code;
	//           if (errorCode === "auth.user_already_exists") {
	//             authContext.showMessage("error", "User already exists");
	//           } else if (errorCode === "auth.referral_code_invalid") {
	//             authContext.showMessage("error", "Referral code is invalid");
	//           } else {
	//             authContext.showMessage("error", "Unknown error occurred");
	//           }
	//         })
	//         .finally(() => {
	//           setRequestIsProcessing(false);
	//         });
	//     })
	//     .catch(() => {
	//       console.warn("recaptcha promise error");
	//     });
	// };

	const googleLoginCallback = (response: any) => {
		if (response.tokenId) {
			// oAuthSignup(OAuthProvider.Google, response.tokenId);
			console.log('GOOGLE');
		} else {
			console.error("google login error");
		}
	};

	const facebookLoginCallback = (response: any) => {
		if (response.accessToken) {
			// oAuthSignup(OAuthProvider.Facebook, response.accessToken);
			console.log('FACEBOOK');
		} else {
			console.error("facebook login error");
		}
	};

	if (modalMessage) {
		return (
			<>
				<div>{modalMessage}</div>
				<Button
					fullWidth
					style={{marginTop: "24px", minWidth: "100px"}}
					variant="contained"
					color="primary"
					onClick={() => {
						setModalMessage(null);
						navigate("/login").then();
					}}
				>
					OK
				</Button>
			</>
		);
	} else if (!isConfirmNameStep) {
		return (
			<>
				<TabWrap>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign up</Link>
				</TabWrap>
				<form onSubmit={onStepOneFormSubmit} autoComplete="new-password">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								label="Email"
								autoComplete="email"
								value={email}
								disabled={requestIsProcessing}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								label="Name"
								autoComplete="off"
								value={name}
								disabled={requestIsProcessing}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Tooltip
								// arrow
								placement="top-start"
								enterDelay={200}
								leaveDelay={200}
								classes={{tooltip: classes.noMaxWidth}}
								title={
									<TooltipText>
										<div>Passwords must be at least 6 characters</div>
										<div>Passwords must have at least one non alphanumeric character</div>
										<div>Passwords must have at least one lowercase('a'- 'z')</div>
										<div>Passwords must have at least one uppercase('A' - 'Z')</div>
									</TooltipText>
								}
							>
								<div>
									<Password
										fullWidth
										label="Password"
										autoComplete="new-password"
										value={password}
										disabled={requestIsProcessing}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</Tooltip>
						</Grid>
						<Grid item xs={6}>
							<Password
								fullWidth
								label="Password confirmation"
								autoComplete="new-password"
								value={passwordConfirmation}
								disabled={requestIsProcessing}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										// color="default"
										color="primary"
										checked={termsOfUse}
										onChange={(e) => setTermsOfUse(e.target.checked)}
									/>
								}
								label={
									<span>
                    I agree to the{" "}
										<a
											style={{textDecoration: "underline"}}
											href="/home/legal"
										>
                      terms and conditions
                    </a>
                  </span>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								size={"large"}
								disabled={
									requestIsProcessing ||
									!email ||
									!password ||
									!passwordConfirmation ||
									!termsOfUse ||
									!name
								}
							>
								{!requestIsProcessing ? `Sign up` : "Signing up..."}
							</Button>
						</Grid>
					</Grid>

					{/*<div style={{ textAlign: "center", margin: "32px 0 16px 0" }}>*/}
					{/*  Sign up with your social network account*/}
					{/*</div>*/}

					{/*<Grid container spacing={3}>*/}
					{/*  <Grid item xs={6}>*/}
					{/*    <GoogleLogin*/}
					{/*      clientId={config.googleSiteId}*/}
					{/*      onSuccess={googleLoginCallback}*/}
					{/*      onFailure={googleLoginCallback}*/}
					{/*      cookiePolicy="single_host_origin"*/}
					{/*      render={(renderProps) => (*/}
					{/*        <SocialButton*/}
					{/*          provider="google"*/}
					{/*          label="Google"*/}
					{/*          onClick={renderProps.onClick}*/}
					{/*        />*/}
					{/*      )}*/}
					{/*    />*/}
					{/*  </Grid>*/}
					{/*  <Grid item xs={6}>*/}
					{/*    <FacebookLogin*/}
					{/*      appId={config.facebookSiteId}*/}
					{/*      callback={facebookLoginCallback}*/}
					{/*      autoLoad={false}*/}
					{/*      fields="name,email,picture"*/}
					{/*      render={(renderProps: any) => (*/}
					{/*        <SocialButton*/}
					{/*          provider="facebook"*/}
					{/*          label="Facebook"*/}
					{/*          onClick={renderProps.onClick}*/}
					{/*        />*/}
					{/*      )}*/}
					{/*    />*/}
					{/*  </Grid>*/}
					{/*</Grid>*/}
				</form>
			</>
		);
	} else {
		return <ConfirmName name={name} token={token}/>;
	}
};
