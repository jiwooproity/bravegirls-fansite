import { observable } from "mobx";

const memberStore = observable({
  member: 1,

  selectMember(data) {
    this.member = data;
  },
});

export { memberStore };
