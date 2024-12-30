import './Error.scss';

export const Error = ({ message }: { message: string | boolean }) => {
  return <div className="error">{message}</div>;
};
