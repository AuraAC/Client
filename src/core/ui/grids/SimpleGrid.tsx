import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  Wrap, TableWrap, Table, TableHead, TableRow, TableCell, SpanHidden
} from "./Common";
import styled from "styled-components";
import Pagination from '@material-ui/lab/Pagination';

const PaginWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0 0;
`;

export const StyledTable = styled(Table as any)` 
  .MuiTableBody-root{
    .MuiTableCell-root {      
      padding: 8px 16px 8px 16px;       
    }
  }
`;

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = 'asc' | 'desc';

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

export interface HeadCell {
  id: string;
	align?: 'left' | 'right';
  disablePadding?: boolean;
  label: string;
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align === 'right' ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={orderBy === headCell.id ? KeyboardArrowDownIcon : UnfoldMoreIcon}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <SpanHidden>
                  {order === 'desc' ? 'desc' : 'asc'}
                </SpanHidden>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface GridProps {
  headCells: HeadCell[];
  items: any[];
  width?: string;
  height?: string;
	idField?: string;
	page?: number;
	pageCnt?: number;
	onPageChange?: (event: any, value: number) => void;
	size?: 'small' | 'medium';
	className?: string;
}

export const SimpleGrid: React.FC<GridProps> = (props) => {

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>(null);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(isDesc ? null : property);
  };

  return (
    <Wrap>
      <TableWrap
        width={props.width ? props.width : "auto"}
        height={props.height ? props.height : "auto"}
        customHeader={[TableHead]}
        scrollbarStyle={{
          background: {}, // How the container of the scrollbar should look like
          backgroundFocus: {}, // How the container should look like on mouse over
          foreground: {backgroundColor: '#5689B9'}, // How the scrollbar should look like
          foregroundFocus: {backgroundColor: '#5689B9'} // How it should look like on mouse over
        }}
      >
        <StyledTable
					stickyHeader
					className={props.className}
					size={props.size ? props.size : 'medium'}
				>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={props.headCells}
          />
          <TableBody>
            {
              stableSort(props.items, getSorting(order, orderBy))
                .map((row: any, i) => {
                  return (
                    <TableRow key={i}>
                      {props.headCells.map(headCell => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.align === 'right' ? 'right' : 'left'}
                          padding={headCell.disablePadding ? 'none' : 'default'}
                        >
                          {row[headCell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
          </TableBody>
        </StyledTable>
      </TableWrap>

			{props.pageCnt > 1 ?
				<PaginWrap>
					<Pagination
						// size="small"
						count={props.pageCnt}
						page={props.page}
						onChange={props.onPageChange}
					/>
				</PaginWrap>
				: null}

    </Wrap>
  )
};
