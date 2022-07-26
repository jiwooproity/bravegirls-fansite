import React, { useState } from "react";
import styled from "styled-components";

import _ from "lodash";
import { useEffect } from "react";
import { youtubeService } from "service/photocardService";
import { Loading } from "components";
import { Fade } from "react-reveal";
import { useLocation } from "react-router-dom";

const NavbarBox = styled.div`
  width: 100%;
  height: 85px;
`;

const VideoContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 30px 30px 30px;

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

  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
`;

const VideoCustomIframe = styled.iframe`
  width: 100%;
  height: 100%;
  display: block;

  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  border: none;
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
    line-height: 4.8vw;
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

      try {
        const detailData = await youtubeService.getVideo({ part: "statistics", id: snippet.resourceId.videoId });

        for (const detail of detailData.items) {
          const statistics = detail.statistics;

          videoArr.push({
            videoId: snippet.resourceId.videoId,
            // thumbnail: snippet.thumbnails.maxres.url,
            title: snippet.title,
            description: snippet.description,
            viewCount: statistics.viewCount,
            likeCount: statistics.likeCount,
            commentCount: statistics.commentCount,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    setVideoData(videoArr);
    setLoading(true);
  };

  const getComma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                        src={`http://www.youtube.com/embed/${video.videoId}?rel=0&enablejsapi=1`}
                        frameborder="0"
                        allowfullscreen="1"
                      />
                    </VideoThumbnailImageFrame>
                    <VideoDesWrap>
                      <VideoTitleWrap>
                        <VideoTitle>{video.title}</VideoTitle>
                        <VideoCountNumber>{`${getComma(video.viewCount)}만 회`}</VideoCountNumber>
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
