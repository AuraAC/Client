import React, {useState} from 'react';
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Row = styled.div`
  display: flex;
`;

// const TableWrap = styled.div`
// 	height: 100%;
// 	overflow-y: auto;
// `;

// const Table = styled.table`
// 	width: 100%;
// 	border-collapse: collapse;
//
// 	td {
//     vertical-align: top; /* Вертикальное выравнивание в ячейках */
//     padding: 5px; /* Поля вокруг ячеек */
//     border: 1px solid #000;
//    }
// `;

interface ControlProps {
	item: any;
	onClose: () => void;
	onDetails: () => void;
	onKYC: () => void;
	onSave: (param: any) => void;
	inProcess?: boolean
}

export const UserCard: React.FC<ControlProps> = ({item, onClose, onDetails, onKYC, onSave, inProcess}) => {

	const [isAdmin, setIsAdmin] = useState<boolean>(item._admin);
	const [isBlogger, setIsBlogger] = useState<boolean>(item._blogger);
	const [isEnabled, setIsEnabled] = useState<boolean>(!(item.deleted === 'Y'));

	const onSaveHandler = () => {
		let roles: string[] = ['USER'];
		if (isAdmin) roles.push('ADMIN');
		if (isBlogger) roles.push('BLOGGER');

		onSave({
			roles: roles,
			deleted: !isEnabled
		})
	};

	return (
		<>
			<Row style={{marginBottom: '24px'}}>
				<Typography variant={"h3"}>
					User
				</Typography>
			</Row>

			<Grid container spacing={3}>

				<Grid item xs={12} style={{textAlign: 'end'}}>
					<Button
						variant="contained"
						color="primary"
						size={"large"}
						onClick={() => onKYC()}
						disabled={!(item.valid === 'Y')}
					>
						kyc{item.valid ? (item.valid === 'Y' ? ' (accepted)' : ' (rejected)') : ''}
					</Button>
					<Button
						style={{marginLeft: '12px'}}
						variant="contained"
						color="primary"
						size={"large"}
						onClick={() => onDetails()}
					>
						details
					</Button>
				</Grid>

				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='Name'
						value={item.name}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='Created'
						value={item.created}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='Email'
						value={item.email}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='User ID'
						value={item.userId}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='ETH Balance'
						value={item.ethBalance}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						label='Balance'
						value={item.contractBalance}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant='outlined'
						fullWidth
						label='ETH Address'
						value={item.ethAddress}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant='outlined'
						fullWidth
						label='ETH Private Key'
						value={item.ethPrivateKey}
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Switch
								color="primary"
								checked={isAdmin}
								onChange={() => setIsAdmin(old => !old)}
							/>
						}
						label="Admin"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Switch
								color="primary"
								checked={isEnabled}
								onChange={() => setIsEnabled(old => !old)}
							/>
						}
						label="Enabled"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControlLabel
						control={
							<Switch
								color="primary"
								checked={isBlogger}
								onChange={() => setIsBlogger(old => !old)}
							/>
						}
						label="Blogger"
					/>
				</Grid>
				<Grid item xs={12} style={{padding: 0}}/>
				<Grid item xs={12} md={6}>
					<Button
						variant="contained"
						color="primary"
						size={"large"}
						onClick={onSaveHandler}
					>
						Save
					</Button>
				</Grid>
				<Grid item xs={12} md={6} style={{textAlign: 'end'}}>
					<Button
						style={{width: '200px'}}
						variant="outlined"
						color="primary"
						size={"large"}
						onClick={() => onClose()}
					>
						back
					</Button>
				</Grid>
			</Grid>
		</>
	);

};
