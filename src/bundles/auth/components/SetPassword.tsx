import React, {useContext, useEffect, useState} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {useMutation} from '@apollo/react-hooks';
import {MutationSetPasswordArgs} from '../../../store/generated-models';
import {gql} from 'apollo-boost';
import {SubmitButton} from '../elements/SubmitButton';
import {FormContent} from '../elements/FormContent';
// import {FormInput} from './FormInput';
import {WelcomeText} from '../elements/WelcomeText';
import {AuthContext} from '../../../core/providers/AuthProvider';
import TextField from "@material-ui/core/TextField";

interface NewPasswordProps extends RouteComponentProps {
	token?: string
}

export const SetPassword: React.FC<NewPasswordProps> = ({token}) => {
	const authContext = useContext(AuthContext);

	const [dialogState, setDialogState] = useState<string>('input');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [
		callSetPassword, {
			loading: setPasswordLoading,
			error: setPasswordError,
			data: setPasswordData,
		}] = useMutation<{ setPassword: boolean }, MutationSetPasswordArgs>(gql`
      mutation setPassword(
          $password: String!,
          $recaptcha: String!,
          $token: String!
      ) {
          setPassword (
              password: $password,
              recaptcha: $recaptcha,
              token: $token
          )
      }
	`);

	// change password request processing
	useEffect(() => {
		if (setPasswordData) {
			if (setPasswordData.setPassword) {
				setDialogState('success');
			} else {
				authContext.showMessage('error',
					'Unknown error. Please try again later.');
			}
		} else {
			if (setPasswordError) {
				const errorCode = setPasswordError.graphQLErrors[0].extensions.code;

				if (errorCode === 'auth.password_invalid') {
					authContext.showMessage('error', 'Password should be at least 6 symbols long and contain at least one letter (lower- and uppercase), number and special symbol');
				} else {
					authContext.showMessage('error',
						'Unknown error. Please try again later.');
				}
			}
		}
	}, [setPasswordError, setPasswordData]); // eslint-disable-line

	const onFormSubmit = async (e: any) => {
		e.preventDefault();

		if (!password) {
			authContext.showMessage('error', 'Enter new password to continue');
			return;
		}

		if (password !== passwordConfirmation) {
			authContext.showMessage('error', 'Password and password confirmation do not match');
			return;
		}

		authContext.updateRecaptcha().then((recaptchaToken) => {
			callSetPassword({
				variables: {
					password: password,
					recaptcha: recaptchaToken,
					token: token,
				},
			});
		}).catch(() => {
			console.warn('gr promise error');
		});
	};

	/* ### RENDER ### */
	let dialogContent: JSX.Element = null;

	if (!token) {
		dialogContent = (
			<FormContent>
				<div style={{textAlign: 'center'}}>You need email validation token to continue</div>
				<SubmitButton onClick={() => {
					navigate('/');
				}}>Back to the homepage</SubmitButton>
			</FormContent>
		);
	} else {
		if (setPasswordLoading) {
			dialogContent = (
				<FormContent>
					<div>Setting new password...</div>
				</FormContent>
			);
		} else {
			if (dialogState === 'input') {
				dialogContent = (
					<>
						<WelcomeText>Enter the new password</WelcomeText>
						<form onSubmit={onFormSubmit} autoComplete="new-password">
							<FormContent>
								{/*<FormInput*/}
								{/*    id="password"*/}
								{/*    name="password"*/}
								{/*    autoComplete="new-password"*/}
								{/*    type="password"*/}
								{/*    label="Password"*/}
								{/*    value={password}*/}
								{/*    onChange={(e) => {*/}
								{/*      setPassword(e.target.value);*/}
								{/*    }}/>*/}
								{/*<FormInput*/}
								{/*    id="password-confirmation"*/}
								{/*    name="password-confirmation"*/}
								{/*    autoComplete="new-password"*/}
								{/*    type="password"*/}
								{/*    label="Password confirmation"*/}
								{/*    value={passwordConfirmation}*/}
								{/*    onChange={(e) => {*/}
								{/*      setPasswordConfirmation(e.target.value);*/}
								{/*    }}/>*/}
								<TextField
									id="password"
									name="password"
									autoComplete="password"
									variant='outlined'
									fullWidth
									type="password"
									label="Password"
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
								<TextField
									id="password-confirmation"
									name="password-confirmation"
									autoComplete="new-password"
									variant='outlined'
									fullWidth
									type="password"
									label="Password confirmation"
									value={passwordConfirmation}
									onChange={e => setPasswordConfirmation(e.target.value)}
								/>
								<SubmitButton>Continue</SubmitButton>
							</FormContent>
						</form>
					</>
				);
			} else {
				if (dialogState === 'success') {
					if (setPasswordData) {
						dialogContent = (
							<>
								<WelcomeText>The new password was set successfully</WelcomeText>
								<FormContent>
									<div style={{textAlign: 'center'}}>
										<p>You can now log in using this password.</p>
									</div>
									<SubmitButton onClick={() => {
										navigate('/login').then();
									}}>Log in</SubmitButton>
								</FormContent>
							</>
						);
					}
				}
			}
		}
	}

	return dialogContent;
};
