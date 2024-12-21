// validators.js
export const validatePassportIssueDate = (val: string) => {
  const dateParts = val.split('-');
  const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

  // Проверка на формат даты
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formattedDate)) {
    return false;
  }

  // Разбираем строку на части для проверки даты
  const [day, month, year] = formattedDate.split('.').map(Number);

  // Создаем объект Date с введенной датой
  const inputDate = new Date(year, month - 1, day);

  // Получаем текущую дату
  const currentDate = new Date();

  // Убираем время у текущей даты для сравнения только даты
  currentDate.setHours(0, 0, 0, 0);

  // Проверяем, чтобы введенная дата не была больше текущей
  return inputDate <= currentDate;
};
