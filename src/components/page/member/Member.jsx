import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";

import _ from "lodash";

import { configService } from "service/configService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutubeSquare, faInstagramSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { Loading } from "components";
import useStore from "hooks/useStore";
import { useObserver } from "mobx-react";

const MemberContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

const MemberIntroduceWrap = styled.div`
  width: 990px;
  height: 500px;
  margin: 0px 0px 0px 0px;

  display: flex;

  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 0px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
  }
`;

const MemberBackgroundWrap = styled.div`
  width: 450px;

  border-radius: 5px;

  position: relative;
  box-shadow: rgb(38 57 77) 0px 20px 30px -10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 450px;
    margin: 30px 0px 0px 0px;
    padding: 0px 30px 0px 30px;
  }
`;

const MemberBackground = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  border-radius: 5px;

  object-fit: cover;
`;

const MemberImage = styled.img`
  width: 600px;

  position: absolute;
  bottom: 0;
  left: -100px;

  @media screen and (max-width: 768px) {
    width: 500px;
    left: -100px;
  }
`;

const MemberDesWrap = styled.div`
  width: 510px;
  height: 100%;

  padding: 0px 0px 0px 50px;

  position: relative;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 30px 0px 0px 0px;
  }
`;

const MemberDesBar = styled.img`
  width: 120px;
  height: 2px;

  display: block;

  border-radius: 1px;

  object-fit: cover;
`;

const MemberDesTitle = styled.h1`
  font-size: 40px;
  line-height: 40px;

  margin: 15px 0px 0px 0px;

  color: ${(props) => props.theme.titleTextColor};
`;

const MemberDesSubTitle = styled.span`
  font-size: 12px;
  line-height: 12px;

  margin: 5px 0px 0px 0px;

  color: ${(props) => props.theme.subTitleTexatColor};
`;

const MemberDesIntroduction = styled.p`
  font-size: 13px;
  line-height: 20px;

  white-space: pre-wrap;

  margin: 15px 0px 0px 0px;

  color: ${(props) => props.theme.desTextColor};
`;

const MemberSNSWrapper = styled.div`
  width: 100%;
  margin: 15px 0px 0px 0px;

  display: flex;
`;

const MemberSNSIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  margin: 0px 2px 0px 0px;

  color: ${(props) => props.theme.titleTextColor};
`;

const MemberSign = styled.img`
  width: 1000px;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  margin: 15px 0px 0px 0px;

  display: block;

  opacity: 0.03;

  filter: ${(props) => `brightness(${props.theme.signFilter})`};

  transition: filter 0.5s ease;

  @media screen and (max-width: 768px) {
  }
`;

const TabContainer = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px 15px;
  }

  z-index: 1;
`;

const TabWrapper = styled.div`
  width: 100%;

  margin: 30px 0px 0px 0px;

  display: flex;

  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;

    margin: 30px 0px 30px 0px;
  }
`;

const MemberTab = styled.span`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  padding: 5px 8px;
  color: ${(props) => props.theme.titleTextColor};

  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;

  &:nth-child(1) {
    border-right: 1px solid ${(props) => props.theme.titleTextColor};
  }

  &:nth-child(2) {
    border-right: 1px solid ${(props) => props.theme.titleTextColor};
  }

  &:nth-child(3) {
    border-right: 1px solid ${(props) => props.theme.titleTextColor};
  }

  &:nth-child(4) {
  }

  text-align: center;

  ${({ active }) =>
    active &&
    css`
      background-color: ${(props) => props.theme.backgroundOpacityColor};
      color: ${(props) => props.theme.diffTitleTextColor};
    `}

  transition: background-color 0.5s ease;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const MediaNavbar = styled.div`
  width: 100%;
  height: 85px;

  display: block;
`;

const NewMember = () => {
  const [memberData, setMemberData] = useState({});

  const { memberStore } = useStore();

  const memberID = [
    { id: 1, name: "MINYOUNG" },
    { id: 2, name: "YUJEONG" },
    { id: 3, name: "EUNJI" },
    { id: 4, name: "YUNA" },
  ];

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, [memberStore.member]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onLoad = useCallback(async () => {
    const res = await configService.getMemberList({ member_idx: memberStore.member });

    setMemberData({
      backgroundImage: res.member_background,
      image: res.member_image,
      profile: res.member_profile,
      birthDay: res.member_birthday,
      engName: res.member_eng_name,
      korName: res.member_kor_name,
      enter: res.member_enter,
      introduction: res.member_introduction.split("<br/>").join("\r\n\n"),
      youtube: res.member_youtube,
      instagram: res.member_instagram,
      twitter: res.member_twitter,
      sign: res.member_sign,
    });
  }, [memberStore.member]);

  const onSelect = (id) => {
    memberStore.selectMember(id);
  };

  return useObserver(() => {
    const { member } = memberStore;

    return (
      <>
        <MediaNavbar />
        <MemberContainer>
          <MemberIntroduceWrap>
            <MemberSign src={memberData.sign} />
            {!_.isEmpty(memberData) ? (
              <>
                <MemberBackgroundWrap>
                  <MemberBackground src={memberData.backgroundImage} />
                  <MemberImage src={memberData.image} />
                </MemberBackgroundWrap>
                <MemberDesWrap>
                  <MemberDesBar src={memberData.backgroundImage} />
                  <MemberDesTitle>{memberData.engName}</MemberDesTitle>
                  <MemberDesSubTitle>
                    {memberData.enter} / {memberData.korName}
                  </MemberDesSubTitle>

                  <MemberDesIntroduction>{memberData.introduction}</MemberDesIntroduction>
                  <MemberSNSWrapper>
                    <a href={memberData.youtube} target={"_blank"} rel="noreferrer">
                      <MemberSNSIcon icon={faYoutubeSquare} />
                    </a>
                    <a href={memberData.instagram} target={"_blank"} rel="noreferrer">
                      <MemberSNSIcon icon={faInstagramSquare} />
                    </a>
                    <a href={memberData.twitter} target={"_blank"} rel="noreferrer">
                      <MemberSNSIcon icon={faTwitterSquare} />
                    </a>
                  </MemberSNSWrapper>
                </MemberDesWrap>
              </>
            ) : (
              <Loading />
            )}
          </MemberIntroduceWrap>
          <TabContainer>
            <TabWrapper>
              {_.map(memberID, (tab, index) => (
                <MemberTab active={member === tab.id} key={index} onClick={() => onSelect(tab.id)}>
                  {tab.name}
                </MemberTab>
              ))}
            </TabWrapper>
          </TabContainer>
        </MemberContainer>
      </>
    );
  });
};

export default NewMember;
