import styled from "styled-components";
import React from "react";
import MuiButton from "@material-ui/core/Button";

const Button = styled(MuiButton)`
  text-transform: none;
  color: #fff;
  
  &:hover {
    opacity: 0.87;    
    background: inherit;
  }  
`;

const GoogleButton = styled(Button)`
  background: #DE4B38;  
  
  &:hover {
  	background: #DE4B38;  	        
  }  
`;

const FacebookButton = styled(Button)`
  background: #3B599A;
  
  &:hover {
  	background: #3B599A;  	        
  }  
`;

interface ControlProps {
	id?: string;
	provider: string;
	label: string;
	onClick: () => void
}

export const SocialButton: React.FC<ControlProps> = ({id, provider, label, onClick}) => {
	if (provider === 'google') {
		return (
			<GoogleButton
        fullWidth
        onClick={onClick}
      >
				{label}
			</GoogleButton>
		)
	} else if (provider === 'facebook') {
		return (
			<FacebookButton
        fullWidth
        onClick={onClick}
      >
				{label}
			</FacebookButton>
		)
	}

	return null;
};
