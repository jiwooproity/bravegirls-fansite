import { API } from "constant";
import { request } from "service";

export const canvasService = {
  canvasList: () =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.CANVAS_LIST,
    }),

  cavasDetail: ({ params }) =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.CANVAS_DETAIL,
      params,
    }),

  canvasUpload: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.IMAGE_UPLOAD,
      data,
    }),

  canvasInsert: ({ data }) =>
    request({
      method: API.HTTP_METHOD.POST,
      url: API.URL.INSERT_CANVAS,
      data,
    }),
};
