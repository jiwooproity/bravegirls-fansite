import { API } from "constant";
import { request } from "service";

export const canvasService = {
  canvasList: () =>
    request({
      method: API.HTTP_METHOD.GET,
      url: API.URL.CANVAS_LIST,
    }),
};
