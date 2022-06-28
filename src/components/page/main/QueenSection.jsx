import { Loading, SectionComponent } from "components";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Slider from "react-slick";
import { photocardService } from "service/photocardService";

import styled from "styled-components";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 15px;
  color: rgba(194, 177, 155);
`;

const CustomSlider = styled(Slider)`
  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    padding-right: 50px;
  }

  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }

  .slick-prev {
    z-index: 5;
    height: 356px;
    border-radius: 15px 0px 0px 15px;

    &:hover {
      background-color: rgba(220, 220, 220, 0.6);
    }

    transition: background-color 0.5s ease;

    &::before {
      display: none;
    }
  }

  .slick-next {
    z-index: 5;
    height: 356px;
    border-radius: 0px 15px 15px 0px;

    &:hover {
      background-color: rgba(220, 220, 220, 0.6);
    }

    transition: background-color 0.5s ease;

    &::before {
      display: none;
    }
  }
`;

const Side = styled.div`
  width: 990px;
  margin: 0px 0px 15px 0px;
`;

const SubTitle = styled.h1`
  font-size: 13px;
  line-height: 13px;
  padding-top: 5px;
  color: rgb(40, 40, 40);
`;

const IFrameContaner = styled.div`
  width: 990px;
`;

const IFrameWrapper = styled.div`
  position: relative;
`;

const IFrameVideo = styled.iframe`
  width: 990px;
  margin-bottom: 15px;
  border-radius: 15px;
  overflow: hidden;
  height: 557px;
  border: none;
  display: block;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const QueenSection = () => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const settings = {
    dots: true,
    centerMode: true,
    centerPadding: "-50px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);
    const response = await photocardService.getVideoList();

    setVideoList(response);
    setLoading(true);
  };

  return (
    <Section>
      <SectionComponent>
        {loading ? (
          <CustomSlider {...settings}>
            {_.map(videoList, (video, index) => (
              <IFrameContaner key={index}>
                <IFrameWrapper>
                  <Side>
                    <Title>{video.video_title}</Title>
                    <SubTitle>{video.video_subtitle}</SubTitle>
                  </Side>
                  <IFrameVideo
                    src={`${video.video_url}?enablejsapi=&origin=http://bglovely.com`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                </IFrameWrapper>
              </IFrameContaner>
            ))}
          </CustomSlider>
        ) : (
          <Loading />
        )}
      </SectionComponent>
    </Section>
  );
};

export default QueenSection;
