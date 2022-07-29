import { observable } from "mobx";

const themeStore = observable({
  theme: false,

  changeTheme() {
    this.theme = !this.theme;
  },
});

export { themeStore };
