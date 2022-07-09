import React from "react";

// import CardSection from "./CardSection";
// import MusicSection from "./MusicSection";
import LogoSection from "./LogoSection";
import Banner from "./MainBanner";

const Main = () => {
  return (
    <>
      {/* <TopBanner /> */}
      <Banner />

      {/* ------------------------- 첫번째 섹션 ------------------------- */}
      <LogoSection />
      {/* ------------------------- 첫번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {/* {<MusicSection />} */}
      {/* ------------------------- 세번째 섹션 ------------------------- */}

      {/* ------------------------- 두번째 섹션 ------------------------- */}
      {/* <CardSection /> */}
      {/* ------------------------- 두번째 섹션 ------------------------- */}

      {/* ------------------------- 세번째 섹션 ------------------------- */}
      {/* {<NewSection />} */}
      {/* ------------------------- 세번째 섹션 ------------------------- */}
    </>
  );
};

export default Main;
