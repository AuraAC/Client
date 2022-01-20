import React, {FormEvent, useMemo} from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiIconButton from '@material-ui/core/IconButton';
import {FldSearch} from './Search';
import {
	Wrap, StyledButton, RowSB, RowLast,
	TableWrap, Table, TableHead, TableRow, TableCell,
	EditLine, DelLine, SpanHidden
} from "./Common";
import styled from "styled-components";
import Pagination from '@material-ui/lab/Pagination';

const PaginWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0 0;
`;

const IconButton = styled(MuiIconButton)`
	padding: 0;
	margin-right: 8px;
`;


const DownloadWrap = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.palette.primary.main};
  
  &.disabled {
  	opacity: 0.3;
  	pointer-events: none;
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

function getFiltered<T>(array: T[], filter: string) {
	if (!filter) return array;

	return array.filter(el => {
		for (let k in el) {
			if (k !== 'id' && String(el[k]).toUpperCase().indexOf(filter.toUpperCase()) !== -1) {
				return true;
			}
		}
		return false;
	});
}

export interface HeadCell {
	id: string;
	label: string;
	align?: 'left' | 'right';
	disablePadding?: boolean;
	type?: string;
	optValues?: any;
	style?: any;
	colorAD?: boolean;
}

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
	order: Order;
	orderBy: string;
	parentProps: any;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const {numSelected, onRequestSort, onSelectAllClick, order, orderBy, parentProps} = props;
	const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{parentProps.selectable ?
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < parentProps.rowCount}
							checked={numSelected === parentProps.rowCount}
							onChange={onSelectAllClick}
							inputProps={{'aria-label': 'select all desserts'}}
						/>
					</TableCell>
					: null}
				{parentProps.headCells.map((headCell: any) => (
					<TableCell
						key={headCell.id}
						align={headCell.align === 'right' ? 'right' : 'left'}
						padding={!headCell.disablePadding ? 'default' : 'none'}
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
				<TableCell/>
			</TableRow>
		</TableHead>
	);
}

interface GridProps {
	headCells: HeadCell[];
	items: any[];
	addLabel?: string;
	onAddItem?: () => void;
	onEditItem?: (item: any) => void;
	onDeleteItem?: (item: any) => void;
	onDeleteSelected?: (selected: any[]) => void;
	idField?: string;
	selectable?: boolean;
	noTopBar?: boolean;
	extSearch?: boolean;
	onSearchApply?: (filter: string) => void;
	extSearchValue?: string;
	actions?: any[];
	availableActions?: any[];
	page?: number;
	pageCnt?: number;
	onPageChange?: (event: any, value: number) => void;
	size?: 'small' | 'medium';
	className?: string;
}

export const Grid: React.FC<GridProps> = (props) => {

	const [search, setSearch] = React.useState<string>('');
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<string>(null);
	const [selected, setSelected] = React.useState<string[]>([]);
	const [extSearch, setExtSearch] = React.useState<string>(props.extSearchValue ? props.extSearchValue : '');

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		const isAsc = orderBy === property && order === 'asc';
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(isDesc ? null : property);
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = props.items.map(n => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (id: string) => selected.indexOf(id) !== -1;

	const findOptValue = (optValues: any[], val: string) => {
		let optEl = optValues.find(el => el.id === val);
		if (optEl && optEl.value) return optEl.value;
		return val;
	};

	const rowId = (row: any) => {
		return props.idField ? row[props.idField] : row.id;
	};

	const filteredItems = useMemo(() => {
		if (!props.items) return [];
		return stableSort(getFiltered(props.items, search), getSorting(order, orderBy))
	}, [props.items, search, order, orderBy]);

	const extSearchProcess = () => {
		props.onSearchApply(extSearch);
	};

	const extSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		extSearchProcess();
	};

	return (
		<Wrap>
			{props.noTopBar ? null :
				<RowSB>
					{props.extSearch
						?
						<form
							style={{display: 'flex'}}
							onSubmit={(e) => extSearchSubmit(e)}
						>
							<FldSearch
								value={extSearch}
								style={{height: '32px'}}
								onChange={(e) => setExtSearch(e.target.value)}
								onIconClick={extSearchProcess}
							/>
						</form>
						:
						<FldSearch
							value={search}
							style={{height: '32px'}}
							onChange={(e) => setSearch(e.target.value)}
						/>
					}
					{props.onAddItem ?
						<StyledButton
							variant="contained"
							color="primary"
							style={{
								marginLeft: '8px'
							}}
							onClick={() => props.onAddItem()}
						>
							{props.addLabel ? props.addLabel : '+ ADD NEW'}
						</StyledButton>
						: null}

				</RowSB>
			}

			<TableWrap
				width="auto"
				height="auto"
				customHeader={[TableHead]}
				scrollbarStyle={{
					background: {}, // How the container of the scrollbar should look like
					backgroundFocus: {}, // How the container should look like on mouse over
					foreground: {backgroundColor: '#aaaaaa'}, // How the scrollbar should look like
					foregroundFocus: {backgroundColor: '#999999'} // How it should look like on mouse over
				}}
			>
				<Table
					className={props.className}
					stickyHeader
					size={props.size ? props.size : 'medium'}
				>
					<EnhancedTableHead
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						parentProps={props}
						// rowCount={props.items.length}
						// headCells={props.headCells}
						// selectable={props.selectable}
					/>
					<TableBody>
						{
							// stableSort(getFiltered(props.items, search), getSorting(order, orderBy))
							filteredItems.map((row: any, i) => {
								const isItemSelected = isSelected(rowId(row));
								const labelId = `enhanced-table-checkbox-${i}`;

								let propAction: any[] = [];
								let itemAction: any[] = [];
								if (Array.isArray(props.actions)) {
									propAction = props.actions;
								}
								if (row._actions && props.availableActions && Array.isArray(row._actions) && Array.isArray(props.availableActions)) {
									const addIcon = props.availableActions.filter(el => row._actions.includes(el.id));
									if (addIcon.length > 0) itemAction = addIcon;
								}
								let rowActions: any[] = [...propAction, ...itemAction];

								return (
									<TableRow key={rowId(row)}>

										{props.selectable ?
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													inputProps={{'aria-labelledby': labelId}}
													onClick={event => handleClick(event, rowId(row))}
												/>
											</TableCell>
											: null}

										{props.headCells.map(headCell => (
											<TableCell
												key={headCell.id}
												align={headCell.align === 'right' ? 'right' : 'left'}
												padding={!headCell.disablePadding ? 'default' : 'none'}
												// style={{verticalAlign: 'top'}}
												style={headCell.style}
												className={headCell.colorAD ? row[headCell.id] === 'declined' ? 'decline-color' : 'accept-color' : null}
											>
												{
													headCell.optValues
														? findOptValue(headCell.optValues, row[headCell.id])
														: row[headCell.id]
												}
											</TableCell>
										))}

										<TableCell style={{
											// display: 'flex',
											// height: '100%'
										}}
										>
											<div
												style={{
													display: 'flex',
													height: '100%'
												}}
											>
												{
													rowActions.map((action: any, i) => {
															if (action.type === 'icon') {
																return <IconButton key={i}
																									 onClick={() => action.onAction(row)}>
																	{action.icon}
																</IconButton>
															} else if (action.id === 'edit') {
																return <IconButton key={i}
																									 onClick={() => action.onAction(row)}>
																	<EditLine/>
																</IconButton>
															} else if (action.id === 'del') {
																return <IconButton key={i}
																									 onClick={() => {
																										 action.onAction(row);
																										 setSelected(selected.filter(el => el !== rowId(row)));
																									 }}
																>
																	<DelLine/>
																</IconButton>
															} else if (action.id === 'download') {
																return <IconButton key={i}>
																	<DownloadWrap
																		// href={'\\files\\' + row._fileName}
																		href={row._fileName || row.url}
																		target="_blank"
																		download
																		className={!row._fileName && !row.url ? 'disabled' : null}
																	>
																		<CloudDownloadIcon/>
																	</DownloadWrap>
																</IconButton>
															} else {
																return null;
															}
														}
													)
												}
											</div>
										</TableCell>
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
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

			{props.selectable ?
				<RowLast>
					<StyledButton
						variant="contained"
						color="primary"
						disabled={selected.length === 0}
						onClick={() => {
							props.onDeleteSelected(selected);
							setSelected([]);
						}}
					>
						DELETE SELECTED
					</StyledButton>
				</RowLast>
				: null}

		</Wrap>
	)
};
