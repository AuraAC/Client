import React, {Context, useCallback, useState} from 'react';
import {MuiThemeProvider, createMuiTheme, StylesProvider, Theme} from '@material-ui/core/styles';
import {ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import {Overrides} from '@material-ui/core/styles/overrides';
import {CSSProperties} from '@material-ui/core/styles/withStyles';
import {ToggleButtonClassKey, ToggleButtonGroupClassKey} from '@material-ui/lab';
import {ContainerClassKey} from 'notistack';

const appBarHeight = '80px';
const sideBarWidth = '160px';
const fontPrimary = 'Roboto, sans-serif';

// TODO: set up the common theme attributes here. Extend further with the light/dark theme-specific settings
// const themeBase = {};

interface ExtendedOverrides extends Overrides {
  MuiToggleButtonGroup: Partial<Record<ToggleButtonGroupClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
  MuiToggleButton: Partial<Record<ToggleButtonClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
  Snackbar: Partial<Record<ContainerClassKey, CSSProperties | (() => CSSProperties)>> | undefined;
}

interface ExtendedTheme extends Theme {
  overrides?: ExtendedOverrides,
  custom: {
    metrics: {
      [attribute: string]: string
    },
    palette: {
      [attribute: string]: string
    }
  }
}

const applyOverrides = (theme: Theme): ExtendedTheme => {
  const extendedTheme = theme as ExtendedTheme;

  // common custom theme parameters
  extendedTheme.custom = {
    metrics: {
      appBarHeight: appBarHeight,
      sideBarWidth: sideBarWidth
    },
    palette: {}
  };

  // specific colors for light and dark themes
  if (extendedTheme.palette.type === 'dark') {
    extendedTheme.custom.palette = {
      green: '#B1DDD5',
      red: '#EF9A9A',
			alert: '#EF5350',
			success: '#4CB1A0',
      sideBar: '#3F4147',
      sideBarText: 'rgba(255, 255, 255, 0.84)',
      sideBarHover: '#343539'
    };
  }
  else {
    extendedTheme.custom.palette = {
      green: '#4CB1A0',
      red: '#EF5350',
			alert: '#EF5350',
			success: '#4CB1A0',
      sideBarText: 'rgba(255, 255, 255, 0.84)',
      sideBar: '#3F4147',
      sideBarHover: '#343539'
    };
  }

  extendedTheme.overrides = {
    ...extendedTheme.overrides,
    // MuiTouchRipple: {
    //   child: {
    //     backgroundColor: '#DDDFE6'
    //   }
    // },
    // MuiButtonBase: {
    //   root: {
    //     fontFamily: fontSecondary
    //   }
    // },
    // MuiButton: {
    //   root: {
    //     borderRadius: '16px',
    //     fontFamily: fontSecondary,
    //     fontSize: '12px',
    //     lineHeight: '16px',
    //     fontWeight: 600,
    //     padding: '8px 16px'
    //   },
    //   containedPrimary: {},
    //   label: {},
    //   containedSizeLarge: {
    //     padding: '7px 22px',
    //     fontSize: '16px',
    //     lineHeight: '20px',
    //     borderRadius: '8px'
    //   }
    // },
		MuiSelect: {
			root: {
				'&:focus': {
					// background: 'none'
				}
			}
		},
		MuiTableCell: {
			root: {
				borderBottom: 'none',
				wordBreak: 'break-all',
				'&$sizeSmall': {
					fontSize: '12px',
					height: '20px',
					lineHeight: '20px',
					padding: '0 6px',

					'&:first-child': {
						paddingLeft: '16px'
					},
					'&:last-child': {
						paddingRight: '16px'
					}
				}
			},

			head: {
				//boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`,
				'&:before': {
					content: '""',
					display: 'block',
					position: 'absolute',
					height: '1px',
					left: '0',
					right: '0',
					bottom: '0',
					backgroundColor: theme.palette.divider
				},

				'&$sizeSmall': {
					height: '24px',
					lineHeight: '24px',
					verticalAlign: 'top',

					'&:first-child:before': {
						left: '16px'
					},
					'&:last-child:before': {
						right: '16px'
					}
				},
				'&>span': {
					height: '20px',
					lineHeight: '20px',
					verticalAlign: 'top',
					whiteSpace: 'nowrap'
				}
			},
			stickyHeader: {
				backgroundColor: theme.palette.background.paper,
				left: 'auto'
			}
		},
		MuiTableSortLabel: {
			root: {
				whiteSpace: 'nowrap'
			},
			icon: {
				height: '18px',
				width: '18px',
				marginLeft: 0,
				marginRight: 0
			}
		},
		MuiTab: {
    	root: {
    		// minWidth: '101px',
				[theme.breakpoints.up("xs")]: {
					minWidth: '100px',
				}
    	}
		}
  };

//MuiTableCell-root MuiTableCell-head MuiTableCell-alignLeft MuiTableCell-sizeSmall MuiTableCell-stickyHeader
  return extendedTheme;
};

const lightTheme = applyOverrides(createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 992,
			lg: 1280,
			xl: 1920,
		},
	},
  props: {
    MuiTabs: {
      indicatorColor: 'primary',
    },
    MuiButton: {
      disableElevation: true
    },
    MuiInput: {
      disableUnderline: true
    },
    // MuiInputLabel: {
    //   disableAnimation: true,
    //   shrink: true
    // }
  },
  typography: {
    fontFamily: fontPrimary,
    h1: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '36px'
    },
    h2: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '22px',
      lineHeight: '32px'
    },
    h3: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '28px'
    },
    h4: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '18px'
    },
    h5: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px'
    },
    h6: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '20px'
    },
		// 'subtitle1'
		// 'subtitle2'
		body1: {
			fontFamily: fontPrimary,
			fontWeight: 400,
			fontSize: '14px',
			lineHeight: '16px'
		},
		// 'body2'
		button: {
			fontFamily: fontPrimary,
			fontWeight: 400,
			fontSize: '14px',
			lineHeight: '16px',
			textTransform: 'uppercase'
		},
		caption: {
      fontFamily: fontPrimary,
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '12px'
    }
		// 'overline'
		// 'srOnly'
		// 'inherit'
  },
  palette: {
    type: 'light',
    primary: {
      light: '#56B7D3',
      main: '#0096C3',
      dark: '#087CA7',
      contrastText: '#FFFFFF'
    },
    // secondary: {
    //   50: '#DFF1EF',
    //   100: '#B1DDD5',
    //   200: '#7EC7BB',
    //   300: '#4CB1A0',
    //   400: '#26A08D',
    //   500: '#058F7A',
    //   600: '#04836E',
    //   700: '#02735F',
    //   800: '#006351',
    //   900: '#004736'
    //   // A100: string;
    //   // A200: string;
    //   // A400: string;
    //   // A700: string;
    // },
    background: {
      default: '#000',
      paper: '#FFFFFF'
    },
    contrastThreshold: 2,
    divider: '#DDDFE6',
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.60)',
      disabled: 'rgba(0,0,0,0.30)'
    }
  }
}));

// extend with custom params
// lightTheme.custom = {
//   appBarHeight: appBarHeight,
//   sideBarWidth: sideBarWidth,
// };

const darkTheme = applyOverrides(createMuiTheme({
  palette: {
    type: 'dark',
    // primary: blueGrey,
    primary: {
      main: '#ffffff'
    },
    // secondary: amber,
    secondary: {
      main: '#b0b0b0'
    },
    background: {
      default: '#000D17',
      // paper: '#323B43'
      paper: '#000D17'
    }
    // text: {
    //   primary: '#FFFFFF',
    //   secondary: '#CCCCCC'
    // }
  }
}));

// extend with custom params
// darkTheme.custom = {
//   appBarHeight: appBarHeight,
//   sideBarWidth: sideBarWidth,
// };

export interface ThemeContextProps {
  isDarkMode: boolean,
  setDarkMode: (value: boolean) => void
}

export const ThemeContext: Context<ThemeContextProps> = React.createContext(null);

export const ThemeProvider: React.FC = ({children}) => {
  // TODO: restore last user setting on startup (localStorage?)
  const [isDarkMode, setDarkMode] = useState(false);

  const handleSetDarkMode = useCallback((value: boolean) => {
    setDarkMode(value);
  }, []);

  return (
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <StyledComponentsThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <ThemeContext.Provider value={{isDarkMode: isDarkMode, setDarkMode: handleSetDarkMode}}>
              {children}
            </ThemeContext.Provider>
          </StyledComponentsThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
  );
};
