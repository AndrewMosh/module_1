type FormatNumberOptions = {
  value: number;
  locale?: string;
};

export const formatNumber = ({
  value,
  locale = 'ru-RU',
}: FormatNumberOptions): string => {
  return new Intl.NumberFormat(locale).format(value);
};
