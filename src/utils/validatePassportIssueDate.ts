export const validatePassportIssueDate = (val: string) => {
  const dateParts = val.split('-');
  const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formattedDate)) {
    return false;
  }

  const [day, month, year] = formattedDate.split('.').map(Number);

  const inputDate = new Date(year, month - 1, day);

  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  return inputDate <= currentDate;
};
