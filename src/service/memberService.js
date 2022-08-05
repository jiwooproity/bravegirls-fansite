import { API } from "constant";
import { request } from "service";

export const memberService = {
  memberList: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.MEMBER_LIST,
      params,
    }),

  allMemberList: () =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.ALL_MEMBER_LIST,
    }),
};
