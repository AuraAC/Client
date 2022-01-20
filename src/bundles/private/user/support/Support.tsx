import React, {useContext, useEffect, useState} from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {PageWrap} from '../../components/common/Pages'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Dropdown} from "../../components/common/Dropdown";
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {SimpleFileUploader} from "../../components/common/SimpleUploaderFile";
import {handleFileChange} from "../../components/common/FileUploaderHelpers";
import {useSnackbar} from "notistack";
import {RestApiContext} from "../../../../core/providers/RestApiProvider";
import {AuthContext} from "../../../../core/providers/AuthProvider";

const Row = styled.div`
  display: flex;
`;

const msgTypes = [
	{id: 'BankWithdrawal', value: 'Bank Withdrawal'},
	{id: 'BitcoinWithdrawal', value: 'Bitcoin Withdrawal'},
	{id: 'PRWithdrawal', value: 'XPR Withdrawal'},
	{id: 'LTCWithdrawal', value: 'LTC Withdrawal'},
	{id: 'ETHWithdrawal', value: 'ETH Withdrawal'},
	{id: 'BCHWithdrawal', value: 'BCH Withdrawal'},
	{id: 'BankDeposit', value: 'Bank Deposit'},
	{id: 'BitcoinDeposit', value: 'Bitcoin Deposit'},
	{id: 'XRPDeposit', value: 'XRP Deposit'},
	{id: 'LTCDeposit', value: 'LTC Deposit'},
	{id: 'ETHDeposit', value: 'ETH Deposit'},
	{id: 'BCHDeposit', value: 'BCH Deposit '},
	{id: 'Verification', value: 'Verification'},
	{id: 'CorporateBusinessVerification', value: 'Corporate/Business Verification'},
	{id: 'KnowYourCustomerProcedure', value: 'Know Your Customer Procedure'},
	{id: 'HWWallet', value: 'HW Wallet'},
	{id: 'Other', value: 'Other'},
];

const initFields = {
	msgType: '',
	message: ''
};

export const Support: React.FC<RouteComponentProps> = () => {

	const {enqueueSnackbar} = useSnackbar();
	const restContext = useContext(RestApiContext);
	const authContext = useContext(AuthContext);

	const [fields, setFields] = useState<any>({...initFields});
	const [errors, setErrors] = useState<any>({});
	const [file, setFile] = useState<any>(null);
	const [fileErr, setFileErr] = useState('');
	const fileRef = React.useRef(null);

	useEffect(() => {
		if (authContext.menuItems.findIndex(el => el.label === 'home') === -1) {
			navigate('/home/main').then();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const upload = () => {
		let formData = new FormData();
		formData.append("text", fields.message);
		formData.append("type", fields.msgType);
		formData.append("reason", 'support');
		formData.append("file", file.info);
		formData.append("fileData", JSON.stringify({"type": 'support'}));
		return restContext.upload('addSupportCase', formData);
	};

	const sendMessageHandler = async () => {

		let err: any = {};
		if (!fields.msgType) err.msgType = 'required';
		if (!fields.message) err.message = 'required';
		setErrors({...err});

		if (Object.keys(err).length !== 0) {
			enqueueSnackbar('Correct errors to continue', {variant: 'error'});
			return;
		}

		let errMessage = '';
		try {
			const uploadRes = await upload();
			if (uploadRes && uploadRes.status && uploadRes.status === 200) {
				setFields({...initFields});
				setFile(null);
				setFileErr('');
				fileRef.current.clear();
				enqueueSnackbar('Message sent', {variant: 'success'});
				return;
			} else {
				errMessage = 'Process error. Please try again later';
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
		<PageWrap>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Dropdown
						error={!!errors.msgType}
						helperText={errors.msgType}
						label='Theme'
						fullWidth
						values={msgTypes}
						value={fields.msgType}
						onChange={val => setFields({...fields, msgType: val})}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						error={!!errors.message}
						helperText={errors.message}
						variant='outlined'
						fullWidth
						multiline
						rows={3}
						rowsMax={6}
						label='Your message'
						value={fields.message}
						onChange={e => setFields({...fields, message: e.target.value})}
					/>
				</Grid>
				<Grid item xs={12}>
					<SimpleFileUploader
						ref={fileRef}
						errText={fileErr}
						variant={'outlined'}
						label={'Browse file'}
						onChange={(e) => handleFileChange(e, setFile, setFileErr, {maxSize: 5 * 1024 * 1024})}
					/>
				</Grid>
			</Grid>
			<Row style={{marginTop: '24px'}}>
				<Button
					variant="contained"
					color="primary"
					size={"large"}
					style={{minWidth: '240px'}}
					onClick={sendMessageHandler}
					// disabled={addSupportCaseLoading}
				>
					Send to support
				</Button>
			</Row>
		</PageWrap>
	)
};
