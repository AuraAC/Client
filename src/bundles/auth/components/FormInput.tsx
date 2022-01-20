import styled from "styled-components";
import React from "react";

/* region Styles */
const Wrap = styled.div`
  position: relative;  
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  color: #fff;
  padding: 0;
`;

const Input = styled.input`
  line-height: 36px;
  height: 36px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #888;
  padding: 0 16px;
  font-size: 14px;
  color: #fff;
  background: none;
  cursor: pointer;
  
  &:active, &:focus {
    outline: none;
  }
  
  &:-webkit-autofill,
  &:-webkit-autofill:active,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:hover {
    box-shadow: 0 0 0 20px #000d17 inset !important;
    -webkit-text-fill-color: #fff !important;
  }

`;

/* endregion */


export interface FormInputProps {
  id?: string;
  name?: string;
  label: string;
  autoComplete?: string;
  type?: 'text' | 'number' | 'password';
  value: string;
  disabled?: boolean;
  pattern?: string;
  placeholder?: string;
  onChange: (e: any) => void;
}

export const FormInput: React.FC<FormInputProps> = (
  {
    id,
    name,
    label,
    autoComplete,
    type,
    value,
    disabled,
    pattern,
    placeholder,
    onChange
  }
) => {

  return (
    <Wrap>
      <Label>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        pattern={pattern}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Wrap>
  );
};
