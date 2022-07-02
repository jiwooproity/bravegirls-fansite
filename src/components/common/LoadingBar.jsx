import React from "react";
import styled from "styled-components";

const LoadingBarWrapper = styled.div`
  width: 100%;
  height: 2px;

  position: relative;

  background-color: white;
`;

const Bar = styled.div`
  width: 20%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: red;
`;

const LoadingBar = () => {
  return (
    <LoadingBarWrapper>
      <Bar />
    </LoadingBarWrapper>
  );
};

export default LoadingBar;
