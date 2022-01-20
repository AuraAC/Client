import React from 'react';
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import {Dropdown} from "./Dropdown";

const Root = styled(TextField)`	
	.MuiOutlinedInput-adornedEnd {
			padding-right: 0;
			
			.MuiFormControl-root {
				fieldset {
					border-top: none;
					border-right: none;
					border-bottom: none;
				}
			}
	}

	.MuiFormControl-root {
		min-width: 142px;
	}
	
	.MuiInputBase-root.Mui-disabled {
		color: rgba(0, 0, 0, 0.6);
	
		.MuiSvgIcon-root {
			display: none;
		}
	}	
`;


interface ControlProps {
	label?: any;
	amount: string;
	onAmountChange: (value: string) => void,
	currency: string,
	onCurrencyChange: (value: string) => void,
	currencies: any[],
	fullWidth?: boolean;
	error?: boolean;
	helperText?: string;
	dropdownDisabled?: boolean;

	// onChange: (value: string) => void,
	// label?: any;
	// labelWidth?: number;
	// variant?: 'standard' | 'outlined' | 'filled';
	// style?: any;
}

export const CurrencyInput: React.FC<ControlProps> = (props) => {
	return (
		<Root
			variant='outlined'
			fullWidth={props.fullWidth}
			label={props.label}
			value={props.amount}
			onChange={e => props.onAmountChange(e.target.value)}
			error={props.error}
			helperText={props.helperText}
			InputProps={{
				endAdornment: (
					<Dropdown
						// style={{width: '60px'}}
						// variant="standard"
						values={props.currencies}
						value={props.currency}
						disabled={props.dropdownDisabled}
						onChange={val => props.onCurrencyChange(val)}
					/>
				),
			}}
		/>
	)
};
