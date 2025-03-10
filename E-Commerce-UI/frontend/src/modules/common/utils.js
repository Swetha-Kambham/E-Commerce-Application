export const localDateStringToDateObject = (localDateString) => {
  const date = Date.parse(localDateString);

  if (!date) return null;

  const d = new Date(date);

  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear()
  };
};
