import { API } from "constant";
import { request } from "services";

export const commentService = {
  commentList: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.COMMENT_LIST,
      params,
    }),

  commentInsert: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.INSERT_COMMENT,
      data,
    }),

  commentDelete: ({ data }) =>
    request({
      method: API.HTTP_METHOD.DELETE,
      url: API.URL.DELETE_COMMENT,
      data,
    }),
};
