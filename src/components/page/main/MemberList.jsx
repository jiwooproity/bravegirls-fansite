import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";

import styled from "styled-components";
import _ from "lodash";

import { useStore } from "hooks";
import { memberService } from "services";

const ThreeSection = styled.div`
  width: 100%;
  padding: 0px 15px 100px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileContainer = styled.div`
  max-width: 990px;

  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 5px;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
  }
`;

const ProfileTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;
  font-weight: 700;

  padding: 0px 0px 30px 0px;

  display: block;

  color: ${(props) => props.theme.subTitleTexatColor};
`;

const ProfileWrap = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    div:nth-child(2) {
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      transform: scale(1.1);
      filter: grayscale(0%);
    }

    div {
      div {
        opacity: 0.8;
      }

      h2 {
        opacity: 0.8;
      }

      span {
        opacity: 0.8;
      }
    }
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  display: block;
  filter: grayscale(80%);

  transition: transform 0.5s ease, filter 0.5s ease;
`;

const ProfileDes = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0);

  transition: background-color 0.5s ease, backdrop-filter 0.5s ease;
`;

const ProfileName = styled.span`
  font-size: 12px;
  line-height: 12px;
  margin: 5px;
  color: white;

  opacity: 0;

  transition: opacity 0.5s ease;
`;

const ProfileEngName = styled.span`
  font-size: 25px;
  line-height: 25px;
  font-weight: 700;
  color: white;

  opacity: 0;

  transition: opacity 0.5s ease;
`;

const ProfileBirthDay = styled.span`
  font-size: 15px;
  line-height: 15px;
  color: white;

  opacity: 0;

  transition: opacity 0.5s ease;
`;

const ProfileBar = styled.div`
  width: 160px;
  height: 1px;
  margin: 10px 0px;
  background-color: white;
  position: relative;

  opacity: 0;

  transition: opacity 0.5s ease;
`;

const ProfileBarBall = styled.div`
  width: 5px;
  height: 5px;

  border-radius: 2.5px;

  position: absolute;
  top: -2px;
  left: 0px;

  background-color: white;

  animation: "moveX" 3s ease infinite;

  @keyframes moveX {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(160px);
    }
  }

  &::after {
    content: "";
    width: 100%;
    height: 100%;

    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    transition: opacity linear 0.4s;
    background: #fff;

    animation: "pulseMotion" 3s ease infinite;
  }

  @keyframes pulseMotion {
    0% {
      transform: translate(-50%, -50%) scale(1, 1);
      background-color: rgba(255, 255, 255, 0.4);
    }
    100% {
      transform: translate(-50%, -50%) scale(6.5, 6.5);
      background-color: rgba(255, 255, 255, 0);
    }
  }
`;

const NewThree = () => {
  const [memberData, setMemberData] = useState([]);
  const { memberStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const resArr = [];
    const response = await memberService.allMemberList();

    _.forEach(response, (res) => {
      let birthday = res.member_birthday;
      birthday = birthday.split("-").join(".");

      resArr.push({
        id: res.member_idx,
        korName: res.member_kor_name,
        engName: res.member_eng_name,
        profile: res.member_profile,
        birthday,
      });
    });

    setMemberData(resArr);
  };

  const onSelect = (id) => {
    memberStore.selectMember(Number(id));
    navigate("/member");
  };

  return (
    <ThreeSection>
      <ProfileTitle>MEMBER</ProfileTitle>
      <ProfileContainer>
        {memberData
          ? _.map(memberData, (member, index) => (
              <Fade bottom key={index}>
                <ProfileWrap>
                  <ProfileImage src={member.profile} />
                  <ProfileDes>
                    <ProfileEngName onClick={() => onSelect(index)}>
                      {member.engName}
                    </ProfileEngName>
                    <ProfileName>{member.korName}</ProfileName>
                    <ProfileBar>
                      <ProfileBarBall />
                    </ProfileBar>
                    <ProfileBirthDay>{member.birthday}</ProfileBirthDay>
                  </ProfileDes>
                </ProfileWrap>
              </Fade>
            ))
          : null}
      </ProfileContainer>
    </ThreeSection>
  );
};

export default NewThree;
