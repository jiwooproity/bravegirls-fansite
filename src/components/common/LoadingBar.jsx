import React from "react";
import styled from "styled-components";

import loadingIcon from "static/img/loading/loading.png";

const LoadingBarWrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
`;

const Bar = styled.div`
  width: 20px;
`;

const Icon = styled.img`
  width: 100%;

  object-fit: cover;
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
