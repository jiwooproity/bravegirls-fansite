import { observable } from "mobx";

const toastStore = observable({
  show: false,
  msg: "",

  showToast(msg) {
    this.show = true;
    this.msg = msg;
  },

  clsoeToast() {
    this.show = false;
    this.msg = "";
  },
});

export { toastStore };
