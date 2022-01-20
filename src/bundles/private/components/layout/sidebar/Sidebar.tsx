import {Link} from '@reach/router';
import React, {useContext} from 'react';
import styled from 'styled-components';
import {MenuList, MenuItemIcon, MenuItemButton, MenuItem, SideBarPanel} from '../../common/Sidebar';
import {Box, Hidden} from "@material-ui/core";
import SmsIcon from '@material-ui/icons/Sms';
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../../../../../core/providers/AuthProvider";

// import {UserRoles} from "../../../../../core/constants/userRoles"; // support
// import PeopleIcon from '@material-ui/icons/People';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import EventIcon from '@material-ui/icons/Event';
// import EmailIcon from '@material-ui/icons/Email';
// import ChatIcon from '@material-ui/icons/Chat';
// import CreditCardIcon from '@material-ui/icons/CreditCard';
// import HistoryIcon from '@material-ui/icons/History';
// import SettingsIcon from '@material-ui/icons/Settings';
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const Control = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;  
  width: 190px;
  border-right: 1px solid #eee;
`;

const Separator = styled.div`
	width: calc(100% - 32px);
	height: 0px;
	border-top: 1px solid #eee;
	margin: 4px 16px;
`;

// const menuItemsAll = [
// 	{role: 'ADMIN', link: './users', label: 'users', icon: <PeopleIcon/>},
// 	{role: 'ADMIN', link: './transactions', label: 'transactions', icon: <AccountBalanceIcon/>},
// 	{role: 'ADMIN', link: './daily-statements', label: 'statements', icon: <EventIcon/>},
// 	{role: 'ADMIN', link: './messages', label: 'messages', icon: <EmailIcon/>},
// 	{role: 'ADMIN', link: './blog-posts', label: 'blog-posts', icon: <ChatIcon/>},
//
// 	{role: 'USER', link: './deposit', label: 'deposit', icon: <CreditCardIcon/>},
// 	{role: 'USER', link: './withdraw', label: 'withdraw', icon: <AccountBalanceWalletIcon/>},
// 	{role: 'USER', link: './history', label: 'history', icon: <HistoryIcon/>},
// 	{role: 'USER', link: './settings', label: 'settings', icon: <SettingsIcon/>},
// ];

export const Sidebar: React.FC = () => {

	const authContext = useContext(AuthContext);

	// const [menuItems, setMenuItems] = useState([]);
	// useEffect(() => {
	// 	let res: any[] = [];
	// 	menuItemsAll.forEach((el: any) => {
	// 		if (authContext.user.roles.includes(el.role)) {
	// 			res.push(el);
	// 		}
	// 	});
	// 	setMenuItems(res);
	// }, [authContext.user.roles]);

	return (
		<Hidden smDown>
			<Control>
				<SideBarPanel>
					<MenuList>
						{authContext.menuItems && authContext.menuItems.map(((item, i) => {
							const needSeparator = i > 0 && authContext.menuItems[i - 1].role !== item.role;
							return (
								<MenuItem key={i}>
									{needSeparator ? <Separator/> : null}
									<MenuItemButton>
										<Link to={item.link}>
											<MenuItemIcon>{item.icon}</MenuItemIcon>
											<Typography variant={'button'}>{item.label}</Typography>
										</Link>
									</MenuItemButton>
								</MenuItem>
							);
						}))}
					</MenuList>
				</SideBarPanel>
				<Box flexGrow={1}/>
				{/*<SideBarPanel>*/}
				{/*	<MenuList>*/}
				{/*		<MenuItem>*/}
				{/*			<MenuItemButton>*/}
				{/*				<Link to={'./support'}>*/}
				{/*					<MenuItemIcon><SmsIcon/></MenuItemIcon>*/}
				{/*					<Typography variant={'button'}>{'support'}</Typography>*/}
				{/*				</Link>*/}
				{/*			</MenuItemButton>*/}
				{/*		</MenuItem>*/}
				{/*	</MenuList>*/}
				{/*</SideBarPanel>*/}
			</Control>
		</Hidden>
	);
};
