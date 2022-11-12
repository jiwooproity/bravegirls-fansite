import { observable } from "mobx";

const locationStore = observable({
  path: "/",

  setPath() {
    this.path = window.location.pathname;
  },
});

export { locationStore };
