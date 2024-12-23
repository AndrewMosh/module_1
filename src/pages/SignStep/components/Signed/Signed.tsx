import { Success } from '@shared/SuccessComponent/Success';
export const Signed = () => {
  return (
    <Success
      title="Documents have been successfully signed and sent for approval"
      text="Within 10 minutes you will be sent a PIN code to your email for confirmation"
    />
  );
};
