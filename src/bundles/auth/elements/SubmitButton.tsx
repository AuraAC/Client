import styled from "styled-components";

export const SubmitButton = styled.button`
  color: white;
  background-color: #00b0e4;
  border-radius: 4px;
  border: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 24px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  // margin-top: 16px;
  
  &:active, &:focus {
    outline: none;
  }
    
  &[disabled] {
    color: #888;
  }
`;
