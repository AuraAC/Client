import {Moment} from 'moment';
import {Rounding} from '../../../utils/Rounding';

export interface DataTableRounding extends Rounding {
  marketIdAccessor?: string, // if market is defined in one of the data items' attributes
  symbolIdAccessor?: string, // if symbol is defined in one of the data items' attributes
}

export interface DataTableSorting {
  by: string,
  order?: 'asc' | 'desc' | false
}

export interface DataTableColumnDefinition {
  id: string;
  label: string;
  type: 'number' | 'string' | 'date' | 'time' | 'datetime' | 'action' | 'percent';
  align: 'left' | 'right' | 'center';
  rounding?: DataTableRounding;
  hide?: boolean;
  sorting?: boolean; // false if sorting should be disabled for the column
  showTrend?: boolean; // true if positive values should be in green with arrow up, negative in red with arrow down
  cellStyle?: 'sign',
  width?: number
}

export interface DataTableRowData {
  [attribute: string]: string | number | Moment
}