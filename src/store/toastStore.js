import { observable } from "mobx";

const Type = ["Success", "Error", "Info"];

const toastStore = observable({
  show: false,
  status: Type[0],
  msg: "",

  showToast({ status, msg }) {
    this.show = true;
    this.msg = msg;
    this.status = Type[status];
  },

  clsoeToast() {
    this.show = false;
  },
});

export { toastStore };
