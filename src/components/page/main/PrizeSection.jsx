import React, { useState, useEffect } from "react";
import _ from "lodash";

import bubble from "static/img/bubble.png";

import { photocardService } from "service/photocardService";
import styled, { css, keyframes } from "styled-components";
import { Loading } from "components";

const Container = styled.div`
  width: 100%;
  padding: 50px 0px 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const bubbleAnimation = keyframes`
    0% {
      top: -10px;
    }

    100% {
      top: 0px;
    }
`;

const ContainerImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: -1;
  object-fit: cover;

  animation: ${bubbleAnimation} 4s linear alternate;
`;

const Wrapper = styled.div`
  width: 990px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 35px;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

const HistoryBar = styled.div`
  width: 2px;
  margin: 50px 0px 0px 0px;
  height: 700px;
  background-color: rgba(80, 80, 80, 0.1);
  position: relative;

  @media screen and (max-width: 768px) {
    margin: 35px 0px 0px 0px;
  }
`;

const HistoryCricle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
`;

const HistoryTitle = styled.span`
  font-size: 16px;
  white-space: pre;
  position: absolute;
  top: 65%;
  transform: translateY(-65%);
  ${({ align }) =>
    align
      ? css`
          left: 20px;

          &:hover {
            left: 30px;
          }
        `
      : css`
          right: 20px;

          &:hover {
            right: 30px;
          }
        `}

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

  color: rgba(0, 0, 0, 1);

  transition: left 0.5s ease, right 0.5s ease;
`;

const HistoryDate = styled.span`
  font-size: 12px;
  white-space: pre;
  position: absolute;
  top: 65%;
  transform: translateY(-65%);
  ${({ align }) =>
    align
      ? css`
          right: 20px;
        `
      : css`
          left: 20px;
        `}

  color: rgba(0, 0 ,0, 0.8);
  transition: color 0.5s ease, background-color 0.5s ease;

  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

const TestSection = () => {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const response = await photocardService.getHistoryList();
    setHistoryList(response);
    setLoading(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>음악방송 역대 기록</Title>
        {loading ? (
          <HistoryBar>
            {_.map(historyList, (item) => (
              <HistoryCricle key={item.history_idx} top={item.history_top}>
                <HistoryTitle align={item.history_align}>{item.history_title}</HistoryTitle>
                <HistoryDate align={item.history_align}>{item.history_date}</HistoryDate>
              </HistoryCricle>
            ))}
          </HistoryBar>
        ) : (
          <Loading />
        )}
      </Wrapper>
      <ContainerImage src={bubble} />
    </Container>
  );
};

export default TestSection;
