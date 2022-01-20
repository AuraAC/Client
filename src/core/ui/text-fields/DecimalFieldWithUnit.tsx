import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import {FormControl} from '@material-ui/core';
// import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import styled, {css} from 'styled-components';
import {DecimalInput} from './DecimalInput'
import {Rounding} from '../../../utils/Rounding';

const StyledFormControl = styled(FormControl)<{mb: number}>`
  ${props => props.mb && css`margin-bottom: ${props.theme.spacing(props.mb)}px;`} 

  .MuiInputBase-input {
    padding: 0 4px;
  }
`;

const StyledInputAdornment = styled(InputAdornment)`
  border-left: 1px solid ${props => props.theme.palette.divider};
  height: 20px;
  padding: 0 2px;
  
  p {
    font-size: 11px;
  }
`;

interface DecimalFieldWithUnitProps {
  id: string;
  label: string;
  unit: string;
  value?: string;
  helperText?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  size?: 'small' | 'medium',
  fullWidth?: boolean,
  mb?: number,
  disabled?: boolean,
  readOnly?: boolean,
  rounding?: Rounding,
}

export const DecimalFieldWithUnit: React.FC<DecimalFieldWithUnitProps> = ({
                                                                      id,
                                                                      label,
                                                                      unit,
                                                                      value,
                                                                      helperText,
                                                                      onChange,
                                                                      size = 'medium',
                                                                      fullWidth,
                                                                      mb,
                                                                      disabled,
                                                                      readOnly,
                                                                      rounding
                                                                    }) => {

  return (
      <StyledFormControl size={size} fullWidth={fullWidth} mb={mb} >
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <DecimalInput
          id={id}
          value={value}
          rounding={rounding}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          endAdornment={<StyledInputAdornment position="end">{unit}</StyledInputAdornment>}
          autoComplete="off"
        />
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </StyledFormControl>
  );

};
