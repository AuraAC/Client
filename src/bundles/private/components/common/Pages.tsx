import styled from "styled-components";

export const PageWrap = styled.div`
	padding: 24px 32px;
	height: 100%;
	display: flex;
  flex-direction: column;
  
  @media(max-width: 480px) {
		padding: 24px 16px;
	}    
`;
