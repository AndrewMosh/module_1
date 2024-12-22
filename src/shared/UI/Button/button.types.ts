export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void | undefined | Promise<void>;
  className?: string;
  disabled?: boolean;
};
