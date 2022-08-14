import { API } from "constant";
import { request } from "services";

export const userService = {
  userList: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.USER_LIST,
      data,
    }),

  insertUser: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.INSERT_USER,
      data,
    }),

  getCerti: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.CERTI.CERTI_EMAIL,
      params,
    }),

  checkDuplicate: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.CERTI.CHECK_ACCOUNT,
      data,
    }),
};
