export const formatDate = (date: Date) => {
  const locale = navigator.language;

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
