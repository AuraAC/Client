// TODO: replace all usages of this components with a proper message implementation

import styled from "styled-components";
import React from "react";


const Message = styled.div<{
  type: 'success' | 'error';
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  font-weight: 500;
  text-align: center;
  color: ${p => p.type === 'error' ? '#ff1d49' : '#434b42'};
  background: ${p => p.type === 'error' ? '#ffe0e0' : '#e5ffe0'};
`;

interface PopupMessageProps {
  type: 'success' | 'error';
  message: string;
  //onDismiss: () => void
}

export const PopupMessage: React.FC<PopupMessageProps> = ({type, message}) => {
  if (message) {
    return (
        <Message type={type}>
          <span>{message}</span>
        </Message>
    );
  }
  return null;
};
