import { observable } from "mobx";

const loginStore = observable({
  login: !!sessionStorage.getItem("login.token"),

  setLogin() {
    this.login = true;
  },

  setLogout() {
    this.login = false;
  },
});

export { loginStore };
