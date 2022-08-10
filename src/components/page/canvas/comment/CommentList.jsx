import React from "react";
import { useObserver } from "mobx-react";
import _ from "lodash";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { commentService } from "services";
import { useStore } from "hooks";

import { CommentList as CSS } from "style";

const CommentList = (props) => {
  const { data, refresh } = props;
  const { loginStore } = useStore();

  const onDelete = async (comm) => {
    const { id: commentId, unknown, password } = comm;
    const { confirm, prompt } = window;
    const params = { commentId };

    if (confirm("댓글을 삭제하시겠습니까?")) {
      const deleteReq = async () => {
        const { status, message } = await commentService.commentDelete({
          data: params,
        });

        _.isEqual(status, 200) ? refresh() : alert(message);
      };

      const isUnknown = () => {
        _.isEqual(prompt("비밀번호를 입력해주세요"), password) ? deleteReq() : alert("비밀번호가 일치하지 않습니다.");
      };

      unknown ? deleteReq() : isUnknown();
    }
  };

  const renderButton = (comm) => {
    const { unknown, userName } = comm;
    const { login } = loginStore;
    const role = (unknown && login && _.isEqual(userName, sessionStorage.getItem("login.nickname"))) || !unknown;
    return role ? <CSS.DeleteButton icon={faXmark} onClick={() => onDelete(comm)} /> : null;
  };

  return useObserver(() => {
    return (
      <>
        {!_.isEmpty(data) ? (
          _.map(data, (comm, index) => (
            <CSS.Wrapper key={index}>
              {renderButton(comm)}
              <CSS.UserArea>
                <CSS.Profile src={comm.profile} />
                <CSS.User>{comm.userName}</CSS.User>
              </CSS.UserArea>
              <CSS.TextArea>
                <CSS.Text>{comm.info}</CSS.Text>
              </CSS.TextArea>
            </CSS.Wrapper>
          ))
        ) : (
          <CSS.Wrapper>
            <CSS.NoneArea>
              <CSS.NoneText>아직 댓글이 없습니다.</CSS.NoneText>
            </CSS.NoneArea>
          </CSS.Wrapper>
        )}
      </>
    );
  });
};

export default CommentList;
