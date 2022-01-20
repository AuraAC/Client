import React, {useContext, useState} from "react";
import {RouteComponentProps} from '@reach/router';
import {FormContent} from "../elements/FormContent";
import {SubmitButton} from "../elements/SubmitButton";
import {useMutation} from "@apollo/react-hooks";
import {LoginResult, MutationVerify2faCodeArgs} from "../../../store/generated-models";
import {AuthContext} from "../../../core/providers/AuthProvider";
import TextField from "@material-ui/core/TextField";
import {gqlVerify2faCode} from '../../../core/providers/gql';

interface ControlProps extends RouteComponentProps {
	token: string;
}

export const Confirm2fa: React.FC<ControlProps> = (props) => {

	const [twoFa, setTwoFa] = useState('');

	const authContext = useContext(AuthContext);

	const [verify2faCode] = useMutation<{ verify2faCode: LoginResult }, MutationVerify2faCodeArgs>(gqlVerify2faCode);

	const onFormSubmit = (e: any) => {
		e.preventDefault();

		authContext.updateRecaptcha()
			.then((recaptchaToken) => {
				verify2faCode({
					variables: {
						code: twoFa,
						// token: props.token
						// recaptcha: recaptchaToken
					}
				})
					.then((res) => {
						const loginData = res.data.verify2faCode;
						authContext.login(loginData);
					})
					.catch((error) => {
						try {
							const errorCode = error.graphQLErrors[0].extensions.code;
							if (errorCode === 'auth.token_verification') {
								authContext.showMessage('error', 'Verification error occurred');
							} else {
								authContext.showMessage('error', 'Unknown error occurred');
							}
						} catch {
							authContext.showMessage('error', 'Unknown error occurred');
						}
					});
			})
			.catch(() => {
				console.warn('gr promise error');
			});
	};

	return (
		<>
			{/*<WelcomeText>Please enter your 2fa code</WelcomeText>*/}

			<form onSubmit={onFormSubmit} autoComplete="off">
				<FormContent>
					<TextField
						style={{margin: '12px 0 24px'}}
						variant='outlined'
						fullWidth
						label="Enter 2fa code"
						autoComplete="off"
						value={twoFa}
						onChange={e => setTwoFa(e.target.value)}
					/>
					{/*<FormInput*/}
					{/*	label="Enter 2fa code"*/}
					{/*	value={twoFa}*/}
					{/*	autoComplete="off"*/}
					{/*	onChange={(e) => {*/}
					{/*		setTwoFa(e.target.value);*/}
					{/*	}}/>*/}
					<SubmitButton type="submit">Continue</SubmitButton>
				</FormContent>
			</form>
		</>
	);
};
