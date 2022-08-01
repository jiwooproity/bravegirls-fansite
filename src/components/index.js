import Main from "./page/main/Main";
import Introduction from "./page/main/Introduction";
import MemberList from "./page/main/MemberList";
import TextBackground from "./page/main/TextBackground";
import TopBanner from "./page/main/TopBanner";

import Album from "./page/album/Album";
import AlbumInfo from "./page/album/AlbumInfo";
import AlbumList from "./page/album/AlbumList";
import AlbumTrack from "./page/album/AlbumTrack";

import Loading from "./common/Loading";
import Top from "./common/dummy/Top";
import Navbar from "./common/Navbar";
import SnsNavbar from "./common/SnsNavbar";
import Footer from "./common/Footer";

import Member from "./page/member/Member";
import MemberTab from "./page/member/MemberTab";

import Video from "./page/video/Video";
import VideoDetail from "./page/video/VideoDetail";

import Login from "./page/login/Login";

// 재사용 컴포넌트
export { Loading, Footer, Navbar, SnsNavbar, Top };

// 메인 페이지
export { Main, Introduction, MemberList, TextBackground, TopBanner };

// 멤버 페이지
export { Member, MemberTab };

// 앨범 페이지
export { Album, AlbumInfo, AlbumList, AlbumTrack };

// 비디오 페이지
export { Video, VideoDetail };

// 로그인 페이지
export { Login };
