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
} from "./CanvasPage/canvas";

import { CustomSketch, PaletteStatus, SelectBox, SelectOption, ToolBox, ToolIcon, ToolSizeText, ToolWrap } from "./CanvasPage/canvasTool";

import { BoardContainer, BoardWrapper, ArtWrapper, ArtImage, ArtContainer, ArtTitle, ArtImageWrapper } from "./CanvasPage/canvasBoard";

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
export { CanvasContainer, CanvasPickerBox, CanvasUploadWrap, CanvasUploadInput };
export { CanvasUploadText, CanvasWrapper, EraserModeIcon, EraserModeIconWrapper };
export { MainCanvas };

export { BoardContainer, BoardWrapper, ArtWrapper, ArtImage };
export { ArtContainer, ArtImageWrapper, ArtTitle };

export { CustomSketch, PaletteStatus, SelectBox, SelectOption };
export { ToolBox, ToolIcon, ToolSizeText, ToolWrap };
