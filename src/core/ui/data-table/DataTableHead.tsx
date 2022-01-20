import React from 'react';
import {DataTableColumnDefinition, DataTableSorting} from './interfaces';
import TableRow from '@material-ui/core/TableRow';
import {TableHead, TableSortLabel} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';


export interface DataTableHeaderProps {
  columns: DataTableColumnDefinition[],
  sorting?: DataTableSorting,
  onSortingChange?: (sortBy: string) => void
}

export const DataTableHead: React.FC<DataTableHeaderProps> = ({
                                                                columns,
                                                                sorting,
                                                                onSortingChange
                                                              }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={(column.sorting !== false && sorting && sorting.by === column.id && sorting.order) ? sorting.order : false}
            style={{width: column.width ? `${column.width}px` : null}}
          >

            {(column.sorting === false || column.type === 'action')
              ? <span>
                  {column.label}
                </span>
              : <TableSortLabel
                  active={sorting && sorting.by === column.id && sorting.order !== false}
                  direction={(sorting && sorting.by) === column.id && sorting.order && sorting.order === 'desc' ? 'desc' : 'asc'}
                  onClick={() => onSortingChange(column.id)}
                >
                  {column.label}
                </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
