import { faYoutube, faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHouseChimney, faClipboardUser, faMusic, faVideo, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";

export const snsMenu = [
  {
    name: "페이스북",
    icon: faFacebook,
    type: "icon",
    root: "https://ko-kr.facebook.com/bravegirls.official/",
  },
  {
    name: "유튜브",
    icon: faYoutube,
    type: "icon",
    root: "https://www.youtube.com/channel/UCx_kYu6Wp1yxZP_KtrW52EQ",
  },
  {
    name: "인스타그램",
    icon: faInstagram,
    type: "icon",
    root: "https://www.instagram.com/bravegirls.official/",
  },
  {
    name: "트위터",
    icon: faTwitter,
    type: "icon",
    root: "https://twitter.com/BraveGirls",
  },
];

export const Menu = [
  {
    name: "HOME",
    type: "text",
    // root: Url.ROOT,
    root: "/",
    path: "/",
    children: [],
    icon: faHouseChimney,
    isLeaf: false,
  },
  {
    name: "MEMBER",
    type: "text",
    root: "/member",
    path: "/member",
    children: [],
    icon: faClipboardUser,
    isLeaf: false,
  },
  {
    name: "ALBUM",
    type: "text",
    root: "/album",
    path: "/album",
    children: [],
    icon: faMusic,
    isLeaf: false,
  },
  {
    name: "VIDEO",
    type: "text",
    root: "/video",
    path: "/video",
    children: [
      {
        name: "MUSIC",
        type: "text",
        root: "/video/music",
        path: "/video/music",
        parent: "VIDEO",
        icon: faArrowDownShortWide,
        isLeaf: true,
      },
      {
        name: "QUEENDOM",
        type: "text",
        root: "/video/queendom",
        path: "/video/queendom",
        parent: "VIDEO",
        icon: faArrowDownShortWide,
        isLeaf: true,
      },
      {
        name: "BG-CLIP",
        type: "text",
        root: "/video/bgclip",
        path: "/video/bgclip",
        parent: "VIDEO",
        icon: faArrowDownShortWide,
        isLeaf: true,
      },
    ],
    icon: faVideo,
    isLeaf: false,
  },
  // {
  //   name: "SIGN",
  //   type: "text",
  //   root: "/sign",
  //   path: "/sign",
  //   children: [],
  //   icon: faRightFromBracket,
  // },
  {
    name: "LOGIN",
    type: "text",
    root: "/login",
    path: "/login",
    children: [],
    icon: faRightFromBracket,
    isLeaf: false,
  },
];
