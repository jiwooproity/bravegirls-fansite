import { observable } from "mobx";

const memberStore = observable({
  member: 0,

  selectMember(data) {
    this.member = data;
  },
});

export { memberStore };
