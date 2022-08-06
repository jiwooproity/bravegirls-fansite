import { API } from "constant";
import { request } from "service";

export const commentService = {
  commentList: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.COMMENT_LIST,
      params,
    }),

  commentInsert: ({ params }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.INSERT_COMMENT,
      params,
    }),
};
