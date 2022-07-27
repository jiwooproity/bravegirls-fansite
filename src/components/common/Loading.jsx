import React from "react";
import styled, { keyframes } from "styled-components";

import loadingIcon from "static/img/loading/loading.png";

const LoadingBarWrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotateLoading = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const Bar = styled.div`
  width: 90px;

  overflow: visible;
  animation: ${rotateLoading} 1s linear infinite;
`;

const Icon = styled.img`
  width: 100%;
`;

const LoadingBar = () => {
  return (
    <LoadingBarWrapper>
      <Bar>
        <Icon src={loadingIcon} />
      </Bar>
    </LoadingBarWrapper>
  );
};

export default LoadingBar;
