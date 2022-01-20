import React, {Context, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {navigate} from '@reach/router';
import {
	User,
	LoginResult,
	Maybe,
	Scalars,
	UserContact,
	UserMode,
	UserNotificationSubscription,
	UserRolePermission,
	UserRole
} from '../../store/generated-models';
import {useApolloClient, useMutation, useQuery, useSubscription} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {tokenStorage} from '../../bundles/common/tokenStorage';
import config from '../../config';
import {UserRoles} from '../constants/userRoles';
import ReCAPTCHA from 'react-google-recaptcha';
import {PopupMessage} from '../components/PopupMessage';
import PeopleIcon from "@material-ui/icons/People";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import EventIcon from "@material-ui/icons/Event";
import EmailIcon from "@material-ui/icons/Email";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import HistoryIcon from "@material-ui/icons/History";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from '@material-ui/icons/Home';
// import {USER_RESULT, gqlSettings} from './gql';
import {USER_RESULT} from './gql';

const SESSION_INACTIVITY_TIMEOUT = 1800; // seconds before auto-logout kicks in
const SESSION_TIMEOUT_COUNTDOWN = 30; // seconds to show the dialog before logging out

const clearUser: User = {
	userId: '',
	email: '',
	systemUser: false,
	roles: [],
	is2faEnabled: false,
	hasEmailAuth: false,
};

const menuItemsAll = [
	{role: 'ADMIN', link: './users', label: 'users', icon: <PeopleIcon/>, userValid: false},
	{role: 'ADMIN', link: './transactions', label: 'transactions', icon: <AccountBalanceIcon/>, userValid: false},
	{role: 'ADMIN', link: './daily-statements', label: 'statements', icon: <EventIcon/>, userValid: false},
	{role: 'ADMIN', link: './messages', label: 'messages', icon: <EmailIcon/>, userValid: false},
	{role: 'ADMIN', link: './blog-posts', label: 'blog-posts', icon: <ChatIcon/>, userValid: false},
	{role: 'ADMIN', link: './kyc', label: 'kyc', icon: <PeopleOutlineIcon/>, userValid: false},

	{role: 'MINTER', link: './token', label: 'token', icon: <AccountBalanceIcon/>, userValid: false},

	{role: 'USER', link: './home', label: 'home', icon: <HomeIcon/>, userValid: true},
	// {role: 'USER', link: './deposit', label: 'deposit', icon: <CreditCardIcon/>, userValid: true},
	// {role: 'USER', link: './withdraw', label: 'withdraw', icon: <AccountBalanceWalletIcon/>, userValid: true},
	// {role: 'USER', link: './history', label: 'history', icon: <HistoryIcon/>, userValid: true},
	{role: 'USER', link: './settings', label: 'settings', icon: <SettingsIcon/>, userValid: false},
];

export interface AuthContextProps {
	isInitialized: boolean;
	user: User | null;
	refetchUser: () => void,
	getSettings: () => void,
	login: (loginResult: LoginResult) => void
	logout: () => void,
	clearSession: () => void,
	recaptchaToken: string | null;
	updateRecaptcha: () => Promise<string> | null;
	showMessage: (type: 'success' | 'error', message: string) => void;
	isNewNotification: boolean;
	setIsNewNotification: (flag: boolean) => void;
	notificationCounter: number;
	incNotificationCounter: () => void;
	updateUser: (param: any) => void;
	menuItems: any[];
}

export const AuthContext: Context<AuthContextProps> = React.createContext(null);

export const AuthProvider: React.FC = ({children}) => {

	const gqlClient = useApolloClient();

	const {
		error: userError,
		data: userData,
		refetch: userRefetch
	} = useQuery<{ me: User }>(gql`
      query Me {
          me {
              ${USER_RESULT}
          }
      }
	`);

	// const {
	// 	error: settingsError,
	// 	data: settingsData,
	// 	refetch: settingsRefetch
	// } = useQuery(gqlSettings, {
	// 	displayName: 'getSettings'
	// });

	const getSettings = () => {
		// settingsRefetch().then();
	};

	const [logoutMutation, {error: logoutMutationError, data: logoutMutationData}] = useMutation<{ logout: boolean }>(gql`
      mutation Logout {
          logout
      }
	`);

	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isNewNotification, setIsNewNotification] = useState<boolean>(false);
	const [notificationCounter, setNotificationCounter] = useState(0);

	const [user, setUser] = useState<User>(clearUser);
	const [settings, setSettings] = useState<any>({});
	const [transactionParams, setTransactionParams] = useState<any>({});

	const userRef = useRef<User>(null); // need that for using in click event listeners and timeouts, otherwise they won't access the current value
	const companyRef = useRef(null);
	const settingsRef = useRef(null);
	const transactionParamsRef = useRef(null);

	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		let res: any[] = [];
		menuItemsAll.forEach((el: any) => {
			// if (user.roles.includes(el.role) && (!el.userValid || user.valid)) {
			if (['USER'].includes(el.role)) {
				res.push(el);
			}
		});

		setMenuItems(res);
	}, [user.roles]); // eslint-disable-line react-hooks/exhaustive-deps


	// const login = useCallback((user: User, accessToken: string, company: Company) => {
	const login = useCallback((loginResult: LoginResult) => {
		setUser(loginResult.user);
		tokenStorage.accessToken = loginResult.authToken;
		userRef.current = user;
		settingsRef.current = settings;
		transactionParamsRef.current = transactionParams;
		// resetWatchdog();
		setIsInitialized(true);

		// console.debug('>>> ROLE', loginResult.user, UserRoles.admin);

		// 	if (loginResult.user.roles.includes(UserRoles.admin)) {
		// 		// console.debug('>> ROLE ADMIN');
		// 		navigate('/private/users').then();
		// 	} else {
		// 		// console.debug('>> ROLE USER');
		// 		navigate(loginResult.user.valid ? '/private' : '/private/settings').then();
		// 	}

		navigate('/private').then();

	}, []); // eslint-disable-line

	const logout = useCallback(() => {
		// console.debug('>> start logout mutation');
		logoutMutation().catch();
	}, []); // eslint-disable-line

	const clearSession = () => {
		tokenStorage.clearToken();
		setUser(clearUser);
		userRef.current = null;
		companyRef.current = null;
		settingsRef.current = null;
		transactionParamsRef.current = null;
		resetWatchdog();
		gqlClient.clearStore().catch();
		// let the protected page guard to navigate to an appropriate page
	};

	// Logout effect
	useEffect(() => {
		if (logoutMutationData) {
			// console.debug('>> logoutMutationData');
			clearSession();
		}
	}, [logoutMutationError, logoutMutationData]); // eslint-disable-line react-hooks/exhaustive-deps

	// // Refresh token mutation effect
	// const [refreshTokenMutation, {
	// 	error: refreshTokenMutationError,
	// 	data: refreshTokenMutationData
	// }] = useMutation<{ refreshToken: string }>(gql`
	//     mutation refreshToken {
	//         refreshToken
	//     }
	// `);
	//
	// // Refresh token mutation effect
	// useEffect(() => {
	//   if (refreshTokenMutationError) {
	//     console.warn('refreshTokenMutationError:', refreshTokenMutationError);
	//     // setIsInitialized(true);
	//     return;
	//   }
	//
	//   if (refreshTokenMutationData) {
	// 		if (refreshTokenMutationData.refreshToken) {
	// 			tokenStorage.accessToken = refreshTokenMutationData.refreshToken;
	// 			getUser();
	// 		} else {
	// 			setIsInitialized(true);
	// 		}
	//     return;
	//   }
	// }, [refreshTokenMutationError, refreshTokenMutationData]);
	//
	// // Initialize auth state
	// useEffect(() => {
	// 	refreshTokenMutation().catch();
	// }, []);

	// Initialize auth state
	useEffect(() => {
		// try to use refresh token. Manually call the mutation to use cookies (the main graphql client doesn't pass cookies)
		const params = {
			operationName: 'RefreshToken',
			query: `
            mutation RefreshToken {
              refreshToken
            }
          `
		};

		// Execute the re-authorization request and set the promise returned to this.refreshPromise
		fetch(config.apiUrl, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(params)
		})
			.then(refreshResponse => refreshResponse.json())
			.then(refreshResponseJson => {
				if (refreshResponseJson.data && refreshResponseJson.data.refreshToken) {
					tokenStorage.accessToken = refreshResponseJson.data.refreshToken as string;
					// getUser();
					userRefetch().then();
				} else {
					setIsInitialized(true);
				}
			})
			.catch(error => {
				return Promise.reject(error);
			});
	}, []); // eslint-disable-line

	// region Recaptcha helpers
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef: MutableRefObject<ReCAPTCHA> = useRef(null);
	const recaptchaPromiseCallbacks: MutableRefObject<{
		accept: (value?: string | PromiseLike<string>) => void,
		reject: (reason?: string) => void
	}> = useRef(null);

	const updateRecaptcha = useCallback(() => {
		if (recaptchaRef.current) {
			return new Promise<string>((accept, reject) => {
				recaptchaPromiseCallbacks.current = {
					accept: accept,
					reject: reject
				};
				recaptchaRef.current.reset();
				recaptchaRef.current.execute();
			});

		}
		return null;
	}, [recaptchaRef, recaptchaPromiseCallbacks]);

	const onRecaptchaChange = useCallback((token: any) => {
		if (token) {
			recaptchaPromiseCallbacks.current.accept(token);
		} else {
			recaptchaPromiseCallbacks.current.reject();
		}
		setRecaptchaToken(token);
	}, []);
	// endregion

	// region error message helpers
	const [messageState, setMessageState] = useState({type: null, message: null});

	const showMessage = useCallback((type, message) => {
		setMessageState({type: type, message: message});

		setTimeout(() => {
			setMessageState({type: null, message: null});
		}, 6000);
	}, []);

	// endregion

	// Refresh token mutation effect
	// useEffect(() => {
	//   if (refreshTokenMutationError) {
	//     setIsInitialized(true);
	//     return;
	//   }
	//
	//   if (refreshTokenMutationData) {
	//     getUser();
	//     return;
	//   }
	// }, [refreshTokenMutationError, refreshTokenMutationData]);

	// Current user request effect
	useEffect(() => {
		if (userData) {
			setUser(userData.me);
			userRef.current = userData.me;
			resetWatchdog();
			setIsInitialized(true);
			return;
		}
	}, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (userError) {
			setIsInitialized(true);
			return;
		}
	}, [userError]);

	// useEffect(() => {
	// 	if (settingsData && settingsData.getSettings && settingsData.getSettings.transactionParams) {
	// 		setTransactionParams({...settingsData.getSettings.transactionParams});
	// 	}
	//
	// 	if (settingsError) {
	// 		// setIsInitialized(true);
	// 		return;
	// 	}
	// }, [settingsError, settingsData]); // eslint-disable-line

	// region timeout dialog
	const [isTimeoutDialogOpen, setTimeoutDialogOpen] = useState<boolean>(false);
	const [timeoutCountdown, setTimeoutCountdown] = useState<number>(SESSION_TIMEOUT_COUNTDOWN);
	const watchdogTimeout = useRef<any>(null);

	const resetWatchdog = () => {
		if (watchdogTimeout.current) {
			clearTimeout(watchdogTimeout.current);
		}

		// activate watchdog if user is logged in
		if (userRef.current) {
			watchdogTimeout.current = setTimeout(() => {
				showTimeoutDialog();
			}, SESSION_INACTIVITY_TIMEOUT * 1000);
		}
	};

	const handleTimeoutDialogClose = () => {
		setTimeoutDialogOpen(false);
	};

	const showTimeoutDialog = () => {
		setTimeoutCountdown(SESSION_TIMEOUT_COUNTDOWN);
		setTimeoutDialogOpen(true);
	};

	const updateNotificationCounter = () => {
		setNotificationCounter(notificationCounter + 1);
	};

	// countdown effect
	useEffect(() => {
		let timeout: any = null;
		if (isTimeoutDialogOpen) {
			// time is up
			if (timeoutCountdown <= 0) {
				handleTimeoutDialogClose();
				logout();
			}
			timeout = setTimeout(() => {
				setTimeoutCountdown(timeoutCountdown => timeoutCountdown - 1);
			}, 1000);
		} else {
			if (!isTimeoutDialogOpen) {
				clearTimeout(timeout);
			}
		}
		return () => clearInterval(timeout);
	}, [isTimeoutDialogOpen, timeoutCountdown]); // eslint-disable-line

	// start activity tracking watchdog
	useEffect(() => {
		resetWatchdog();

		document.body.addEventListener('click', resetWatchdog);

		return () => {
			if (watchdogTimeout.current) {
				document.body.removeEventListener('click', resetWatchdog);
				clearTimeout(watchdogTimeout.current);
			}
		};
	}, []); // eslint-disable-line

	const updateUser = (params: any) => {
		setUser({...user, ...params});
	};

	const refetchUser = () => {
		// getUser();
		userRefetch().then();
	};
	// endregion


	return (
		<AuthContext.Provider value={{
			isInitialized: isInitialized,
			user: user,
			refetchUser: refetchUser,
			getSettings: getSettings,
			login: login,
			logout: logout,
			clearSession: clearSession,
			recaptchaToken: recaptchaToken,
			updateRecaptcha: updateRecaptcha,
			showMessage: showMessage,
			isNewNotification: isNewNotification,
			setIsNewNotification: setIsNewNotification,
			notificationCounter: notificationCounter,
			incNotificationCounter: updateNotificationCounter,
			updateUser: updateUser,
			menuItems: menuItems
		}}>
			{children}
			<PopupMessage type={messageState.type} message={messageState.message}/>
			<Dialog
				open={isTimeoutDialogOpen}
				onClose={handleTimeoutDialogClose}
				aria-labelledby="session-timeout-dialog-title"
				aria-describedby="session-timeout-description"
			>
				<DialogTitle id="session-timeout-dialog-title">You will be logged out
					in {timeoutCountdown} second{timeoutCountdown > 1 ? 's' : ''}</DialogTitle>
				<DialogContent>
					<DialogContentText id="session-timeout-dialog-description">
						You seem to be inactive for a while. For your security, you will be logged out from the current session.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleTimeoutDialogClose} variant="contained" color="primary" autoFocus>
						I'm still here
					</Button>
				</DialogActions>
			</Dialog>
			<ReCAPTCHA
				ref={recaptchaRef}
				sitekey={config.recaptchaSiteKey}
				size="invisible"
				onChange={onRecaptchaChange}
			/>
		</AuthContext.Provider>
	);
};
