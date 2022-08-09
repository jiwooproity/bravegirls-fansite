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
  CanvasDetailContainer,
  CanvasDetailInfo,
  CanvasDetailText,
  CanvasDetailWrapper,
  CommentBox,
  CommentInfo,
  CommentInput,
  CommentInsertButton,
  CommentList,
  CommentListWrapper,
  CommentNumber,
  CommentText,
  CommentTextField,
  CommentUserName,
  CommentUserWrapper,
  CommentWrapper,
  DetailImage,
  DetailImageContainer,
  DetailImageWrapper,
  CanvasTitle,
  CommentProfile,
  CommentNoneWrapper,
  CommentNoneText,
  CanvasInfoBox,
  CanvasInfoTitle,
  CanvasInfoDescription,
  CanvasInnerInfo,
  CommentDeletButton,
} from "./CanvasPage/canvasDetail";

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
// Album.jsx
export { Album, AlbumInfo, AlbumList, AlbumTrack };

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
// CanvasDetail.jsx
export { CanvasDetailContainer, CanvasDetailInfo, CanvasDetailText, CanvasDetailWrapper };
export { CommentBox, CommentInfo, CommentInput, CommentInsertButton };
export { CommentList, CommentListWrapper, CommentNumber, CommentText };
export { CommentTextField, CommentUserName, CommentUserWrapper, CanvasTitle };
export { CommentWrapper, DetailImage, DetailImageContainer, DetailImageWrapper };
export { CommentProfile, CommentNoneText, CommentNoneWrapper, CanvasInnerInfo };
export { CanvasInfoBox, CanvasInfoTitle, CanvasInfoDescription, CommentDeletButton };
// CanvasUpload.jsx
export { UploadButton, UploadContainer, UploadInnerWrapper };
export { UploadInput, UploadInputWrapper, UploadPreviewWrapper };
export { UploadTextField, UploadWrapper };
