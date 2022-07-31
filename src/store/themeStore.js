import { observable } from "mobx";

const themeStore = observable({
  theme: false,

  setLocalData(data) {
    this.theme = data;
  },

  changeTheme() {
    this.theme = !this.theme;
    localStorage.setItem("theme", !this.theme);
  },
});

export { themeStore };
