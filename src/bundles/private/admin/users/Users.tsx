import React, {useState} from 'react';
import {RouteComponentProps} from "@reach/router";
import styled from 'styled-components';
import {HeadCell, Grid} from '../../../../core/ui/grids/Grid';
import {PageWrap} from '../../components/common/Pages';
import {UserCard} from './UserCard';
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import {MutationUpdateUserArgs, User} from "../../../../store/generated-models";
import Typography from "@material-ui/core/Typography";
import InfoIcon from '@material-ui/icons/Info';
import {UserDetails} from "./UserDetails";
import {useSnackbar} from "notistack";

// import {formatAmount, formatValue} from '../../helpers/Format';
// import CircularProgress from "@material-ui/core/CircularProgress";
// const ITEM_PER_PAGE: number = 20;

const InfoIconStyled = styled(InfoIcon)`
	fill: ${props => props.theme.palette.primary.main};
`;

const Row = styled.div`
  display: flex;
`;

// const LoadWrap = styled.div`
// 	display: flex;
// 	width: 100%;
// 	height: 100%;
// 	justify-content: center;
// 	align-items: center;
// `;

const gqlUpdateUser = gql`
    mutation updateUser (
        $userId: ID!
    ) {
        updateUser (
            userId: $userId
        ) {
            accessFailedCount
            avatar
            birthday
            created
            deleted
						email
            emailConfirmed
            firstName
            hasEmailAuth
            is2faEnabled
            lastName
            termsOfUse
            updated
            userId

        }
    }
`;

// users(desc: Boolean, filter: String, first: Int, orderBy: String, skip: Int): [User]!
// const gqlUsers = gql`
//     query users($first: Int, $skip: Int, $filter: String) {
// 	users (
// 		first: $first,
// 		orderBy: "email",
// 		desc: true,
// 		skip: $skip,
// 		filter: $filter
// ) {
// 		count
// 		users {
// 			accessFailedCount
// 			avatar
// 			beneficiaryCount
// 			birthday
// 			countryCode
// 			created
// 			deleted
// 			deletedDate
// 			email
// 			emailConfirmed
// 			ethAddress
// 			ethPrivateKey
// 			files {
// 				approved
// 				created
// 				doesFileExist
// 				encoding
// 				fileId
// 				fileName
// 				fileSize
// 				linkedId
// 				mimeType
// 				order
// 				originExtension
// 				originFileName
// 				originFileNameWithoutExtension
// 				type
// 					url
// 			}
// 			firstName
// 			hasEmailAuth
// 			is2faEnabled
// 			kycName
// 			lastName
// 			name
// 			nameConfirmed
// 			phoneNumber
// 			roles
// 			state {
// 				ethBalance
// 				contractBalance
// 			}
// 			termsOfUse
// 			updated
// 			userId
// 			userType
// 			valid
// 			validatedByUser
// 			validationDate
// 		}
// 	}
// }`;

const headCells: HeadCell[] = [
	{id: 'email', label: 'Email'},
	{id: 'name', label: 'Name'},
	{id: 'roles', label: 'Roles'},
	{id: 'ethBalance', label: 'Balance ETH', align: 'right'},
	{id: 'contractBalance', label: 'Balance', align: 'right'},
	{id: 'valid', label: 'KYC Valid'}
];

export const Users: React.FC<RouteComponentProps> = () => {

	const {enqueueSnackbar} = useSnackbar();

	const [mode, setMode] = useState('');
	const [item, setItem] = useState<any>(null);
	const [items, setItems] = useState<any[]>([]);
	const [filter, setFilter] = useState('');

	const [page, setPage] = useState(1);
	const [pageCnt, setPageCnt] = useState(0);

	// const {loading, error, data, refetch} = useQuery(gqlUsers, {
	// 	displayName: 'gqlUsers',
	// 	variables: {
	// 		first: ITEM_PER_PAGE,
	// 		skip: (page - 1) * ITEM_PER_PAGE,
	// 		filter: filter
	// 	}
	// });

	// const [updateUser, {
	// 	loading: updateUserLoading
	// }] = useMutation<{ updateUser: User }, MutationUpdateUserArgs>(
	// 	gqlUpdateUser,
	// 	{
	// 		update(cache, {data: {updateUser}}) {
	// 			const {users} = cache.readQuery({query: gqlUsers});
	// 			cache.writeQuery({
	// 				query: gqlUsers,
	// 				data: {
	// 					users: users.map((el: any) => {
	// 						if (el.userId === updateUser.userId) {
	// 							return updateUser;
	// 						}
	// 						return el;
	// 					})
	// 				},
	// 			});
	// 		}
	// 	}
	// );

	const [updateUser, {
		loading: updateUserLoading
	}] = useMutation<{ updateUser: User }, MutationUpdateUserArgs>(gqlUpdateUser);

	// useEffect(() => {
	// 	refetch().then();
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps
	//
	// useEffect(() => {
	// 	if (error) console.warn('>> Users useEffect error', error);
	// }, [error]);
	//
	// useEffect(() => {
	// 	if (!loading && data && data.users && data.users.count !== undefined) {
	// 		const totalCnt = data.users.count;
	// 		setPageCnt(Math.floor(totalCnt / ITEM_PER_PAGE) + (totalCnt % ITEM_PER_PAGE > 0 ? 1 : 0));
	//
	// 		if (data && data.users) {
	// 			let res: any[] = [];
	//
	// 			data.users.users.forEach((el: any) => {
	// 				let resEl: any = {};
	// 				for (let key in el) {
	// 					if (key === 'state') {
	// 						resEl.ethBalance = formatAmount(el.state.ethBalance, 5);
	// 						resEl.contractBalance = formatAmount(el.state.contractBalance);
	// 					} else if (key === 'files') {
	// 						resEl._files = el.files ? el.files : [];
	// 					} else if (key === 'roles') {
	// 						resEl.roles = formatValue(el.roles);
	// 						resEl._roles = el.roles;
	// 						resEl._admin = el.roles.findIndex((val: string) => val === 'ADMIN') !== -1;
	// 						resEl._blogger = el.roles.findIndex((val: string) => val === 'BLOGGER') !== -1;
	// 					} else if (key === 'valid') {
	// 						resEl.valid = el.valid === true ? 'Y' : el.valid === false ? 'N' : '';
	// 					} else {
	// 						resEl[key] = formatValue(el[key]);
	// 					}
	// 				}
	// 				res.push(resEl);
	// 			});
	//
	// 			setItems(res);
	// 		}
	// 	}
	// }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

	// const addItemHandler = () => {
	// 	setItem(null);
	// 	setMode('card');
	// };

	const editItemHandler = (val: any) => {
		setItem(val);
		setMode('card');
	};

	const itemSaveHandler = async (val: any) => {
		let deletedModified = val.deleted !== (item.deleted === 'Y');
		let rolesModified = item._roles.sort().toString() !== val.roles.sort().toString();

		if (!deletedModified && !rolesModified) return;

		let variables: any = {userId: item.userId};

		if (rolesModified) {
			variables.roles = val.roles;
		}

		if (deletedModified) {
			variables.deleted = val.deleted;
		}

		// edit item
		let errMessage = '';
		try {
			const res = await updateUser({variables: variables});
			if (res.data) {
				// refetch().then();
				setMode('');
				return;
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

	const onPageChangeHandler = (event: any, value: number) => {
		setPage(value);
	};

	const searchHandler = (val: string) => {
		// if (loading) return;

		setPage(1);
		setFilter(val);
	};

	// if (!data && loading) {
	// 	return (
	// 		<LoadWrap>
	// 			<CircularProgress/>
	// 		</LoadWrap>
	// 	);
	// }

	if (mode === 'card')
		return (
			<PageWrap>
				<UserCard
					item={item}
					onClose={() => setMode('')}
					onDetails={() => setMode('details')}
					onKYC={() => setMode('kyc')}
					onSave={itemSaveHandler}
					inProcess={updateUserLoading}
				/>
			</PageWrap>
		);

	if (mode === 'kyc')
		return (
			<PageWrap>
				KYC Card
			</PageWrap>
		);

	if (mode === 'details')
		return (
			<PageWrap>
				<UserDetails
					item={item}
					onClose={() => setMode('card')}
				/>
			</PageWrap>
		);

	return (
		<PageWrap>
			<Row style={{marginBottom: '12px'}}>
				<Typography variant={"h3"}>
					Users
				</Typography>
			</Row>
			<Grid
				headCells={headCells}
				items={items}
				idField="userId"
				page={page}
				pageCnt={pageCnt}
				onPageChange={onPageChangeHandler}
				actions={[
					{id: 'info', type: 'icon', icon: <InfoIconStyled/>, onAction: editItemHandler},
				]}
				extSearch
				extSearchValue={filter}
				onSearchApply={searchHandler}
			/>
		</PageWrap>
	);
};
