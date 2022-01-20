import React from 'react';
import styled from 'styled-components';
import {RouteComponentProps} from '@reach/router';
import MuiContainer from '@material-ui/core/Container';

const Container = styled(MuiContainer)`
	display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
`;

const Wrap = styled.div`
	background-color: #ffffff;
	min-height: 400px;	
	width: 1024px;
	padding: 20px;
`;

export const Sandbox: React.FC<RouteComponentProps> = (props) => {
	return (
		<Container maxWidth="lg">
			<Wrap>
				SANDBOX
			</Wrap>
		</Container>
	);
};
