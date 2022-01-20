import styled from "styled-components";
import React from "react";

/* region Styles */
const Wrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;  
  margin-bottom: 16px;
  margin-top: 16px;
`;

const Label = styled.label`
  display: block;
  // color: #fff;
  padding: 0;
`;

const Input = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 24px;
`;

/* endregion */


export interface FormCheckboxProps {
  id: string;
  name: string;
  label: string;
  value: boolean;
  disabled?: boolean;
  onChange: (e: any) => void
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
                                                      id,
                                                      name,
                                                      label,
                                                      value,
                                                      disabled,
                                                      onChange
                                                    }) => {

  return (
      <Wrap>
        <Input
            id={id}
            name={name}
            type="checkbox"
            checked={value}
            disabled={disabled}
            onChange={onChange}
        />
        <Label>{label}</Label>
      </Wrap>
  );
};
