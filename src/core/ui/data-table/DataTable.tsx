import React, {useState} from 'react';
import styled from 'styled-components';
import {TableContainer} from '@material-ui/core';
import {DataTableColumnDefinition, DataTableRowData, DataTableSorting} from './interfaces';
import {DataTableHead} from './DataTableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {DataTableRow} from './DataTableRow';
import SimpleBar from 'simplebar-react';

const Component = styled(TableContainer)`
  display: flex;
  overflow: auto;
  
  .simplebar-track.simplebar-vertical {
     top: 24px;
  }
`;

const sortedData = (data: any[], sorting: DataTableSorting) => {
  if (!sorting || !sorting.by || sorting.order === false) {
    return data;
  }

  return data.sort((a: any, b: any) => {
    if (sorting && sorting.order === 'desc') {
      return b[sorting.by] > a[sorting.by] ? 1 : a[sorting.by] > b[sorting.by] ? -1 : 0;
    }
    else {
      return a[sorting.by] > b[sorting.by] ? 1 : b[sorting.by] > a[sorting.by] ? -1 : 0;
    }
  });
};

export interface DataTableProps {
  idColumn?: string;
  columns: DataTableColumnDefinition[];
  data: DataTableRowData[];
  size?: 'small' | 'medium';
  sorting?: DataTableSorting;
  onClick?: (row: any, columnId: string) => void;
  onAction?: (row: any, action: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
                                                      idColumn,
                                                      columns,
                                                      data,
                                                      size,
                                                      sorting,
                                                      onClick,
                                                      onAction
                                                    }) => {
  const [currentSorting, setCurrentSorting] = useState(sorting);

  const onSortingChange = (sortBy: string) => {
    let order: 'asc' | 'desc' | false;
    if (currentSorting && currentSorting.by === sortBy && currentSorting.order === 'asc') {
      order = 'desc';
    }
    else if (currentSorting && currentSorting.by === sortBy && currentSorting.order === 'desc') {
      order = false;
    }
    else {
      order = 'asc';
    }

    setCurrentSorting({
      by: sortBy,
      order: order
    });
  };

  const handleRowClick = (row: any, columnId: string) => {
    if (onClick) {
      onClick(row, columnId);
    }
  };

  const handleActionClick = (row: any, action: string) => {
    if (onAction) {
      onAction(row, action);
    }
  };

  return (
      <Component
        component={SimpleBar}
      >
        <Table
					stickyHeader
					size={size ? size : 'medium'}
				>
          <DataTableHead
              columns={columns}
              sorting={currentSorting}
              onSortingChange={onSortingChange}
          />
          <TableBody>
            {sortedData(data, currentSorting)
                .map((rowData, i) => (
                    <DataTableRow
                        key={idColumn ? rowData[idColumn].toString() : i}
                        columns={columns}
                        data={rowData}
                        rowClickable={!!onClick}
                        onRowClick={handleRowClick}
                        onActionClick={handleActionClick}
                    />
                ))}
          </TableBody>
        </Table>
      </Component>
  );
};
