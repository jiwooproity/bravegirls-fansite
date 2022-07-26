import React from "react";

import TopBanner from "./TopBanner";
import TextBackground from "./TextBackground";
import Introduction from "./Introduction";
import MemberList from "./MemberList";

const Main = () => {
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
