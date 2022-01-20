import React from "react";
import styled from "styled-components";
import InputAdornment from '@material-ui/core/InputAdornment';
import MuiOutlinedInput from "@material-ui/core/OutlinedInput";
import MuiIconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

export const Input = styled(MuiOutlinedInput)`
  // margin-left: 8px;
  // flex: 1;
`;

export const IconButton = styled(MuiIconButton)`
  // padding: 10;
`;

interface CtrlProps {
	id?: string;
	style?: any;
	value: string;
	onChange: (e: any) => void;
	iconDisabled?: boolean;
	onIconClick?: () => void;
}

export const FldSearch: React.FC<CtrlProps> = (props) => {

	const iconClickHandler = () => {
		props.onIconClick && props.onIconClick();
	};

	return (
		<Input
			placeholder="Search..."
			type="text"
			id={props.id}
			style={props.style}
			value={props.value}
			onChange={props.onChange}
			endAdornment={
				<InputAdornment position="end">
					<IconButton
						disabled={props.iconDisabled}
						edge="end"
						onClick={iconClickHandler}
					>
						<SearchIcon/>
					</IconButton>
				</InputAdornment>
			}
			labelWidth={0}
		/>
	)
};
