import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {useMutation} from "@apollo/react-hooks";
import {TwoFactorAuthenticationResult} from "../../../../store/generated-models";
import {gql} from "apollo-boost";
import {AuthContext} from "../../../../core/providers/AuthProvider";
import {Step2faEnable} from './Step2faEnable';
import {Step2faDisable} from './Step2faDisable';

const Row = styled.div`
  display: flex;
`;

// const Accent = styled.span`
//   color: ${props => props.theme.palette.primary.main};
//   font-weight: bold;
// `;

const Alert = styled.span`
  color: ${props => props.theme.custom.palette.alert};
  font-weight: bold;
`;

const Success = styled.span`
  color: ${props => props.theme.custom.palette.success};
  font-weight: bold;
`;

const gqlGenerate2faCode = gql`
    mutation Generate2faCode {
        generate2faCode {
            code
            qr
        }
    }
`;

export interface ComponentProps {
}

export const Security: React.FC<ComponentProps> = () => {

	const authContext = useContext(AuthContext);
	const [generate2faCode] = useMutation<{ generate2faCode: TwoFactorAuthenticationResult }>(gqlGenerate2faCode);

	const [status, setStatus] = useState('disabled');
	const [qrCode, setQrCode] = useState('');
	const [qrString, setQrString] = useState('');

	useEffect(() => {
		setStatus(authContext.user.is2faEnabled ? 'enabled' : 'disabled');
	}, [authContext.user.is2faEnabled]);

	const changeStatusClickHandler = async () => {
		if (status === 'disabled') {
			try {
				const res = await generate2faCode({});
				if (res && res.data) {
					setQrCode(res.data.generate2faCode.code);
					setQrString(res.data.generate2faCode.qr);
					setStatus('step-enable');
				}
			} catch (error) {
				console.warn('getOAuthParams error:', error);
			}
		} else {
			// status === 'enabled'
			setStatus('step-disable');
		}
	};

	if (status === 'step-enable') {
		return (
			<Step2faEnable
				qrCode={qrCode}
				qrString={qrString}
				onCancel={() => setStatus('disabled')}
			/>
		);
	}

	if (status === 'step-disable') {
		return (
			<Step2faDisable
				onCancel={() => setStatus('enabled')}
			/>
		);
	}

	// status === 'disabled' or 'enabled'
	return (
		<>
			<Row style={{marginTop: '4px'}}>
				<Typography variant={"body1"}>
					Two-factor authentication is&nbsp;
					{status === 'disabled' ? <Alert>DISABLED</Alert> : <Success>ENABLED</Success>}
				</Typography>
			</Row>

			<Row style={{marginTop: '24px'}}>
				<Button
					variant="contained"
					color="primary"
					size={"large"}
					style={{minWidth: '240px'}}
					onClick={changeStatusClickHandler}
				>
					{status === 'disabled' ? 'Enable 2FA' : 'Disable 2FA'}
				</Button>
			</Row>
		</>
	)


};
