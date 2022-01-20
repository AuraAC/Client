import React, {useContext, useState} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {MutationChangePasswordArgs} from "../../../../store/generated-models";
import {useSnackbar} from "notistack";
import {AuthContext} from "../../../../core/providers/AuthProvider";
import Typography from "@material-ui/core/Typography";

const Row = styled.div`
  display: flex;
`;

const initFields = {
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
	code2fa: ''
};

const gqlChangePassword = gql`
    mutation changePassword(
        $code2fa: String,
        $oldPassword: String!,
        $newPassword: String!
    ) {
        changePassword (
            code2fa: $code2fa,
            oldPassword: $oldPassword,
            newPassword: $newPassword
        )
    }
`

export const ChangePassword: React.FC<RouteComponentProps> = () => {

	const authContext = useContext(AuthContext);

	const {enqueueSnackbar} = useSnackbar();
	const showSnackbarErr = (message: string, opt: any = {}) => {
		enqueueSnackbar(message, {...{variant: 'error'}, ...opt});
	};

	const [changePassword] = useMutation<{ changePassword: boolean }, MutationChangePasswordArgs>(gqlChangePassword);

	const [fields, setFields] = useState<any>({...initFields});
	const [errors, setErrors] = useState<any>({});

	const changePasswordClickHandler = () => {
		let err: any = {};
		if (!fields.oldPassword) err.oldPassword = 'required';
		if (!fields.newPassword) err.newPassword = 'required';
		if (!fields.confirmPassword) err.confirmPassword = 'required';
		if (authContext.user.is2faEnabled && !fields.code2fa) err.code2fa = 'required';

		if (!/(?=.*[0-9])(?=.*[!@#$%^&*()_+}{":;?./><,])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+}{":;?./><,]{6,}/g.test(fields.newPassword)) {
			err.newPassword = 'Incorrect password';
			showSnackbarErr('New password must contain at least 6 characters, uppercase and lowercase letters, a number and a special character', {autoHideDuration: 5000});
			return;
		}

		if (fields.newPassword && fields.newPassword !== fields.confirmPassword)
			err.confirmPassword = 'does not match the new password';

		if (fields.newPassword && fields.newPassword === fields.oldPassword)
			err.newPassword = 'new password same as old password';

		setErrors({...err});

		if (Object.keys(err).length !== 0) {
			enqueueSnackbar('Fill in all the field correctly', {variant: 'default'});
			return;
		}

		processChangePassword();
	};

	const processChangePassword = () => {
		changePassword({
			variables: {
				oldPassword: fields.oldPassword,
				newPassword: fields.newPassword,
				code2fa: fields.code2fa ? fields.code2fa : null,
			}
		})
			.then((res) => {
				if (res && res.data && res.data.changePassword) {
					setFields({...initFields});
					setErrors({...initFields});
					enqueueSnackbar('Password has ben changed. Please login again', {variant: 'success'});
					navigate('/login').then();
					authContext.clearSession();
				} else {
					showSnackbarErr('Password changing error');
				}
			})
			.catch((error) => {
				const errorCode = error.graphQLErrors[0].extensions.code;
				if (errorCode === 'auth.password_invalid') {
					showSnackbarErr('New password invalid');
				} else if (errorCode === 'auth.access_denied') {
					showSnackbarErr('Incorrect password');
				} else if (errorCode === 'auth.two_factor_code_invalid') {
					showSnackbarErr('Incorrect Code 2fa');
				} else {
					showSnackbarErr('Password changing error');
				}
			});
	};

	if (authContext.user.hasEmailAuth) {
		return (
			<>
				<Grid container spacing={3} style={{marginTop: '4px'}}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							type={'password'}
							error={!!errors.oldPassword}
							helperText={errors.oldPassword}
							variant='outlined'
							label='Current password'
							value={fields.oldPassword}
							onChange={e => setFields({...fields, oldPassword: e.target.value})}
						/>
					</Grid>
					<Grid item xs={12} style={{padding: 0}}/>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							type={'password'}
							error={!!errors.newPassword}
							helperText={errors.newPassword}
							variant='outlined'
							label='New password'
							value={fields.newPassword}
							onChange={e => setFields({...fields, newPassword: e.target.value})}
						/>
					</Grid>
					<Grid item xs={12} style={{padding: 0}}/>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							type={'password'}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
							variant='outlined'
							label='Confirm password'
							value={fields.confirmPassword}
							onChange={e => setFields({...fields, confirmPassword: e.target.value})}
						/>
					</Grid>
					{authContext.user.is2faEnabled ? <>
						<Grid item xs={12} style={{padding: 0}}/>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								error={!!errors.code2fa}
								helperText={errors.code2fa}
								variant='outlined'
								label='Code 2fa'
								value={fields.code2fa}
								onChange={e => setFields({...fields, code2fa: e.target.value})}
							/>
						</Grid>
					</> : null}
				</Grid>

				<Row style={{marginTop: '24px'}}>
					<Button
						variant="contained"
						color="primary"
						size={"large"}
						style={{minWidth: '240px'}}
						onClick={changePasswordClickHandler}
					>
						Сhange Password
					</Button>
				</Row>
			</>
		)
	} else {
		return (
			<Typography variant={"body1"}>
				You are unable to change your password as you have signed up and are logged in with a social account
			</Typography>
		)
	}
};
