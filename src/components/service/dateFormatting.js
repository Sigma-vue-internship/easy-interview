export default function formattingDate(date) {
  const formatting = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[formatting.getMonth()];
  return `${formatting.getDate()} ${month} ${formatting.getFullYear()}`;
}