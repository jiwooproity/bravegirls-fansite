import _ from "lodash";

export const utils = {
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  onComment: ({ value }) => {
    return value.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  },

  onScrollTop: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  getString: (data) => {
    return data.toString();
  },

  setComma: (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "???";
  },

  onLogout: () => {
    sessionStorage.removeItem("login.nickname");
    sessionStorage.removeItem("login.profile");
    sessionStorage.removeItem("login.level");
    sessionStorage.removeItem("login.token");
  },

  setStatus: (menu) => {
    let status = {};

    const depth = (data) => {
      _.forEach(data, (list) => {
        // Navbar Status 생성
        if (!list.isLeaf && list.children.length) {
          status = {
            ...status,
            [list.value]: false,
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

  setList: (list) => {
    let status = {};

    _.forEach(list, (item) => {
      item = false;

      status = {
        ...status,
        [item]: false,
      };
    });

    return status;
  },
};
