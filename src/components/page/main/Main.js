import React from "react";

import HistoryBanner from "./HistoryBanner";
import LogoSection from "./LogoSection";
import Banner from "./MainBanner";
import PrizeSection from "./PrizeSection";
import TestSection from "./TestSection";

const Main = () => {
  return (
    <>
      {/* <TopBanner /> */}
      <Banner />

      {/* ------------------------- 첫번째 섹션 ------------------------- */}
      <LogoSection />
      {/* ------------------------- 첫번째 섹션 ------------------------- */}
      <HistoryBanner />

      <PrizeSection />

      <TestSection />
    </>
  );
};

export default Main;
