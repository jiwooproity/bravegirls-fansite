import React, { useEffect } from "react";
import styled from "styled-components";

// import TopBanner from "./TopBanner";
// import TextBackground from "./TextBackground";
import Introduction from "./Introduction";
import MemberList from "./MemberList";

import { utils } from "util/utils";

const DummyContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Main = () => {
  useEffect(() => {
    utils.onScrollTop();
  }, []);

  return (
    <>
      {/* <TopBanner /> */}
      <DummyContainer />
      <Introduction />
      <MemberList />
      {/* <TextBackground /> */}
    </>
  );
};

export default Main;
