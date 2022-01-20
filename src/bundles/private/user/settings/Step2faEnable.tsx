import React, {useContext, useState} from 'react';
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {ReactComponent as GoogleIcon} from "./assets/ga-google-play.svg";
import {ReactComponent as AppStoreIcon} from "./assets/ga-app-store.svg";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {LoginResult} from "../../../../store/generated-models";
import {gql} from "apollo-boost";
import {AuthContext} from "../../../../core/providers/AuthProvider";
import {useSnackbar} from "notistack";
import {Button} from "@material-ui/core";

const GA_APP_STORE_URL = 'https://apps.apple.com/us/app/google-authenticator/id388497605';
const GA_GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en';

const Row = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const RowML = styled(Row as any)`
  flex-direction: column;
`;

const Accent = styled.span`
  color: ${props => props.theme.palette.primary.main};
  font-weight: bold;
`;

const Alert = styled.span`
  color: ${props => props.theme.custom.palette.alert};
`;

const QrText = styled.div`  
  width: 140px;  
  height: 140px;
  display: flex;
  flex-direction: column;  
`;

const QrTextLine = styled.div`
  font-family: monospace, Courier, Monaco;    
  letter-spacing: 0;
  white-space: pre;
  font-size: 6px;
  line-height: 6px;
`;

const gqlEnable2fa = gql`
    mutation Enable2fa (
        $code: String!,
        $password: String!
    ){
        enable2fa (
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
	qrCode: string;
	qrString: string;
	onCancel: () => void;
}

export const Step2faEnable: React.FC<ComponentProps> = ({qrCode, qrString, onCancel}) => {

	const authContext = useContext(AuthContext);
	const [enable2fa] = useMutation<{ enable2fa: LoginResult }>(gqlEnable2fa);
	const [authCode, setAuthCode] = useState('');
	const {enqueueSnackbar} = useSnackbar();

	const setEnable2fa = async () => {
		let errMessage: string = '';
		try {
			const res = await enable2fa({
				variables: {
					code: authCode,
					password: 'ignored'
				}
			});

			if (res.data.enable2fa.user.is2faEnabled) {
				authContext.updateUser({is2faEnabled: true});
				enqueueSnackbar('2FA has been enabled', {variant: 'success'});
				return;
			} else {
				errMessage = 'Wrong Code, please try again';
			}
		} catch (error) {
			try {
				const errorCode = error.graphQLErrors[0].extensions.code;
				if (errorCode === 'auth.access_denied') errMessage = 'Access denied';
				if (!errMessage && error.graphQLErrors[0].message) errMessage = error.graphQLErrors[0].message;
			} catch {
			}
		}

		if (!errMessage) errMessage = 'Unknown error';
		enqueueSnackbar(errMessage, {variant: 'error'});
	};

	return (
		<>
			<Row style={{marginBottom: '8px'}}>
				<Typography variant={"body1"}>Download and install the Google Authenticator app</Typography>
			</Row>
			<Row>
				<Link href={GA_APP_STORE_URL} target="_blank" rel="noopener noreferrer" color="inherit"
							style={{marginRight: '20px'}}
				>
					<AppStoreIcon style={{height: '40px'}}/>
				</Link>
				<Link href={GA_GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" color="inherit">
					<GoogleIcon style={{height: '40px'}}/>
				</Link>
			</Row>
			<Row style={{marginBottom: '8px'}}>
				<Typography variant={"body1"}>Scan this QR code in the Google Authenticator app</Typography>
			</Row>
			<Row>
				<QrText>
					{qrString.split('\n').map((el, i) => <QrTextLine key={i}>{el}</QrTextLine>)}
				</QrText>
			</Row>
			<RowML>
				<Typography variant={"body1"}>
					If you are unable to scan the QR code, please enter this code manually into the app.
				</Typography>
				<Typography variant={"h3"}>
					<Accent style={{overflowWrap: 'break-word'}}>
						{qrCode}
					</Accent>
				</Typography>
				<Typography variant={"body1"}><Alert>Please keep this Key in a safe place.</Alert></Typography>
				<Typography variant={"body1"}>This Key will allow you to recover your Google Authenticator in case of phone loss</Typography>
			</RowML>
			<Row style={{marginBottom: '12px'}}>
				<Typography variant={"body1"}>Enter the generated code in the input below</Typography>
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
					onClick={setEnable2fa}
				>
					Enable 2FA
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
