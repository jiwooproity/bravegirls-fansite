// Global Style
import GlobalStyle from "./GlobalStyle";
// Theme
import { theme } from "./Theme";
// CSS
import { Album } from "./AlbumPage/album";
import { AlbumInfo } from "./AlbumPage/albumInfo";
import { AlbumList } from "./AlbumPage/albumList";
import { AlbumTrack } from "./AlbumPage/albumTrack";

import { Canvas } from "./CanvasPage/canvas";
import { CanvasTool } from "./CanvasPage/canvasTool";
import { CanvasDetail } from "./CanvasPage/canvasDetail";

import { Comment } from "./CommentPage/comment";
import { CommentList } from "./CommentPage/commentList";

import { FontIcon } from "./FontAwesome/FontIcon";

import {
  ArtContainer,
  ArtDescription,
  ArtDownloadBox,
  ArtDownloadButton,
  ArtImage,
  ArtImageBackdrop,
  ArtImageContainer,
  ArtImageWrapper,
  ArtStatusBox,
  BoardContainer,
  BoardWrapper,
} from "./CanvasPage/canvasBoard";

import { CanvasUpload } from "./CanvasPage/canvasUpload";

export { GlobalStyle, theme };
export { FontIcon };

// 앨범 컴포넌트 CSS 스타일
export { Album, AlbumInfo, AlbumList, AlbumTrack };
export { Comment, CommentList };
export { CanvasDetail };

// 캔버스 컴포넌트 CSS 스타일
// Canvas.jsx
export { Canvas };
// CanvasTool.jsx
export { CanvasTool };
// CanvasBoard.jsx
export { ArtContainer, ArtDescription, ArtDownloadBox, ArtDownloadButton };
export { ArtImage, ArtImageBackdrop, ArtImageContainer };
export { ArtImageWrapper, ArtStatusBox, BoardContainer, BoardWrapper };
// CanvasUpload.jsx
export { CanvasUpload };
