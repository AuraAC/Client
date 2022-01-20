import React, {useContext, useEffect, useState} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {PageWrap} from '../../components/common/Pages'
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {AuthContext} from "../../../../core/providers/AuthProvider";
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";
import {copyTextToClipboard} from '../../../../core/helpers/Clipboard';
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {Dropdown} from "../../components/common/Dropdown";
import {formatDate} from "../../helpers/Format";
// import IconButton from "@material-ui/core/IconButton";
// import Avatar from '@material-ui/core/Avatar';

const Row: any = styled.div`
  display: flex;
  align-items: center;
`;

const Passed: any = styled(Typography)`
	color: ${props => props.theme.custom.palette.success};
`;

const initFields = {
	amount: '',
	address: '',
	comment: ''
};

const gqlKycSettings = gql`
    query getSettingsKyc {
        getSettingsKycShort(
            orderBy: [
                { orderBy: "service_name", desc: false }
            ]
        ) {
            count
            list {
                serviceName
                serviceId
                passed
            }
        }
    }
`;


export const Home: React.FC<RouteComponentProps> = () => {

	const authContext = useContext(AuthContext);
	const {enqueueSnackbar} = useSnackbar();

	// const [fields, setFields] = useState<any>({...initFields});
	// const [errors, setErrors] = useState<any>({});
	// const [mode, setMode] = useState('');

	const [kycTypes, setKycTypes] = useState([]);
	const [kycTypesPassed, setKycTypesPassed] = useState([]);
	const [kycType, setKycType] = useState('');

	const [refId, setRefId] = useState('');
	const [kycValid, setKycValid] = useState(false);
	const [kycStatus, setKycStatus] = useState('...');

	const {loading, error, data, refetch} = useQuery(gqlKycSettings, {
		displayName: 'gqlKycSettings',
		variables: {}
	});

	useEffect(() => {
		if (authContext.menuItems.findIndex(el => el.label === 'home') === -1) {
			navigate('/home/main').then();
		}

		// loadBlockpassWidget();
		refetch().then();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		// authContext.getSettings();
		// if (authContext?.user?.userId) setRefId(authContext.user.userId);
		if (authContext?.user) {
			// console.log('>>> authContext.user', authContext.user);
			setRefId(authContext.user.userId ? authContext.user.userId : '');
			setKycValid(!!authContext.user.kycValid);
			setKycStatus(authContext.user.kycStatus);
		}
	}, [authContext.user]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (data?.getSettingsKycShort?.count && data?.getSettingsKycShort?.list) {
			// console.log('>>>', data.getSettingsKycShort.list);
			// const res = data.getSettingsKycShort.list.map((el: any) => ({id: el.serviceId, value: el.serviceName}));
			// setKycTypes(res);
			const resList: any[] = [];
			const resPassed: any[] = [];
			data.getSettingsKycShort.list.forEach((el: any) => {
				if (el.passed)
					resPassed.push({id: el.serviceId, value: el.serviceName});
				else
					resList.push({id: el.serviceId, value: el.serviceName});
			});

			// resPassed.push({id: 'mockupServiceId', value: 'Mockup service name'});
			// resPassed.push({id: 'mockupServiceId2', value: 'Mockup service name 2'});

			setKycTypes(resList);
			setKycTypesPassed(resPassed);
		}
	}, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	console.log('>>> refId', refId);
	// }, [refId]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		// console.log('>>> kycType', kycType);
		if (!kycType) return;

		loadBlockpassWidget();
	}, [kycType]);

	// useEffect(() => {
	// 	console.log('>>> kycTypes', kycTypes);
	// }, [kycTypes]);

	const copyToClipboard = (text: string, message?: string) => {
		try {
			copyTextToClipboard(text)
				.then(() => {
					enqueueSnackbar(message ? message : 'address copied');
				})
		} catch (ignored) {
		}
	};


	const loadBlockpassWidget = () => {
		// @ts-ignore
		const blockpass = new window.BlockpassKYCConnect(
			kycType, // service client_id from the admin console
			{
				refId: refId, // assign the local user_id of the connected user
			}
		);

		blockpass.startKYCConnect();

		blockpass.on('KYCConnectSuccess', () => {
			//add code that will trigger when data have been sent.
			console.log('KYCConnectSuccess');
		})
	};

	const getKycValid = () => {
		return kycValid ? 'KYC verification complete' : 'KYC verification not complete';
	};

	const getKycStatus = () => {
		return authContext?.user?.kycStatus ? authContext?.user?.kycStatus : 'n/a';
	};

	return (
		<PageWrap>
			<Row>
				<Typography variant={"h1"} style={{fontWeight: 'bold'}}>
					KYC
				</Typography>
			</Row>


			{kycTypesPassed.length
				? <>
					<Row style={{marginTop: '24px'}}>
						<Typography variant={"h3"}>Passed services:</Typography>
					</Row>
					{kycTypesPassed.map((el: any) => {
						return (
							<Row key={el.id} style={{marginTop: '12px'}}>
								<Passed variant={"body1"}>&#10004; {el.value}</Passed>
							</Row>
						);
					})}
				</>
				: <Row style={{marginTop: '24px'}}>
					<Typography variant={"h3"}>No passed services</Typography>
				</Row>
			}

			{kycTypes.length
				? <>
				<Row style={{marginTop: '36px'}}>
					<Dropdown
						// error={!!errors.msgType}
						// helperText={errors.msgType}
						label='Service to verify'
						fullWidth
						values={kycTypes}
						value={kycType}
						// onChange={val => setFields({...fields, msgType: val})}
						onChange={val => setKycType(val)}
					/>
				</Row>
				<Row style={{marginTop: '12px'}}>
					<Button
						id="blockpass-kyc-connect"
						variant="contained"
						color="primary"
						size={"large"}
						style={{minWidth: '240px'}}
						// onClick={onClickHandler}
						disabled={loading || !kycType}
					>
						Verify with Blockpass
					</Button>
				</Row>
			</>
			: null}

			<Row style={{marginTop: '36px'}}>
				<Typography variant={"body1"}>{getKycValid()}</Typography>
			</Row>
			<Row style={{marginTop: '12px'}}>
				<Typography variant={"body1"}>KYC Status: {getKycStatus()}</Typography>
			</Row>

			{authContext?.user?.firstName
			&& <Row style={{marginTop: '12px'}}>
				<Typography variant={"body1"}>First name: {authContext.user.firstName}</Typography>
			</Row>}

			{authContext?.user?.lastName
			&& <Row style={{marginTop: '12px'}}>
				<Typography variant={"body1"}>Last name: {authContext.user.lastName}</Typography>
			</Row>}

			{authContext?.user?.phone
			&& <Row style={{marginTop: '12px'}}>
				<Typography variant={"body1"}>Phone: {authContext.user.phone}</Typography>
			</Row>}

			{authContext?.user?.birthday
			&& <Row style={{marginTop: '12px'}}>
				<Typography variant={"body1"}>Birthday: {formatDate(authContext.user.birthday)}</Typography>
			</Row>}

		</PageWrap>
	)
};
