import React from 'react';
import styled from "styled-components";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MuiFormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Control = styled(MuiFormControl)`
  // min-width: 120px;
  
  // legend {
  // 	width: min-content;
  // }  
`;

interface ControlProps {
	values: any[],
	value: string | null,
	onChange?: (value: string) => void,
	label?: any;
	labelWidth?: number;
	fullWidth?: boolean;
	error?: boolean;
	helperText?: string;
	variant?: 'standard' | 'outlined' | 'filled';
	style?: any;
	disabled?: boolean;
}

export const Dropdown: React.FC<ControlProps> = (props) => {
	return (
		<Control
			error={props.error}
			style={props.style}
			variant={props.variant ? props.variant : 'outlined'}
			fullWidth={props.fullWidth}
			disabled={props.disabled}
		>
			{props.label
				? <InputLabel>{props.label}</InputLabel>
				: null}
			<Select
				value={props.value}
				onChange={event => props.onChange && props.onChange(event.target.value as string)}
				label={props.label}

			>
				{props.values.map((el, i) => {
					let value;
					let caption;
					if (el.id || el.value) {
						value = el.id ? el.id : el.value;
						caption = el.value ? el.value : el.id;
					} else {
						value = el;
						caption = el;
					}
					return <MenuItem key={i} value={value}>{caption}</MenuItem>
				})}
			</Select>
			{props.helperText
				?
				<p className={"MuiFormHelperText-root MuiFormHelperText-contained" + (props.error ? ' Mui-error' : '')}>
					{props.helperText}
				</p>
				: null
			}
		</Control>
	)
};
