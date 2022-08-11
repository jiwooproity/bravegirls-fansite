import React from "react";
import _ from "lodash";

import styled, { keyframes } from "styled-components";

import loadingIcon from "static/img/loading/loading.png";
import { useStore } from "hooks";
import { useObserver } from "mobx-react";
import { useLocation } from "react-router-dom";

const LoadingBarWrapper = styled.div`
  width: 100%;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${({ loading }) => (loading ? "0" : "1")};
  backdrop-filter: ${({ loading }) => (loading ? "blur(0)" : "blur(10px)")};
  pointer-events: ${({ loading }) => (loading ? "none" : "all")};
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 9999;
  transition: ${({ loading }) => loading && "opacity 0.2s ease"};
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
  const { loadingStore } = useStore();
  const location = useLocation();
  const { pathname } = location;

  return useObserver(() => {
    const { loading } = loadingStore;

    return (
      <LoadingBarWrapper loading={loading || _.isEqual(pathname, "/")}>
        <Bar>
          <Icon src={loadingIcon} />
        </Bar>
      </LoadingBarWrapper>
    );
  });
};

export default LoadingBar;
