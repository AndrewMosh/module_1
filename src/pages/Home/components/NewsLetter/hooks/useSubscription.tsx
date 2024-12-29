import {useSubscriptionStore} from '@store';
import { useState } from 'react';

const useSubscription = () => {
  const { isSubscribed, subscribe } = useSubscriptionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (email: string) => {
    try {
      setIsSubmitting(true);
      await subscribe(email);
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubscribed, isSubmitting, handleSubscribe };
};

export default useSubscription;
