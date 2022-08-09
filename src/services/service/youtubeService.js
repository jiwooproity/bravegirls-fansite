import { API } from "constant";
import { request } from "services";

export const youtubeService = {
  playList: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.YOUTUBE.PLAYLIST,
      params,
    }),

  videoDetail: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.YOUTUBE.PLAYITEM,
      params,
    }),
};
