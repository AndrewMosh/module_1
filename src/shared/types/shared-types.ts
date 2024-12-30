export interface AsyncState<T = void> {
  loading: boolean;
  error: string | null | boolean;
  success?: boolean;
  data?: T;
}
