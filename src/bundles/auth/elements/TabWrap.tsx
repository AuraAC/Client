import styled from "styled-components";

export const TabWrap = styled.div`
  display: flex;
  justify-content: stretch;
  margin-bottom: 24px;
  
  a {
    display: block;
    flex: 1 1 auto;
    border-bottom: 2px solid transparent;
    color: #00B0E4;
    line-height: 36px;
    padding: 0 16px;  
    text-align: center;  
    text-decoration: none;
  
    &[aria-current] {
      border-bottom: 2px solid #00B0E4;
    }
  }
`;
