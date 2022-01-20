import React from 'react';
import {DataTableColumnDefinition, DataTableRowData} from './interfaces';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import styled from 'styled-components';
import {ButtonBase} from '@material-ui/core';
import {FormattedNumber} from '../../components/formatting/FormattedNumber';
import {FormattedPercent} from '../../components/formatting/FormattedPercent';
import {FormattedDateTime} from '../../components/formatting/FormattedDateTime';
import {FormattedDate} from '../../components/formatting/FormattedDate';
import {FormattedTime} from '../../components/formatting/FormattedTime';

const CellButton = styled(ButtonBase)`
    color: ${props => props.theme.palette.primary.main};
    border: 1px solid ${props => props.theme.palette.primary.main};
    border-radius: 9px;
    padding: 0 4px;
    height: 18px;
    line-height: 16px;
    overflow: hidden;
`;

const StyledTableRow = styled(TableRow)<{ clickable?: number }>`

  ${props => props.clickable
  ? `
      cursor: pointer;    
      :hover {
        background-color: #F2F5FB;
      }
    `
  : null}
`;

export interface DataTableRowProps {
  columns: DataTableColumnDefinition[],
  data: DataTableRowData,
  rowClickable?: boolean,
  onRowClick?: (row: any, columnId: string) => void;
  onActionClick?: (row: any, action: string) => void;
}

export const DataTableRow: React.FC<DataTableRowProps> = ({
                                                            columns,
                                                            data,
                                                            rowClickable,
                                                            onRowClick,
                                                            onActionClick
                                                          }) => {

  const handleRowClick = (columnId: string) => {
    if (onRowClick) {
      onRowClick(data, columnId);
    }
  };

  const handleActionClick = (action: string) => {
    if (onActionClick) {
      onActionClick(data, action);
    }
  };

  const getColor = (value: any) => {
    if (value === 0) return null;
    return value >= 0 ? '#4CB1A0' : '#EF5350';
  };

  return (
    <StyledTableRow clickable={rowClickable ? 1 : 0}>
      {columns.map(column => {
        let cellContent;
        let rounding = {...column.rounding};
        if (rounding.marketIdAccessor) {
          rounding.market = data[rounding.marketIdAccessor] as string;
        }
        if (rounding.symbolIdAccessor) {
          rounding.symbol = data[rounding.symbolIdAccessor] as string;
        }

        switch (column.type) {
          case 'action':
            cellContent = <CellButton onClick={() => handleActionClick(column.id)}>{column.label}</CellButton>;
            break;
          case 'number':
            cellContent = (column.cellStyle === 'sign'
                ? <span style={{color: getColor(data[column.id])}}>
                    <FormattedNumber value={data[column.id]} rounding={rounding} />
                  </span>
                : <FormattedNumber value={data[column.id]} rounding={rounding} />
            );
            break;
          case 'percent':
            // @ts-ignore
            cellContent = (column.cellStyle === 'sign'
                ? <span style={{color: getColor(data[column.id])}}>
                    <FormattedPercent value={data[column.id]}/> %
                  </span>
                : <>
                    <FormattedPercent value={data[column.id]}/> %
                  </>
            );
            break;
          case 'date':
            cellContent = <FormattedDate value={data[column.id]}/>;
            break;
          case 'time':
            cellContent = <FormattedTime value={data[column.id]}/>;
            break;
          case 'datetime':
            cellContent = <FormattedDateTime value={data[column.id]}/>;
            break;
          default:
            cellContent = data[column.id];
        }

        return (
          <TableCell
            key={column.id}
            align={column.align}
            onClick={() => handleRowClick(column.id)}
          >
            {cellContent}
          </TableCell>
        );
      })}
    </StyledTableRow>
  );
};
