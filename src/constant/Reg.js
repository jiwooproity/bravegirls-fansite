const Regualr = {
  // eslint-disable-next-line
  emailReg: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  // eslint-disable-next-line
  nickname: /^[a-zA-Z-가-힣]{4,15}$/,
};

const Reg = {
  email: (text) => {
    return Regualr.emailReg.test(text);
  },

  nickname: (text) => {
    return Regualr.nickname.test(text);
  },
};

export { Reg };
