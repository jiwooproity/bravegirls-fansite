export const utils = {
  setComma: (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "???";
  },
};
