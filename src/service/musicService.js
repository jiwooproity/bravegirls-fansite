import { API } from "constant";
import { request } from "service";

export const musicService = {
  musicList: () =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.MUSIC_LIST,
    }),

  trackList: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.TRACK_LIST,
      params,
    }),
};
