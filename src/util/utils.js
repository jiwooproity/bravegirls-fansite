import _ from "lodash";

export const utils = {
  setComma: (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "???";
  },

  setStatus: (menu) => {
    let status = {};

    const depth = (data) => {
      _.forEach(data, (list) => {
        // Navbar Status 생성
        if (!list.isLeaf && list.children.length) {
          status = {
            ...status,
            [list.name]: false,
          };
        }

        // children이 존재 할 경우, 함수 재실행
        if (list.children && list.children.length) {
          depth(list.children);
        }
      });
    };

    depth(menu);

    return status;
  },
};
