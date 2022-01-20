import React, {useContext, useState} from 'react';
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {LoginResult} from "../../../../store/generated-models";
import {gql} from "apollo-boost";
import {AuthContext} from "../../../../core/providers/AuthProvider";
import {useSnackbar} from "notistack";
import {Button} from "@material-ui/core";

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const gqlDisable2fa = gql`
    mutation Disable2fa (
        $code: String!,
        $password: String!
    ){
        disable2fa (
            code: $code,
            password: $password
        ) {
            user {
                userId
                is2faEnabled
            }
        }
    }
`;

export interface ComponentProps {
	onCancel: () => void;
}

export const Step2faDisable: React.FC<ComponentProps> = ({onCancel}) => {

	const authContext = useContext(AuthContext);
	const [disable2fa] = useMutation<{ disable2fa: LoginResult }>(gqlDisable2fa);
	const [authCode, setAuthCode] = useState('');
	const {enqueueSnackbar} = useSnackbar();

	const setDisable2fa = async () => {
		let errMessage: string = '';
		try {
			const res = await disable2fa({
				variables: {
					code: authCode,
					password: 'ignored'
				}
			});

			if (res.data.disable2fa.user.is2faEnabled === false) {
				authContext.updateUser({is2faEnabled: false});
				enqueueSnackbar('2FA has been disabled', {variant: 'success'});
				return;
			} else {
				errMessage = 'Wrong Code, please try again';
			}
		} catch (error) {
			try {
				const errorCode = error.graphQLErrors[0].extensions.code;
				if (errorCode === 'auth.access_denied') errMessage = 'Access denied';
				if (!errMessage && error.graphQLErrors[0].message) errMessage = error.graphQLErrors[0].message;
			} catch (ignored) {
			}
		}

		if (!errMessage) errMessage = 'Unknown error';
		enqueueSnackbar(errMessage, {variant: 'error'});
	};

	return (
		<>
			<Row>
				<Typography variant={"body1"}>For disable Google 2FA enter the generated code in the input below</Typography>
			</Row>
			<Row>
				<TextField
					style={{width: '240px'}}
					variant='outlined'
					label='QR Code'
					value={authCode}
					onChange={e => setAuthCode(e.target.value)}
				/>
			</Row>
			<Row>
				<Button
					variant="contained"
					color="primary"
					size={"large"}
					disabled={!authCode}
					style={{width: '240px'}}
					onClick={setDisable2fa}
				>
					Disable 2FA
				</Button>
				<Button
					style={{width: '120px', marginLeft: '20px'}}
					variant="outlined"
					color="primary"
					size={"large"}
					onClick={() => onCancel()}
				>
					cancel
				</Button>
			</Row>
		</>
	)
};
