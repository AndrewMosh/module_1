import './Error.scss';

export const Error = ({ message }: { message: string }) => {
  return <div className="error">{message}</div>;
};
