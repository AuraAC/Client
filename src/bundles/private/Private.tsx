import React, {useContext, useEffect, useState} from 'react';
import {navigate, RouteComponentProps, Router} from '@reach/router';
import {routes} from './routes';
import styled from 'styled-components';

import {AuthContext} from "../../core/providers/AuthProvider";
import {Button, Hidden, LinearProgress} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";

// import mainLogo from '../../assets/main-logo.png';
// import mainBackground from '../../../src/assets/main-background.png';
import {Sidebar} from './components/layout/sidebar/Sidebar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

// import {useMutation, useQuery} from '@apollo/react-hooks';
// import {gql} from 'apollo-boost';
// import {AppState, MutationUpdateAppStateArgs} from '../../store/generated-models';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const StyledRouter = styled(Router)`
  height: 100%;
`;

const LayoutWrap = styled.div`
	padding: 20px;
	width: 100%;
	// height: 100vh;
	min-height: 100vh;
	display: flex;  
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  // height: 100%;
  width: 100%;
  
  align-items: center;
  justify-content: center;
  min-height: 700px;
`;

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;  
  
	width: 100%;
	max-width: 1140px;
	height: 42px;	
	margin-bottom: 12px;
		
	.main-logo {
		height: 28px;
	}
`;

const MainWrap = styled.div`
  display: flex;  
  flex-direction: row; 
  
  border-radius: 5px;
	width: 100%;
	height: 100%;
	min-width: 320px;
	max-width: 1140px;	
		
	flexGrow: 1	
	background: #fff;	
	
	border: 1px solid #ddd;
	
	@media(min-width: 991px) {
		max-height: 750px;
	}		
`;

const Main = styled.div`
	// width: 100%;
	width: calc(100% - 190px);
	height: 100%;
	
	@media(max-width: 992px) {
		width: 100%;
	}
`;


// const Main = styled.main`
//   flex: 1 1 auto;
//   background: ${props => props.theme.palette.background.default};
//   overflow: hidden;
//   z-index: 1;
// `;
// const StyledRouter = styled(Router)`
//   height: 100%;
// `;

const MainWrapLoad = styled(MainWrap as any)`
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const LogoBlock = styled.div`
  width: 150px;
  height: 150px;

  .MuiPaper-root {    
    background: #3F4147;
    
    // background: #333333;        
    // animation-name: blink;
    // animation-duration: 2s;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
  }
  
  .MuiDialogContent-root {
    padding: 24px;
  }  
`;

const LogoutButton = styled(Button)`
	min-width: 32px;		
	
	&:hover {
		opacity: 0.75;
	}
`;

// const LogoButton = styled(IconButton)`
//   padding: 0;
//   margin: 0;
// `;

const ListStyled = styled(List)`
	width: 220px;
`;

const ListItemTextStyled = styled(ListItemText)`
	text-transform: capitalize;
`;

const ListItemStyled = styled(ListItem)`
	&.menu-item-separator {
		border-top: 1px solid #DDDFE6;
	}
`;

export const Private: React.FC<RouteComponentProps> = () => {

	const authContext = useContext(AuthContext);
	const [isReady, setIsReady] = useState(false);
	const [mmOpened, setMmOpened] = useState(false);

	useEffect(() => {
		setIsReady(true);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const onLogoutClick = (e: any) => {
		e.preventDefault();
		authContext.logout();
	};

	// const onLogoClick = (e: any) => {
	// 	e.preventDefault();
	// 	navigate('/').then();
	// };

	// const formatBalance = () => {
	// 	try {
	// 		// return new Intl.NumberFormat('en-EN', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(authContext.user.state.contractBalance);
	// 		// return new Intl.NumberFormat('en-EN', {maximumFractionDigits: 2}).format(50.022);
	// 		return 0;
	// 	} catch {
	// 		return '';
	// 	}
	// };

	const formatUserName = () => {
		try {
			// const spacePos = authContext.user.name.indexOf(' ');
			// if (spacePos !== -1)
			// 	return <>{authContext.user.name.substr(0, spacePos)}<br/>{authContext.user.name.substr(spacePos + 1)}</>;
			// return authContext.user.name;
			return authContext.user.email;
		} catch {
			return '';
		}
	};

	const mobileMenuClickHandler = () => {
		setMmOpened(!mmOpened);
	};

	const drawerOnClose = () => {
		setMmOpened(false);
	};

	const menuItemHandleClick = (link: string) => {
		navigate(`${link}`).then();
		setMmOpened(false);
	};


	if (isReady) {
		return (
			<LayoutWrap
				style={{
					// backgroundImage: `url(${mainBackground})`,
					// backgroundSize: 'cover'
				}}
			>
				<Layout>
					<HeaderWrap>
						{/*<LogoButton*/}
						{/*	onClick={onLogoClick}*/}
						{/*>*/}
						{/*	<img src={mainLogo} alt="" className="main-logo"/>*/}
						{/*</LogoButton>*/}

						<div
							style={{
								display: 'flex',
								flex: 1,
								alignItems: 'center',
								justifyContent: 'flex-end'
							}}
						>
							<Hidden smDown>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										// color: '#fff',
										marginLeft: '60px',
										fontSize: '12px',
										textAlign: 'right',
										textTransform: 'uppercase',
									}}
								>
									{formatUserName()}
								</div>

								<LogoutButton
									onClick={onLogoutClick}
									style={{
										padding: 0,
										marginRight: '-4px'
									}}
								>
									<ExitToAppIcon  // AccountCircleIcon, AccountBoxIcon
										style={{
											width: '38px',
											height: '38px',
											// fill: '#fff',
											// margin: '0 -4px 0 12px'
										}}
									/>
								</LogoutButton>
							</Hidden>


							<Hidden mdUp>
								<IconButton
									onClick={mobileMenuClickHandler}
								>
									<MenuIcon
										style={{
											width: '38px',
											height: '38px',
											// fill: '#ffffff',
											// margin: '0 -4px 0 12px'
										}}
									/>
								</IconButton>
								<Drawer anchor="right" open={mmOpened} onClose={drawerOnClose}>
									<ListStyled>

										<ListItem style={{
											display: 'flex',
											flexDirection: 'column'
										}}>
											<span style={{fontSize: '14px'}}>{formatUserName()}</span>
										</ListItem>
										<Divider/>
										{authContext.menuItems && authContext.menuItems.map((el: any, i: number) => {
											const needSeparator = i > 0 && authContext.menuItems[i - 1].role !== el.role;
											return (
												<ListItemStyled
													button
													key={i}
													onClick={() => menuItemHandleClick(el.link)}
													className={needSeparator ? 'menu-item-separator' : null}
												>
													<ListItemTextStyled primary={el.label}/>
												</ListItemStyled>
											)
										})}
										<Divider/>
										<ListItem button onClick={onLogoutClick}>
											<ListItemText primary={'LOGOUT'}/>
										</ListItem>
									</ListStyled>
								</Drawer>
							</Hidden>


						</div>
					</HeaderWrap>

					<MainWrap>
						<Sidebar/>
						<Main>
							<StyledRouter>
								{routes}
							</StyledRouter>
						</Main>
					</MainWrap>

				</Layout>
			</LayoutWrap>
		);
	} else {
		// LOADER
		return (
			<Layout>
				<MainWrapLoad>
					<LogoBlock>
						{/*<img src={logoLargeLight} alt="logo-large" className="large"/>*/}
						<LinearProgress
							// variant="query"
						/>
					</LogoBlock>
				</MainWrapLoad>
			</Layout>
		);
	}
};
