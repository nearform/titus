import * as React from 'react'

export interface TableProps {
  title?: string;
  rows?: Array<object>;
  columns?: Array<object>;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  onDelete?: (selected: object) => void;
}

declare class Table extends React.Component<TableProps> {}
export Table
