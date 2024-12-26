import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { subscriptionSchema } from '../subscription.types';

const useFormValidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ email: string }>({
    resolver: zodResolver(subscriptionSchema),
  });

  return { register, handleSubmit, errors, reset };
};

export default useFormValidation;
