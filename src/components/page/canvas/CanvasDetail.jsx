import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import _ from "lodash";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Loading, Top } from "components";

import { utils } from "util/utils";
import { canvasService } from "service";
import { commentService } from "service";

import {
  CanvasDetailContainer,
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
  CommentProfile,
  CommentNoneWrapper,
  CommentNoneText,
  CanvasInfoBox,
  CanvasInfoTitle,
  CanvasInfoDescription,
  CanvasInnerInfo,
  CanvasTitle,
  CommentDeletButton,
} from "style";

import { useStore } from "hooks";
import { useObserver } from "mobx-react";

const CanvasDetail = () => {
  const params = useParams();
  const { loginStore } = useStore();
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
    loginStore.login &&
      setUserInfo({
        ...userInfo,
        userName: sessionStorage.getItem("login.nickname"),
      });
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
        });
      });

      setDetail(detailObj);
      setCommentList(commentArr);
      setLoading(true);
    };
  };

  const insertComment = async () => {
    const isUsername = _.isEmpty(userInfo.userName);
    const isPassword = _.isEmpty(userInfo.password);
    const isInfo = _.isEmpty(comment);

    if (isInfo) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!loginStore.login && isUsername) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!loginStore.login && isPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (window.confirm("댓글을 남기시겠습니까?")) {
      const params = {
        parent: boardId,
        username: userInfo.userName,
        password: userInfo.password,
        profile: sessionStorage.getItem("login.profile"),
        unknown: loginStore.login ? 1 : 0,
        info: comment,
      };

      await commentService.commentInsert({ data: params }).then(() => {
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
    setComment(utils.onComment({ value }));
  };

  const onRestUserData = (e) => {
    const { name } = e.target;
    setUserInfo({ ...userInfo, [name]: "" });
  };

  const onDelete = async (comm) => {
    const { confirm, prompt } = window;

    const params = { commentId: comm.id };

    if (confirm("댓글을 삭제하시겠습니까?")) {
      const deleteReq = async () => {
        const { status, message } = await commentService.commentDelete({ data: params });
        status === 200 ? onLoad() : alert(message);
      };

      const isUnknown = () => {
        prompt("비밀번호를 입력해주세요") === comm.password ? deleteReq() : alert("비밀번호가 일치하지 않습니다.");
      };

      comm.unknown ? deleteReq() : isUnknown();
    }
  };

  const isOwnComment = (comm) => {
    return (comm.unknown && comm.userName === sessionStorage.getItem("login.nickname")) || !comm.unknown;
  };

  return useObserver(() => {
    const { login } = loginStore;

    return (
      <>
        <Top />
        <CanvasDetailContainer>
          {loading ? (
            <DetailImageContainer>
              <CanvasDetailWrapper>
                <DetailImageWrapper width={detail.width}>
                  <DetailImage src={detail.art} />
                  <CanvasInfoBox>
                    <CanvasInfoTitle>{`#${detail.nickname}`}</CanvasInfoTitle>
                    <CanvasInfoDescription>{detail.description}</CanvasInfoDescription>
                  </CanvasInfoBox>
                </DetailImageWrapper>
                <CanvasInnerInfo>
                  <CanvasTitle>{`${detail.title}`}</CanvasTitle>
                </CanvasInnerInfo>
              </CanvasDetailWrapper>
              <CommentInfo>
                <CommentNumber>댓글 {commentList.length}개</CommentNumber>
              </CommentInfo>
              <CommentWrapper>
                <CommentBox>
                  <CommentInput
                    type={"text"}
                    name={"userName"}
                    placeholder={"아이디"}
                    value={userInfo.userName}
                    onClick={onRestUserData}
                    onChange={onChangeUser}
                    disabled={login}
                  />
                  {!login && (
                    <CommentInput
                      type={"password"}
                      name={"password"}
                      placeholder={"비밀번호"}
                      value={userInfo.password}
                      onClick={onRestUserData}
                      onChange={onChangeUser}
                    />
                  )}
                </CommentBox>
                <CommentBox>
                  <CommentTextField type={"area"} name="comment" placeholder="악의 적인 댓글은 삭제될 수 있습니다." onChange={onChangeComment} />
                </CommentBox>
                <CommentBox>
                  <CommentInsertButton onClick={insertComment}>등록</CommentInsertButton>
                </CommentBox>
              </CommentWrapper>
              {!_.isEmpty(commentList) ? (
                _.map(commentList, (comm, index) => (
                  <CommentListWrapper key={index}>
                    {isOwnComment(comm) && <CommentDeletButton icon={faXmark} onClick={() => onDelete(comm)} />}
                    <CommentUserWrapper>
                      <CommentProfile src={comm.profile} />
                      <CommentUserName>{comm.userName}</CommentUserName>
                    </CommentUserWrapper>
                    <CommentList>
                      <CommentText>{comm.info}</CommentText>
                    </CommentList>
                  </CommentListWrapper>
                ))
              ) : (
                <CommentListWrapper>
                  <CommentNoneWrapper>
                    <CommentNoneText>아직 댓글이 없습니다.</CommentNoneText>
                  </CommentNoneWrapper>
                </CommentListWrapper>
              )}
            </DetailImageContainer>
          ) : (
            <Loading />
          )}
        </CanvasDetailContainer>
      </>
    );
  });
};

export default CanvasDetail;
