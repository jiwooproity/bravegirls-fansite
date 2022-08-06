import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import _ from "lodash";

import { Loading, Top } from "components";

import { utils } from "util/utils";
import { canvasService } from "service";
import { commentService } from "service";

import {
  CanvasDetailContainer,
  CanvasDetailInfo,
  CanvasDetailText,
  CanvasDetailWrapper,
  CommentBox,
  CommentInfo,
  CommentInput,
  CommentInsertButton,
  CommentList,
  CommentListWrapper,
  CommentNumber,
  CommentText,
  CommentTextField,
  CommentUserName,
  CommentUserWrapper,
  CommentWrapper,
  DetailImage,
  DetailImageContainer,
  DetailImageWrapper,
} from "style";

const CanvasDetail = () => {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [userInfo, setUserInfo] = useState({
    userName: "익명의 쁘붕이",
    password: "",
  });

  const { boardId } = params;

  useEffect(() => {
    onLoad();
    localStorage.getItem("userInfo") && setUserInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    utils.onScrollTop();
  }, [boardId]);

  const onLoad = async () => {
    setLoading(false);
    let image = new Image();
    let detailObj = {};
    const commentArr = [];
    const response = await canvasService.cavasDetail({ params: { boardId } });
    const commentResponse = await commentService.commentList({ params: { commentId: boardId } });

    image.src = response.canvas_art;

    image.onload = () => {
      detailObj = {
        title: response.canvas_title,
        description: response.canvas_description.split("<br/>").join("\r\n"),
        art: response.canvas_art,
        width: image.width,
        height: image.height,
      };

      _.forEach(commentResponse, (comm) => {
        commentArr.push({
          id: comm.comment_idx,
          parent: comm.comment_parent,
          userName: comm.comment_username,
          info: comm.comment_info.split("<br/>").join("\r\n"),
          date: comm.comment_date,
        });
      });

      setDetail(detailObj);
      setCommentList(commentArr);
      setLoading(true);
    };
  };

  const insertComment = async () => {
    const isParent = _.isEmpty(boardId);
    const isUsername = _.isEmpty(userInfo.userName);
    // const isPassword = _.isEmpty(userInfo.password);
    const isInfo = _.isEmpty(comment);

    if (isParent || isUsername || isInfo) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }

    if (window.confirm("댓글을 남기시겠습니까?")) {
      const params = {
        parent: boardId,
        username: userInfo.userName,
        password: userInfo.password,
        info: comment,
      };

      await commentService.commentInsert({ params }).then(() => {
        onLoad();
        setComment("");
      });
    }
  };

  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const onChangeComment = (e) => {
    const { value } = e.target;
    setComment(value.replace(/(?:\r\n|\r|\n)/g, "<br/>"));
  };

  const onRestUserData = (e) => {
    const { name } = e.target;
    setUserInfo({ ...userInfo, [name]: "" });
  };

  return (
    <>
      <Top />
      <CanvasDetailContainer>
        {loading ? (
          <DetailImageContainer>
            <CanvasDetailWrapper>
              <DetailImageWrapper width={detail.width}>
                <DetailImage src={detail.art} />
              </DetailImageWrapper>
              <CanvasDetailInfo>
                <CanvasDetailText>{detail.description}</CanvasDetailText>
              </CanvasDetailInfo>
            </CanvasDetailWrapper>
            <CommentInfo>
              <CommentNumber>댓글 {commentList.length}개</CommentNumber>
            </CommentInfo>
            <CommentWrapper>
              <CommentBox>
                <CommentInput type={"text"} name="userName" placeholder="아이디" value={userInfo.userName} onClick={onRestUserData} onChange={onChangeUser} />
                <CommentInput
                  type={"password"}
                  name="password"
                  placeholder="비밀번호"
                  value={userInfo.password}
                  onClick={onRestUserData}
                  onChange={onChangeUser}
                />
              </CommentBox>
              <CommentBox>
                <CommentTextField type={"area"} name="comment" placeholder="악의 적인 댓글은 삭제될 수 있습니다." onChange={onChangeComment} />
              </CommentBox>
              <CommentBox>
                <CommentInsertButton onClick={insertComment}>등록</CommentInsertButton>
              </CommentBox>
            </CommentWrapper>
            {_.map(commentList, (comm, index) => (
              <CommentListWrapper key={index}>
                <CommentUserWrapper>
                  <CommentUserName>{comm.userName}</CommentUserName>
                </CommentUserWrapper>
                <CommentList>
                  <CommentText>{comm.info}</CommentText>
                </CommentList>
              </CommentListWrapper>
            ))}
          </DetailImageContainer>
        ) : (
          <Loading />
        )}
      </CanvasDetailContainer>
    </>
  );
};

export default CanvasDetail;
