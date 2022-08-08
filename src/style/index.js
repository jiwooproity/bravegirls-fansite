import GlobalStyle from "./GlobalStyle";
import { theme } from "./Theme";

import { DarkThemeMode, DarkThemeImage, DarkThemeBackdrop, AlbumContainer } from "./AlbumPage/album";

import {
  AlbumWrapper,
  AlbumLeftSide,
  AlbumImageWrap,
  AlbumImage,
  LpImageWrap,
  LpImage,
  AlbumRightSide,
  AlbumDescription,
  AlbumTitleText,
  DescriptionText,
  AlbumEntertainment,
} from "./AlbumPage/albumInfo";

import {
  AlbumImage as AlbumThumbnail,
  AlbumListShadowWrapper,
  AlbumListWrapper,
  AlbumSelectBar,
  AlbumListShadow,
  AlbumColumnWrapper,
  AlbumColumn,
  AlbumLists,
  AlbumListCover,
  AlbumNumber,
  AlbumInfoColum,
  AlbumInfoDummy,
  AlbumInfo,
  AlbumListIcon,
} from "./AlbumPage/albumList";

import {
  TrackArtist,
  TrackContainer,
  TrackItemsWrap,
  TrackList,
  TrackListBox,
  TrackListTitle,
  TrackListWrapper,
  TrackNumber,
  TrackSubTitle,
  TrackTitle,
  TrackTitleWrap,
} from "./AlbumPage/albumTrack";

import {
  CanvasContainer,
  CanvasPickerBox,
  CanvasUploadWrap,
  CanvasUploadInput,
  CanvasUploadText,
  CanvasWrapper,
  EraserModeIcon,
  EraserModeIconWrapper,
  MainCanvas,
  PreviewCanvas,
} from "./CanvasPage/canvas";

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
export { DarkThemeMode, DarkThemeImage, DarkThemeBackdrop, AlbumContainer };
// AlbumInfo.jsx
export { AlbumWrapper, AlbumLeftSide, AlbumImageWrap, AlbumImage };
export { LpImageWrap, LpImage, AlbumRightSide, AlbumDescription };
export { AlbumTitleText, DescriptionText, AlbumEntertainment };
// AlbumList.jsx
export { AlbumThumbnail, AlbumListShadowWrapper, AlbumListWrapper };
export { AlbumSelectBar, AlbumListShadow, AlbumColumnWrapper, AlbumColumn };
export { AlbumLists, AlbumListCover, AlbumNumber, AlbumInfoColum };
export { AlbumInfoDummy, AlbumInfo, AlbumListIcon };
// TrackList.jsx
export { TrackArtist, TrackContainer, TrackItemsWrap, TrackList };
export { TrackListBox, TrackListTitle, TrackListWrapper, TrackNumber };
export { TrackSubTitle, TrackTitle, TrackTitleWrap };

// 캔버스 컴포넌트 CSS 스타일
// Canvas.jsx
export { CanvasContainer, CanvasPickerBox, CanvasUploadWrap, CanvasUploadInput };
export { CanvasUploadText, CanvasWrapper, EraserModeIcon, EraserModeIconWrapper };
export { MainCanvas, PreviewCanvas };
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
