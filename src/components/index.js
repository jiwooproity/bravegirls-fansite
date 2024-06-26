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
import Toast from "./common/toast/Toast";
import Birthday from "./common/birthday/Birthday";
import AnimateTitle from "./page/main/AnimateTitle";

import Member from "./page/member/Member";
import MemberTab from "./page/member/MemberTab";

import Video from "./page/video/Video";
import VideoDetail from "./page/video/VideoDetail";

import Canvas from "./page/canvas/Canvas";
import CanvasBoard from "./page/canvas/CanvasBoard";
import CanvasDetail from "./page/canvas/CanvasDetail";
import CanvasTool from "./page/canvas/CanvasTool";
import CanvasUpload from "./page/canvas/CanvasUpload";

import Comment from "./page/canvas/comment/Comment";
import CommentList from "./page/canvas/comment/CommentList";

import Login from "./page/login/Login";
import LoginForm from "./common/LoginForm";
import Success from "./page/login/Success";
import Register from "./page/login/Register";

// 재사용 컴포넌트
export { Loading, Footer, Navbar, SnsNavbar };
export { Top, Toast, Birthday, AnimateTitle };

// 메인 페이지
export { Main, Introduction, MemberList, TextBackground, TopBanner };

// 멤버 페이지
export { Member, MemberTab };

// 앨범 페이지
export { Album, AlbumInfo, AlbumList, AlbumTrack };

// 비디오 페이지
export { Video, VideoDetail };

// 캔버스 그림
export { Canvas, CanvasBoard, CanvasDetail, CanvasTool, CanvasUpload };
export { Comment, CommentList };

// 로그인 페이지
export { Login, LoginForm, Success, Register };
