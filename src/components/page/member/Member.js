import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled from "styled-components";

import select_01 from "static/img/member/select_01.png";
import select_02 from "static/img/member/select_02.png";
import select_03 from "static/img/member/select_03.png";
import select_04 from "static/img/member/select_04.png";

import { photocardService } from "service/photocardService";
import { Loading } from "components";

const MemberContainer = styled.div`
  width: 100%;
`;

const MemberNavbar = styled.div`
  width: 100%;
  height: 84px;
  background-color: rgba(0, 0, 0, 1);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const WindowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 620px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WindowBackground = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  background-color: black;
  z-index: -2;
`;

const WindowBlur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(50px);
  z-index: -1;
`;

const WindowWrapper = styled.div`
  width: 990px;
  padding: 80px 0px 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const WindowWrapperSkew = styled.div`
  width: 390px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 180px;
  background-color: white;
  transform: skew(-20deg);
  z-index: -1;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const WindowSectionWrapper = styled.div`
  width: 520px;
  height: 520px;
  padding: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
`;

const MemberTitleWrapper = styled.div`
  display: flex;
`;

const MemberTitle = styled.h1`
  font-size: 50px;
  line-height: 50px;
`;

const MemberSubTitle = styled.span`
  font-size: 12px;
  line-height: 30px;
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.5);
`;

const WindowImageContainer = styled.div`
  width: 600px;
  height: 520px;
  position: relative;
`;

const WindowImageWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 0px;

  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    gap: 10px;
  }

  transition: gap 0.5s ease;
`;

const WindowBlock = styled.div`
  width: 250px;
  height: 250px;
  margin: 5px;
  position: relative;
`;

const WindowMemberImage = styled.img`
  width: 600px;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const WindowImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 5px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
`;

const BirthDayText = styled.h2`
  font-size: 15px;
  line-height: 15px;
  margin: 10px 0px 0px 0px;
`;

const InfoText = styled.span`
  font-size: 13px;
  line-height: 13px;
  margin: 10px 0px 0px 0px;
  color: rgba(0, 0, 0, 0.5);
`;

const SelectMemberContainer = styled.div`
  width: 100%;
  margin: 50px 0px 50px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectMemberWrapper = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
`;

const SelectMemberImageRelative = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  /* box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px; */
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const SelectMemberImage = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;
  display: block;
`;

const SelectMemberBackdrop = styled.div`
  width: 240px;
  height: 240px;
  background-color: rgba(30, 30, 30, 0.5);
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    background-color: rgba(30, 30, 30, 0);
  }

  transition: background-color 0.5s ease;
  cursor: pointer;
`;

const Member = () => {
  const [member, setMember] = useState(3);
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(false);

  const memberArr = [
    {
      image: select_01,
      image_id: 1,
    },
    {
      image: select_02,
      image_id: 2,
    },
    {
      image: select_03,
      image_id: 3,
    },
    {
      image: select_04,
      image_id: 4,
    },
  ];

  useEffect(() => {
    loadData(member);
    // eslint-disable-next-line
  }, []);

  const onSelect = (id) => {
    setMember(id);
    loadData(id);
  };

  const loadData = async (id) => {
    setLoading(false);
    let convertData = {};
    let memberBackground = ["", "", "", ""];

    const response = await photocardService.getMemberList({ member_idx: id });
    convertData = response;

    memberBackground.forEach((item, index) => {
      if (index === 3) {
        memberBackground[index] = { window: response.member_background, member: response.member_image };
      } else {
        memberBackground[index] = { window: response.member_background };
      }
    });

    convertData = {
      ...convertData,
      member_background: memberBackground,
    };

    setMemberData(convertData);
    setLoading(true);
  };

  const { member_background } = memberData;
  const { member_eng_name, member_kor_name } = memberData;
  const { member_birthday, member_mbti, member_physical, member_enter } = memberData;

  return (
    <MemberContainer>
      <MemberNavbar />
      <WindowContainer>
        <WindowBlur />
        {loading ? (
          <>
            <WindowBackground src={member_background[0].window} />
            <WindowWrapper>
              <WindowWrapperSkew />
              <WindowImageContainer>
                <WindowImageWrapper>
                  {_.map(member_background, (data, index) => (
                    <WindowBlock key={index}>
                      <WindowImage src={data.window} />
                      {data.member ? <WindowMemberImage src={data.member} /> : null}
                    </WindowBlock>
                  ))}
                </WindowImageWrapper>
              </WindowImageContainer>
              <WindowSectionWrapper>
                <MemberTitleWrapper>
                  <MemberTitle>{member_eng_name}</MemberTitle>
                  <MemberSubTitle>{member_kor_name}</MemberSubTitle>
                </MemberTitleWrapper>
                <BirthDayText>BIRTHDAY _ {member_birthday}</BirthDayText>
                <InfoText>MBTI: {member_mbti}</InfoText>
                <InfoText>신체: {member_physical}</InfoText>
                <InfoText>소속사: {member_enter}</InfoText>
              </WindowSectionWrapper>
            </WindowWrapper>
          </>
        ) : (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        )}
      </WindowContainer>
      <SelectMemberContainer>
        <SelectMemberWrapper>
          {_.map(memberArr, (member, index) => (
            <SelectMemberImageRelative key={index} onClick={() => onSelect(member.image_id)}>
              <SelectMemberImage src={member.image} />
              <SelectMemberBackdrop />
            </SelectMemberImageRelative>
          ))}
        </SelectMemberWrapper>
      </SelectMemberContainer>
    </MemberContainer>
  );
};

export default Member;
