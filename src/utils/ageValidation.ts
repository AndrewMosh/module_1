export const isOlderThan18 = (dateString: string): boolean => {
  let formattedDate = dateString;
  if (dateString.includes('-')) {
    const dateParts = dateString.split('-');
    formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  }
  const dateParts = formattedDate.split('.');
  const date = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
  if (isNaN(date.getTime())) {
    console.error('Некорректная дата:', formattedDate);
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  return age >= 18;
};
