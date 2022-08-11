import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import _ from "lodash";

import { Top, Comment, CommentList } from "components";

import { utils } from "util/utils";
import { useStore } from "hooks";
import { canvasService, commentService } from "services";

import { CanvasDetail as CSS } from "style";

const CanvasDetail = () => {
  const params = useParams();
  const { boardId } = params;
  const { loadingStore } = useStore();
  const [detail, setDetail] = useState({});
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    onLoad();
    loadingStore.setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    utils.onScrollTop();
  }, [boardId]);

  const onLoad = async () => {
    let image = new Image();
    let detailObj = {};
    const commentArr = [];
    const response = await canvasService.cavasDetail({ params: { boardId } });
    const commentResponse = await commentService.commentList({
      params: { commentId: boardId },
    });

    image.src = response.canvas_art;

    image.onload = () => {
      detailObj = {
        nickname: response.canvas_nickname,
        title: response.canvas_title,
        description: response.canvas_description.split("<br/>").join("\r\n"),
        art: response.canvas_art,
        width: image.width,
        height: image.height,
        vertical: response.canvas_vertical === "1",
      };

      _.forEach(commentResponse, (comm) => {
        commentArr.push({
          id: comm.comment_idx,
          parent: comm.comment_parent,
          password: comm.comment_password,
          userName: comm.comment_username,
          profile: comm.comment_profile,
          unknown: comm.comment_unknown,
          info: comm.comment_info.split("<br/>").join("\r\n"),
          date: comm.comment_date,
          children: comm.children || [],
        });
      });

      setDetail(detailObj);
      setCommentList(commentArr);
      loadingStore.setLoading(true);
    };
  };

  return (
    <>
      <Top />
      <CSS.Container>
        <CSS.CanvasContainer>
          <CSS.Wrapper>
            <CSS.CanvasWrapper width={detail.width}>
              <CSS.CanvasImage src={detail.art} />
              <CSS.InfoBox>
                <CSS.InfoTitle>{`#${detail.nickname}`}</CSS.InfoTitle>
                <CSS.InfoDescription>{detail.description}</CSS.InfoDescription>
              </CSS.InfoBox>
            </CSS.CanvasWrapper>
            <CSS.InnerInfo>
              <CSS.InnerTitle>{`${detail.title}`}</CSS.InnerTitle>
            </CSS.InnerInfo>
          </CSS.Wrapper>

          {/* 댓글 입력 폼 */}
          <Comment data={commentList} target={boardId} refresh={onLoad} />

          {/* 댓글 리스트 */}
          <CommentList data={commentList} target={boardId} refresh={onLoad} />
        </CSS.CanvasContainer>
      </CSS.Container>
    </>
  );
};

export default CanvasDetail;
