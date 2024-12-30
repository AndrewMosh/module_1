import './Status.scss';

export const Status = ({ message }: { message: string }) => {
  return <div className="status">{message}</div>;
};
