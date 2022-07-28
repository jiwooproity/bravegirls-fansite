import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";

import { useEffect } from "react";
import { youtubeService } from "service/configService";
import { Loading } from "components";
import { Fade } from "react-reveal";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPencil } from "@fortawesome/free-solid-svg-icons";

import { utils } from "util/utils";

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
`;

const VideoWrapper = styled.div`
  width: 990px;
`;

const VideoGridWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
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
  padding-bottom: 56.2%;
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

// const VideoThumbnaillImage = styled.img`
//   width: 100%;
//   display: block;

//   transition: opacity 0.5s ease;

//   opacity: 0;
// `;

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

  @media screen and (max-width: 768px) {
    font-size: 4vw;
    line-height: 5.5vw;
  }
`;

const VideoCountNumber = styled.h1`
  font-size: 20px;
  line-height: 20px;
  padding: 10px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const VideoDescription = styled.span`
  font-size: 12px;
  line-height: 20px;
  white-space: pre-line;

  color: rgba(54, 54, 54, 0.5);
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

  color: rgba(54, 54, 54);

  @media screen and (max-width: 768px) {
    font-size: 2.8vw;
    line-height: 2.8vw;
  }
`;

const VideoThumbCount = styled.span`
  font-size: 18px;
  line-height: 18px;

  margin-right: 10px;

  color: rgba(54, 54, 54);

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const pathname = location.pathname.replace("/", "");

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, [pathname]);

  const onLoad = async () => {
    setLoading(false);
    const videoArr = [];
    const playList = await youtubeService.getPlayList(pathname, { part: "snippet", maxResults: 20 });

    for (const playData of playList.items) {
      const snippet = playData.snippet;
      const detailData = await youtubeService.getVideo({ part: "statistics", id: snippet.resourceId.videoId });

      for (const detail of detailData.items) {
        const statistics = detail.statistics;

        videoArr.push({
          videoId: snippet.resourceId.videoId,
          // thumbnail: snippet.thumbnails.maxres.url,
          title: snippet.title,
          description: snippet.description,
          viewCount: `${utils.setComma(statistics.viewCount)}회`,
          likeCount: utils.setComma(statistics.likeCount),
          commentCount: utils.setComma(statistics.commentCount),
        });
      }
    }

    setVideoData(videoArr);
    setLoading(true);
  };

  return (
    <>
      <NavbarBox />
      <VideoContainer>
        <VideoWrapper>
          <VideoGridWrap>
            {loading ? (
              _.map(videoData, (video, index) => (
                <Fade bottom key={index}>
                  <VideoThumbnaillWrap>
                    <VideoThumbnailImageFrame>
                      {/* <VideoThumbnaillImage src={video.thumbnail} /> */}
                      <VideoCustomIframe
                        id="gangnamStyleIframe"
                        type="text/html"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.videoId}?rel=0&enablejsapi=1&origin=http://bglovely.com`}
                        frameborder="0"
                        scrolling="no"
                        allowfullscreen="1"
                      />
                    </VideoThumbnailImageFrame>
                    <VideoDesWrap>
                      <VideoTitleWrap>
                        <VideoTitle>{video.title}</VideoTitle>
                        <VideoCountIconWrapper>
                          <VideoCountIcon icon={faThumbsUp} />
                          <VideoThumbCount>{video.likeCount}</VideoThumbCount>
                          <VideoCountIcon icon={faPencil} />
                          <VideoThumbCount>{video.commentCount}</VideoThumbCount>
                        </VideoCountIconWrapper>
                        <VideoCountNumber>{video.viewCount}</VideoCountNumber>
                      </VideoTitleWrap>

                      <VideoDescription>{video.description}</VideoDescription>
                    </VideoDesWrap>
                  </VideoThumbnaillWrap>
                </Fade>
              ))
            ) : (
              <Loading />
            )}
          </VideoGridWrap>
        </VideoWrapper>
      </VideoContainer>
    </>
  );
};

export default Video;
