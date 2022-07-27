// import { Url } from "./Url";

import { faYoutube, faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

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
    path: "bravegirls",
  },
  {
    name: "MEMBER",
    type: "text",
    root: "/member",
    path: "/member",
  },
  {
    name: "ALBUM",
    type: "text",
    root: "/album",
    path: "/album",
  },
  {
    name: "VIDEO",
    type: "text",
    root: "/video",
    path: "/video",
  },
  {
    name: "QUEENDOM",
    type: "text",
    root: "/queendom",
    path: "/queendom",
  },
  // {
  //   name: "PHOTOCARD",
  //   type: "text",
  //   // root: Url.PHOTOCARD,
  //   root: "/photocard",
  //   path: "/photocard",
  // },
  {
    name: "LOGIN",
    type: "text",
    root: "/login",
    path: "/login",
  },
];
