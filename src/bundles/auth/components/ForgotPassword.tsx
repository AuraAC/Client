import React, {useContext, useEffect, useState} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {FormContent} from "../elements/FormContent";
import {SubmitButton} from "../elements/SubmitButton";
import {useMutation} from "@apollo/react-hooks";
import {
	MutationForgotPasswordArgs
} from "../../../store/generated-models";
import {gql} from "apollo-boost";
import {WelcomeText} from "../elements/WelcomeText";
import {AuthContext} from '../../../core/providers/AuthProvider';
import TextField from "@material-ui/core/TextField";
// import {FormInput} from "./FormInput";

export interface ForgotPasswordProps extends RouteComponentProps {
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
	const [email, setEmail] = useState('');
	const [dialogState, setDialogState] = useState('input');

	const authContext = useContext(AuthContext);

	const [forgotPassword, {
		loading: forgotPasswordLoading,
		error: forgotPasswordError,
		data: forgotPasswordData
	}] = useMutation<{ forgotPassword: boolean }, MutationForgotPasswordArgs>(gql`
      mutation ForgotPassword(
          $email: String!,
          $recaptcha: String!
      ) {
          forgotPassword (
              email: $email,
              recaptcha: $recaptcha
          )
      }
	`);

	// reset password request processing
	useEffect(() => {
		if (forgotPasswordData) {
			if (forgotPasswordData.forgotPassword) {
				setDialogState('success');
			} else {
				authContext.showMessage('error',
					'We couldn\'t send you the password resetting link. Please check the entered email or try again later');
			}
		} else {
			if (forgotPasswordError) {
				authContext.showMessage('error',
					'We couldn\'t send you the password resetting link. Please check the entered email or try again later');
			}
		}
	}, [forgotPasswordError, forgotPasswordData]); // eslint-disable-line

	const onFormSubmit = async (e: any) => {
		e.preventDefault();

		authContext.updateRecaptcha()
			.then((recaptchaToken) => {
				forgotPassword({
					variables: {
						email: email,
						recaptcha: recaptchaToken
					}
				});
			})
			.catch(() => {
				console.warn('gr promise error');
			});
	};

	/* ### RENDER ### */

	let dialogContent: JSX.Element = null;

	if (forgotPasswordLoading) {
		dialogContent = (
			<div>Processing...</div>
		);
	} else {
		if (dialogState === 'input') {
			dialogContent = (
				<>
					<WelcomeText>Enter your email</WelcomeText>

					<form onSubmit={onFormSubmit} autoComplete="new-password">
						<FormContent>
							{/*<FormInput*/}
							{/*	id="email"*/}
							{/*	name="email"*/}
							{/*	label="Email"*/}
							{/*	value={email}*/}
							{/*	onChange={(e) => {*/}
							{/*		setEmail(e.target.value);*/}
							{/*	}}*/}
							{/*/>*/}
							<TextField
								variant='outlined'
								fullWidth
								label='Email'
								autoComplete="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>

							<SubmitButton type="submit">Continue</SubmitButton>
						</FormContent>
					</form>
				</>
			);
		} else if (dialogState === 'success') {
			dialogContent = (
				<>
					<WelcomeText>Check your inbox</WelcomeText>

					<p>Please follow the instructions in the message that we have sent to your email.</p>

					<SubmitButton onClick={() => {
						navigate('/login').then();
					}}>OK</SubmitButton>
				</>
			);
		}
	}

	return (
		<>
			{dialogContent}
		</>
	);
};
