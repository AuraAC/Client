import React, {useState} from 'react';
import MuiFormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import styled, {css} from 'styled-components';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const FormControl = styled(MuiFormControl)<{ mb: number }>`
  ${props => props.mb && css`
      margin-bottom: ${props.theme.spacing(props.mb)}px;
`}`;

interface ComponentProps {
	id?: string;
	label?: any;
	value?: string;
	helperText?: string;
	onChange?: (e: any) => void;
	size?: 'small' | 'medium',
	fullWidth?: boolean,
	mb?: number,
	disabled?: boolean,
	readOnly?: boolean,
	autoComplete?: string,
	style?: any
}

export const Password: React.FC<ComponentProps> = (props) => {

	// const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(oldVal => !oldVal);
	};

	const handleMouseDownPassword = (event: any) => {
		event.preventDefault();
	};

	return (
		<FormControl
			size={props.size}
			fullWidth={props.fullWidth}
			mb={props.mb}
			style={props.style}
		>
			<InputLabel
				htmlFor={props.id}
				className={'MuiInputLabel-outlined'}
				style={{background: '#FFF', paddingRight: '6px'}}
			>
				{props.label}
			</InputLabel>
			<OutlinedInput
				id={props.id}
				type={showPassword ? 'text' : 'password'}
				value={props.value}
				onChange={props.onChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
				labelWidth={70}
			/>
		</FormControl>
	);

};
