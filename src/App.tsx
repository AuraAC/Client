import React from 'react';
import {Router} from '@reach/router';
import {routes} from './routes';
import {ApolloProvider} from '@apollo/react-hooks';
import {apolloClient} from './store/apolloClient';
import {CssBaseline} from '@material-ui/core';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {SnackbarProvider} from 'notistack';
import DateFnsUtils from '@date-io/date-fns';
import {AuthProvider} from './core/providers/AuthProvider';
import {RestApiProvider} from './core/providers/RestApiProvider';
import {ThemeProvider} from './core/providers/ThemeProvider';
import {LocalizationProvider} from './core/providers/LocalizationProvider';

import './App.scss'; // global app styles

const App: React.FC = () => {
	return (
		<>
			<CssBaseline/>
			<ApolloProvider client={apolloClient}>
				<AuthProvider>
					<RestApiProvider>
						<ThemeProvider>
							<LocalizationProvider>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<SnackbarProvider
										maxSnack={3}
										autoHideDuration={3000}
										anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
									>
										<Router>
											{routes}
										</Router>
									</SnackbarProvider>
								</MuiPickersUtilsProvider>
							</LocalizationProvider>
						</ThemeProvider>
					</RestApiProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
};

export default App;
