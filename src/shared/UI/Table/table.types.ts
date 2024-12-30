import { TSchedule } from '@store/paymentScheduleStore/paymentSchedule.types';

export interface Column {
  key: string;
  title: string;
}

export interface TableProps {
  columns: Column[];
  data: TSchedule[] | null;
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
}
