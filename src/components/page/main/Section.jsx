import React from "react";
import _ from "lodash";

import styled from "styled-components";

import minyoung_icon from "static/img/minyoung_icon.png";
import yujeong_icon from "static/img/yujeong_icon.png";
import eunji_icon from "static/img/eunji_icon.png";
import yuna_icon from "static/img/yuna_icon.png";

const FirstSectionWrapper = styled.div`
  width: 100%;
  height: 300px;
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const MemberListWrapper = styled.div`
  width: 990px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberImageWrap = styled.div`
  width: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberImage = styled.img`
  width: 150px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.5s ease;
`;

const Section = () => {
  const memberArr = [minyoung_icon, yujeong_icon, eunji_icon, yuna_icon];

  return (
    <FirstSectionWrapper>
      <MemberListWrapper>
        {_.map(memberArr, (member, index) => (
          <MemberImageWrap key={index}>
            <MemberImage src={member} />
          </MemberImageWrap>
        ))}
      </MemberListWrapper>
    </FirstSectionWrapper>
  );
};

export default Section;
