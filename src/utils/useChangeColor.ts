export const defaultBarColor = "#555555";
const green = "#87CF23";
const yellow = "#b6ca41";
const red = "#E82C2C";

export function getBarColor(answerPoints: number, questionPoints: number) {
  const percents = answerPoints / questionPoints;
  if (percents < 0.5) {
    return red;
  } else if (percents >= 0.5 && percents < 0.85) {
    return yellow;
  } else if (percents >= 0.85) {
    return green;
  } else {
    return defaultBarColor;
  }
}

export default { getBarColor, defaultBarColor };
