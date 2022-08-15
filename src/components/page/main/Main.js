import React, { useEffect } from "react";

import TopBanner from "./TopBanner";
import TextBackground from "./TextBackground";
import Introduction from "./Introduction";
import MemberList from "./MemberList";

import { utils } from "util/utils";

const Main = () => {
  useEffect(() => {
    utils.onScrollTop();
  }, []);

  return (
    <>
      <TopBanner />
      <Introduction />
      <MemberList />
      <TextBackground />
    </>
  );
};

export default Main;
