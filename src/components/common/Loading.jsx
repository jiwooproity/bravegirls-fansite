import React from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.h1`
  font-size: 20px;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
