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
import { CustomSketch, PaletteStatus, SelectBox, SelectOption, ToolBox, ToolIcon, ToolSizeText, ToolWrap } from "./CanvasPage/canvasTool";

import { Comment } from "./CommentPage/comment";
import { CommentList } from "./CommentPage/commentList";

import { CanvasDetail } from "./CanvasPage/canvasDetail";

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

import {
  UploadButton,
  UploadContainer,
  UploadInnerWrapper,
  UploadInput,
  UploadInputWrapper,
  UploadPreviewWrapper,
  UploadTextField,
  UploadWrapper,
} from "./CanvasPage/canvasUpload";

export { GlobalStyle, theme };

// 앨범 컴포넌트 CSS 스타일
export { Album, AlbumInfo, AlbumList, AlbumTrack };
export { Comment, CommentList };
export { CanvasDetail };

// 캔버스 컴포넌트 CSS 스타일
// Canvas.jsx
export { Canvas };
// CanvasTool.jsx
export { CustomSketch, PaletteStatus, SelectBox, SelectOption };
export { ToolBox, ToolIcon, ToolSizeText, ToolWrap };
// CanvasBoard.jsx
export { ArtContainer, ArtDescription, ArtDownloadBox, ArtDownloadButton };
export { ArtImage, ArtImageBackdrop, ArtImageContainer };
export { ArtImageWrapper, ArtStatusBox, BoardContainer, BoardWrapper };
// CanvasUpload.jsx
export { UploadButton, UploadContainer, UploadInnerWrapper };
export { UploadInput, UploadInputWrapper, UploadPreviewWrapper };
export { UploadTextField, UploadWrapper };
