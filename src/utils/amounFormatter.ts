export const kFormatter = (num: number) => {
  if (num > 9999999) {
    return (num / 1000000).toString() + "M";
  } else if (num > 1000) {
    return (num / 1000).toString() + "K";
  } else {
    return num.toString();
  }
};
