export interface ApplicationState {
  status: string | null;
  loading: boolean;
  error: string | null;
  fetchApplication: (id: number | string) => Promise<void>;
}
