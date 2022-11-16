export default function formattingDate(date) {
  const formatting = new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatting;
}
