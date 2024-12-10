export type SubscriptionState = {
  isSubscribed: boolean;
  subscribe: (email: string) => Promise<void>;
};
