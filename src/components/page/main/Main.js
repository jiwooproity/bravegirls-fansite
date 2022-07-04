import React from "react";

import Section from "./Section";
import CardSection from "./CardSection";
import MusicSection from "./MusicSection";
// import NewSection from "./QueenSection";
// import TopBanner from "./TopBanner";
import Banner from "./Banner";
import LogoSection from "./LogoSection";

const Main = () => {
  return (
    <>
      {/* <TopBanner /> */}
      <Banner />

      {/* ------------------------- 첫번째 섹션 ------------------------- */}
      <LogoSection />
      {/* ------------------------- 첫번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {<MusicSection />}
      {/* ------------------------- 세번째 섹션 ------------------------- */}

      <Section />

      {/* ------------------------- 두번째 섹션 ------------------------- */}
      <CardSection />
      {/* ------------------------- 두번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {/* {<NewSection />} */}
      {/* ------------------------- 세번째 섹션 ------------------------- */}
    </>
  );
};

export default Main;
