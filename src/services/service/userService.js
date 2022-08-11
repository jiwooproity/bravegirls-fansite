import { API } from "constant";
import { request } from "services";

export const userService = {
  userList: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.USER_LIST,
      data,
    }),
};
