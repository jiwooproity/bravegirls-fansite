import request from "./request";
import { musicService } from "./service/musicService";
import { memberService } from "./service/memberService";
import { canvasService } from "./service/canvasService";
import { commentService } from "./service/commentService";
import { userService } from "./service/userService";
import { youtubeService } from "./service/youtubeService";

// HTTP 요청 함수
export { request };

// 각 페이지 별 요청 서비스
export {
  musicService,
  memberService,
  canvasService,
  commentService,
  userService,
  youtubeService,
};
