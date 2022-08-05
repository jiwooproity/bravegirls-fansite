import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Fade } from "react-reveal";

import styled from "styled-components";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPencil } from "@fortawesome/free-solid-svg-icons";

import { Loading, Top } from "components";

import { utils } from "util";
import { API } from "constant";
import { youtubeService } from "service";

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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;

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

const VideoThumbnaillImage = styled.img`
  width: 100%;

  position: absolute;
  top: 50%;
  left: 0px;

  transform: translateY(-50%);

  display: block;
`;

const VideoDesWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const VideoTitleWrap = styled.div`
  padding: 0px 0px 15px 0px;
`;

const VideoTitle = styled.h1`
  font-size: 15px;
  line-height: 23px;
  padding: 5px 0px 0px 0px;

  @media screen and (max-width: 768px) {
    font-size: 4vw;
    line-height: 5.5vw;
  }

  a {
    color: ${(props) => props.theme.titleTextColor};
    text-decoration: none;
  }
`;

const VideoCountNumber = styled.h1`
  font-size: 13px;
  line-height: 13px;
  padding: 10px 0px 0px 0px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
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
  font-size: 15px;
  line-height: 15px;

  margin-right: 10px;

  color: ${(props) => props.theme.subTitleTexatColor};

  @media screen and (max-width: 768px) {
    font-size: 3vw;
    line-height: 3vw;
  }
`;

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const pathname = location.pathname.replace("/video/", "");

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, [pathname]);

  const onLoad = async () => {
    setLoading(false);
    const videoArr = [];
    const keyPath = pathname.toUpperCase();
    const listParams = {
      playlistId: API.YOUTUBE_KEY[keyPath],
      part: "snippet",
      maxResults: 30,
    };

    const playList = await youtubeService.playList({ params: listParams });

    for (const playData of playList.items) {
      const snippet = playData.snippet;
      const videoParams = {
        part: "statistics",
        id: snippet.resourceId.videoId,
      };

      const detailData = await youtubeService.videoDetail({
        params: videoParams,
      });

      for (const detail of detailData.items) {
        let thumbnail;
        const { maxres, standard, high } = snippet.thumbnails;
        const statistics = detail.statistics;

        thumbnail = maxres ? maxres : standard ? standard : high;

        videoArr.push({
          videoId: snippet.resourceId.videoId,
          thumbnail: thumbnail.url,
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
      <Top />
      <VideoContainer>
        <VideoWrapper>
          <VideoGridWrap>
            {loading ? (
              _.map(videoData, (video, index) => (
                <Fade bottom key={index}>
                  <VideoThumbnaillWrap>
                    <VideoThumbnailImageFrame>
                      <Link to={`${video.videoId}`}>
                        <VideoThumbnaillImage src={video.thumbnail} />
                      </Link>
                    </VideoThumbnailImageFrame>
                    <VideoDesWrap>
                      <VideoTitleWrap>
                        <VideoTitle>
                          <Link to={`${video.videoId}`}>{video.title}</Link>
                        </VideoTitle>
                        <VideoCountIconWrapper>
                          <VideoCountIcon icon={faThumbsUp} />
                          <VideoThumbCount>{video.likeCount}</VideoThumbCount>
                          <VideoCountIcon icon={faPencil} />
                          <VideoThumbCount>
                            {video.commentCount}
                          </VideoThumbCount>
                        </VideoCountIconWrapper>
                        <VideoCountNumber>{video.viewCount}</VideoCountNumber>
                      </VideoTitleWrap>
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
