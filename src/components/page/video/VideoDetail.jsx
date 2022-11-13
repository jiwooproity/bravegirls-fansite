import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { faPencil, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { utils } from "util/utils";
import { youtubeService } from "services";
import { useStore } from "hooks";

const NavbarBox = styled.div`
  width: 100%;
  height: 85px;
`;

const VideoContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  @media screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;

const VideoWrapper = styled.div`
  width: 990px;
`;

const VideoGridWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VideoThumbnaillWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    iframe {
      z-index: 2;
    }
  }
`;

const VideoThumbnailImageFrame = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: block;
  -webkit-overflow-scrolling: touch;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
`;

const VideoCustomIframe = styled.iframe`
  height: 0;
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;
  min-width: 100%;
  width: 0;
  display: block;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 2;

  border: none;
  border-radius: 10px;
`;

const VideoDesWrap = styled.div`
  width: 100%;

  padding: 15px 0px;

  display: flex;
  flex-direction: column;
`;

const VideoTitleWrap = styled.div`
  padding: 0px 0px 15px 0px;
`;

const VideoTitle = styled.h1`
  font-size: 22px;
  line-height: 30px;
  padding: 5px 0px 0px 0px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 4vw;
    line-height: 5.5vw;
  }
`;

const VideoCountNumber = styled.h1`
  font-size: 20px;
  line-height: 20px;
  padding: 10px 0px 0px 0px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const VideoDescription = styled.span`
  font-size: 12px;
  line-height: 20px;
  white-space: pre-line;

  color: ${(props) => props.theme.desTextColor};
`;

const VideoCountIconWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  padding: 8px 0px 0px 0px;
`;

const VideoCountIcon = styled(FontAwesomeIcon)`
  font-size: 15px;
  line-height: 15px;

  margin-right: 5px;

  color: ${(props) => props.theme.subTitleTexatColor};

  @media screen and (max-width: 768px) {
    font-size: 2.8vw;
    line-height: 2.8vw;
  }
`;

const VideoThumbCount = styled.span`
  font-size: 18px;
  line-height: 18px;

  margin-right: 10px;

  color: ${(props) => props.theme.subTitleTexatColor};

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const VideoDetail = () => {
  const { loadingStore } = useStore();
  const [detailData, setDetailData] = useState({});

  const params = useParams();
  const { videoId } = params;

  useEffect(() => {
    onLoad();
    utils.onScrollTop();
    loadingStore.setLoading(false);
    // eslint-disable-next-line
  }, []);

  const onLoad = async () => {
    const detailParams = { part: "snippet", id: videoId };
    const countParams = { part: "statistics", id: videoId };

    const apiParams = [detailParams, countParams];
    const playList = apiParams.map((params) => youtubeService.videoDetail({ params }));

    await Promise.all(playList).then((play) => {
      const setYoutubeData = ({ detail, count }) => {
        const snippet = detail.snippet;
        const statistics = count.statistics;

        const { maxres, standard, high } = snippet.thumbnails;
        const thumbnail = maxres ? maxres : standard ? standard : high;

        return {
          videoId,
          title: snippet.title,
          thumbnail,
          description: snippet.description,
          viewCount: `${utils.setComma(statistics.viewCount)}회`,
          likeCount: utils.setComma(statistics.likeCount),
          commentCount: utils.setComma(statistics.commentCount),
        };
      };

      const [detail, count] = play;
      const youtubeDataObj = setYoutubeData({ detail: detail.items[0], count: count.items[0] });
      setDetailData(youtubeDataObj);
      loadingStore.setLoading(true);
    });
  };

  return (
    <>
      <NavbarBox />
      <VideoContainer>
        <VideoWrapper>
          <VideoGridWrap>
            <Fade bottom>
              <VideoThumbnaillWrap>
                <VideoThumbnailImageFrame>
                  <VideoCustomIframe
                    id="gangnamStyleIframe"
                    type="text/html"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="1"
                  />
                </VideoThumbnailImageFrame>
                <VideoDesWrap>
                  <VideoTitleWrap>
                    <VideoTitle>{detailData.title}</VideoTitle>
                    <VideoCountIconWrapper>
                      <VideoCountIcon icon={faThumbsUp} />
                      <VideoThumbCount>{detailData.likeCount}</VideoThumbCount>
                      <VideoCountIcon icon={faPencil} />
                      <VideoThumbCount>{detailData.commentCount}</VideoThumbCount>
                    </VideoCountIconWrapper>
                    <VideoCountNumber>{detailData.viewCount}</VideoCountNumber>
                  </VideoTitleWrap>

                  <VideoDescription>{detailData.description}</VideoDescription>
                </VideoDesWrap>
              </VideoThumbnaillWrap>
            </Fade>
          </VideoGridWrap>
        </VideoWrapper>
      </VideoContainer>
    </>
  );
};

export default VideoDetail;
