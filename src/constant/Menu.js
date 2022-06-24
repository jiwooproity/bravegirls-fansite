import { Url } from "./Url";

export const Menu = [
  {
    name: "Home",
    root: Url.ROOT,
    onClick: () => console.log("Home"),
  },
  {
    name: "PhotoCard",
    root: Url.PHOTOCARD,
    onClick: () => console.log("PhotoCard"),
  },
];
