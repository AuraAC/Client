import styled from "styled-components";
import {ButtonBase} from "@material-ui/core";

export const SideBarPanel = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;  
  // background: ${props => props.theme.palette.background.paper};
  // background-color: #F8FAFF;
  // box-shadow: ${props => props.theme.shadows[8]};
  // z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
        
  margin: 18px 0;
  // border-right: 1px solid #eee;  
`;

export const MenuList = styled.ul`  
  list-style: none;
  // margin: 20px 0 0;
  margin: 0;  
  padding: 0;
`;

export const MenuItem = styled.li`
  margin: 0;  
`;

export const MenuItemButton = styled(ButtonBase)`
  flex-direction: row;
  width: 100%;
  
  &:hover {
  	opacity: 0.87;
  }
  
  & a {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;    
    color: ${props => props.theme.palette.text.primary};
    padding: 0 16px;
    transition: color 0.2s ease;
    
    & svg {
      transition: fill 0.2s ease
    }
    
    &[aria-current] {
      color: ${props => props.theme.palette.primary.main};
      
      .MuiTypography-root {
        color: ${props => props.theme.palette.primary.main};
      }
      
      svg {
        fill: ${props => props.theme.palette.primary.main};
      }
`;

export const MenuItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 38px;
    
  & svg {
    fill: ${props => props.theme.palette.text.primary};
  }
`;

