import React from 'react';
import styled from "styled-components";

import {KeyboardDatePicker} from "@material-ui/pickers";

const Root = styled(KeyboardDatePicker)``;

interface ControlProps {
	value: Date | null;
	label?: any;
	fullWidth?: boolean;
	style?: any;
	format?: string;
	variant?: any;
	margin?: any;
	error?: any;
	onChange?: (date: Date | null) => void;
}

export const DateInput: React.FC<ControlProps> = (props) => {
	return (
		<Root
			fullWidth={props.fullWidth}
			style={props.style}
			disableToolbar
			variant={props.variant ? props.variant : "inline"}
			inputVariant="outlined"
			format={props.format ? props.format : "dd/MM/yyyy"}
			margin={props.margin ? props.margin : "none"}
			autoOk={true}
			error={props.error}
			label={props.label}
			value={props.value ? props.value : null}
			onChange={(val) => {
				if (val) {
					props.onChange(new Date(val.getTime() - val.getTimezoneOffset() * 60000));
				}
			}}
			KeyboardButtonProps={{'aria-label': 'change date'}}
		/>
	)
};
