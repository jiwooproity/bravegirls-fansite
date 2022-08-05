import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { memberService } from "service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import { Loading, Top } from "components";
import { useObserver } from "mobx-react";
import { utils } from "util/utils";
import MemberTab from "./MemberTab";

import useStore from "hooks/useStore";

const MemberContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;

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
  right: 0px;

  @media screen and (max-width: 768px) {
    width: 500px;
    right: 0px;
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

const NewMember = () => {
  const [loading, setLoading] = useState(false);
  const [timingLinera, setTimingLinera] = useState(false);
  const [linearData, setLinearData] = useState(null);
  const [memberData, setMemberData] = useState({});
  const { memberStore } = useStore();

  const memberID = [
    { id: 0, name: "MINYOUNG" },
    { id: 1, name: "YUJEONG" },
    { id: 2, name: "EUNJI" },
    { id: 3, name: "YUNA" },
  ];

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    utils.onScrollTop();
  }, []);

  const onLoad = useCallback(async () => {
    setLoading(false);
    let memberArr = [];
    const response = await memberService.allMemberList();

    response.forEach((res) => {
      memberArr.push({
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
        linear: res.member_linear,
      });
    });

    setMemberData(memberArr);
    setLinearData(memberArr[memberStore.member].linear);
    setTimingLinera(true);
    setLoading(true);

    // eslint-disable-next-line
  }, []);

  const onSelect = async (id) => {
    memberStore.selectMember(id);
    setTimingLinera(false);

    setTimeout(() => {
      setTimingLinera(true);
      setLinearData(memberData[id].linear);
    }, 200);
  };

  return useObserver(() => {
    const { member } = memberStore;

    return (
      <>
        <Top />
        <MemberContainer>
          <MemberIntroduceWrap>
            {loading ? (
              <>
                <MemberSign src={memberData[member].sign} />
                <MemberBackgroundWrap>
                  <MemberBackground src={memberData[member].backgroundImage} />
                  <MemberImage src={memberData[member].image} />
                </MemberBackgroundWrap>
                <MemberDesWrap>
                  <MemberDesBar src={memberData[member].backgroundImage} />
                  <MemberDesTitle>{memberData[member].engName}</MemberDesTitle>
                  <MemberDesSubTitle>
                    {memberData[member].enter} / {memberData[member].korName}
                  </MemberDesSubTitle>

                  <MemberDesIntroduction>
                    {memberData[member].introduction}
                  </MemberDesIntroduction>
                  <MemberSNSWrapper>
                    <a
                      href={memberData[member].youtube}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <MemberSNSIcon icon={faYoutubeSquare} />
                    </a>
                    <a
                      href={memberData[member].instagram}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <MemberSNSIcon icon={faInstagramSquare} />
                    </a>
                    <a
                      href={memberData[member].twitter}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <MemberSNSIcon icon={faTwitterSquare} />
                    </a>
                  </MemberSNSWrapper>
                </MemberDesWrap>
              </>
            ) : (
              <Loading />
            )}
          </MemberIntroduceWrap>
          <MemberTab
            data={memberData}
            list={memberID}
            selectValue={member}
            timing={timingLinera}
            linear={linearData}
            func={{ onSelect }}
          />
        </MemberContainer>
      </>
    );
  });
};

export default NewMember;
