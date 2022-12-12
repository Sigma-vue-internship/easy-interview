export function formattingDate(date: number) {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formattingHours(pureDate: number) {
  const date = new Date(pureDate);
  const minutes = date.getMinutes();

  return `${date.getHours()}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function calculateTime(startDate: number, endDate: number) {
  return Math.floor((endDate - startDate) / 60000);
}

export default { formattingDate, formattingHours, calculateTime };
