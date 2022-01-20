import React, {useCallback, useEffect, useState} from 'react';

import MuiFormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import styled, {css} from 'styled-components';
import {getRoundingRules} from '../../../utils/getRoundingRules';
import {Rounding} from '../../../utils/Rounding';

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
  rounding?: Rounding,
  endAdornment?: any,
  autoComplete?: string
}

export const DecimalInput: React.FC<ComponentProps> = (
  {
    id,
    label,
    value,
    helperText,
    onChange,
    size = 'medium',
    fullWidth,
    mb,
    disabled,
    readOnly,
    rounding,
    endAdornment,
    autoComplete
  }) => {

  const [precision, setPrecision] = useState(0);
  const [inpVal, setInpVal] = useState('');

  // set up allowed precision
  useEffect(() => {
    setPrecision(getRoundingRules(rounding).precision);
  }, [rounding]);

  useEffect(() => {
    setInpVal(value ? value : '');
  }, [value]);

  const handleChange = useCallback((e: any) => {
    let valRaw = e.target.value;

    if (!valRaw && valRaw !== 0) {
      setInpVal('');
      onChange(e);
      return;
    }

    valRaw = valRaw
      .replace(/,/ig, '.')
      .replace(/(^[^.]*.)|[.]+/g, '$1')
      .replace(/[^\d.]/ig, '');

    let val = valRaw;
    let decimalPos = valRaw.indexOf('.');

    if (decimalPos !== -1 && valRaw.slice(-1) !== '.') {
      let realPart = valRaw.substring(0, decimalPos);
      if (realPart.substring(0, 1) === '0') {
        realPart = Number(realPart)
        .toString();
      }

      let decimalPart = valRaw.substring(decimalPos + 1);
      if (decimalPart.length > precision) {
        decimalPart = decimalPart.substring(0, precision);
      }

      val = realPart + '.' + decimalPart;
    }
    else {
      if (val.substring(0, 1) === '0' && val !== '0.') {
        val = Number(val)
        .toString();
      }
    }

    if (val.substring(0, 1) === '.') {
      val = '0' + val;
    }

    setInpVal(val);

    e.target.value = val;
    onChange(e);
  }, [precision, onChange]);

  return (
    <FormControl size={size} fullWidth={fullWidth} mb={mb}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        value={inpVal}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        autoComplete={autoComplete}
        endAdornment={endAdornment}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );

};
