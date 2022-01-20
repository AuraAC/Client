import styled from "styled-components";
import ReactTableContainer from "react-table-container";
import MuiTable from "@material-ui/core/Table";
import MuiTableHead from "@material-ui/core/TableHead";
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from "@material-ui/core/TableCell";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import {Button} from "@material-ui/core";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  // height: 100%;
  // !ToDo!
  // height: auto;
  // min-height: 100%;
  
  flex: 1 1 auto;
  
`;

export const StyledButton = styled(Button)`
`;

export const Row = styled.div`  
  display: flex;
  margin-bottom: 12px;
  align-items: center;
`;

export const RowSB = styled(Row as any)`  
  justify-content: space-between;
  align-items: center;
`;

export const RowLast = styled(Row as any)`  
  margin-bottom: 0px;
`;

export const TableWrap = styled(ReactTableContainer)`    
  border-radius: 5px;   
  border: 1px solid #eeeeee;   
  // margin-bottom: 12px; 
  flex: 1 1 0;
  min-height: 120px;
  height: 100%;
`;

export const Table = styled(MuiTable)`
  width: 100%;
  // min-width: 650px;
  
  .MuiTableBody-root{
    .MuiTableCell-root {
      border-bottom: none;
      // padding: 4px 0 4px 16px;
      padding: 8px 16px 8px 16px;        
    }
    .MuiTableCell-paddingCheckbox {      
      padding: 0 0 0 4px;
    }        
  }  
    
  &.compact-grid {
		.MuiTableBody-root{
			.MuiTableCell-root {
				padding: 8px 6px 8px 6px;      
			}
			
			.MuiTableCell-root:first-child {
				padding-left: 16px;      
			}
		}  
  }
        
  .text-opacity td {
    opacity: 0.6;
  }
`;

export const TableHead = styled(MuiTableHead)`
  background: ${props => props.theme.palette.background.paper};
  .MuiTableCell-stickyHeader {
    background-color: #ffffff;
  }
`;

export const TableRow = styled(MuiTableRow)`
  background-color: #ffffff;
`;

export const TableCell = styled(MuiTableCell)`
	&.accept-color {
		color: ${props => props.theme.custom.palette.success};
	}
	
	&.decline-color {
		color: ${props => props.theme.custom.palette.alert};
	}
`;

export const EditLine = styled(EditIcon)``;

export const DelLine = styled(DeleteIcon)``;

export const SpanHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  top: 20px;
  width: 1px;
`;
