import { TSchedule } from '@store/paymentScheduleStore/paymentSchedule.types';

export interface Column {
  key: keyof TSchedule; 
  title: string; 
}

export interface TableProps {
  columns: Column[] ; 
  data?: TSchedule[]; 
  onSort?: (columnKey: keyof TSchedule, direction: 'asc' | 'desc') => void; 
}
