import React from "react";
import {Router, RouteComponentProps, navigate} from "@reach/router";
import styled from 'styled-components'
import {routes} from '../routes';
import IconButton from "@material-ui/core/IconButton";

const Component = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 32px;  
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 540px;
  align-items: flex-start;
`;

const Dialog = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 24px;
  border-radius: 5px;
  
  border: 1px solid #ccc;
`;

const LogoButton = styled(IconButton)`
  padding: 0;
  margin: 0 0 8px 0;
`;

export const Auth: React.FC<RouteComponentProps> = (props) => {

	const onLogoClick = (e: any) => {
		e.preventDefault();
		navigate('/').then();
	};

	return (
		<Component>
			<Wrapper>
				<Dialog>
					<Router>
						{routes}
					</Router>
				</Dialog>
			</Wrapper>
		</Component>
	);
};
