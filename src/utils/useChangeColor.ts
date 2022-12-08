export default function changeBarColor(startNumb: number, finishNumb: number) {
  if (startNumb / finishNumb < 0.5) {
    return "#E82C2C";
  } else if (startNumb / finishNumb >= 0.5 && startNumb / finishNumb < 0.85) {
    return "#b6ca41";
  } else if (startNumb / finishNumb >= 0.85) {
    return "#87CF23";
  } else {
    return "#C9C9C9";
  }
}
