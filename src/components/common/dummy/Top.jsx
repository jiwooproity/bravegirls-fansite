import React from "react";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  height: 85px;

  position: relative;
  z-index: 1;
`;

const DummyTop = () => {
  return <Top />;
};

export default DummyTop;
