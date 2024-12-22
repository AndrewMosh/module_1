export interface Column {
  key: string;
  title: string;
}


export interface TableProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onSort?: (columnKey: string, direction: "asc" | "desc") => void;
}