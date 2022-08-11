import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import _ from "lodash";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { commentService } from "services";
import { useStore } from "hooks";

import { CommentList as CSS, FontIcon } from "style";
import { utils } from "util";

const CommentList = (props) => {
  const { data, target, refresh } = props;
  const { loginStore } = useStore();
  const [comment, setComment] = useState({
    userName: "",
    password: "",
    text: "",
  });

  useEffect(() => {
    setComment({
      ...comment,
      userName: loginStore.login ? sessionStorage.getItem("login.nickname") : "익명의 쁘붕이",
    });
    // eslint-disable-next-line
  }, []);

  const [ans, setAns] = useState({
    id: 0,
    show: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onChangeText = (e) => {
    const { name, value } = e.target;

    setComment({
      ...comment,
      [name]: _.isEqual(name, "text") ? utils.onComment({ value }) : "",
    });
  };

  const onClick = ({ id }) => {
    const equalId = _.isEqual(ans.id, id);

    setAns({
      id,
      show: equalId ? (ans.show ? false : true) : true,
    });
  };

  const onDelete = async (comm) => {
    const { confirm, prompt } = window;

    let commentId = "";
    let unknown = "";
    let password = "";
    let type = "";

    if (!_.isEmpty(comm.userName)) {
      type = "comment";
      commentId = comm.id;
      unknown = comm.unknown;
      password = comm.password;
    } else {
      type = "answer";
      commentId = comm.comment_idx;
      unknown = comm.comment_unknown;
      password = comm.comment_password;
    }

    const params = { commentId, type };

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
    let unknown;
    let userName;

    if (!_.isEmpty(comm.userName)) {
      unknown = comm.unknown;
      userName = comm.userName;
    } else {
      unknown = comm.comment_unknown;
      userName = comm.comment_username;
    }

    const { login } = loginStore;
    const role = (unknown && login && _.isEqual(userName, sessionStorage.getItem("login.nickname"))) || !unknown;
    return role ? <CSS.DeleteButton icon={faXmark} onClick={() => onDelete(comm)} /> : null;
  };

  const insert = async () => {
    const isUsername = _.isEmpty(comment.userName);
    const isPassword = _.isEmpty(comment.password);
    const isInfo = _.isEmpty(comment.text);

    if (isUsername || (!loginStore.login && isPassword) || isInfo) {
      alert("답글 등록에 필요한 내용이 부족합니다.");
      return;
    }

    if (window.confirm("답글을 남기시겠습니까?")) {
      const params = {
        myid: target,
        parent: ans.id,
        username: comment.userName,
        password: comment.password,
        profile: sessionStorage.getItem("login.profile"),
        unknown: loginStore.login ? 1 : 0,
        info: comment.text,
        type: "answer",
      };

      await commentService.commentInsert({ data: params }).then(() => {
        setComment({
          ...comment,
          text: "",
        });

        setAns({
          ...ans,
          show: false,
        });

        refresh();
      });
    }
  };

  return useObserver(() => {
    const { login } = loginStore;

    return (
      <>
        {!_.isEmpty(data) ? (
          _.map(data, (comm, index) => (
            <CSS.Container key={index}>
              <CSS.Wrapper className="comment-parent">
                {renderButton(comm)}
                <CSS.UserArea>
                  <CSS.Profile src={comm.profile} />
                  <CSS.User>{comm.userName}</CSS.User>
                </CSS.UserArea>
                <CSS.TextArea onClick={() => onClick({ id: comm.id })}>
                  <CSS.Text>{comm.info}</CSS.Text>
                </CSS.TextArea>
              </CSS.Wrapper>

              {_.map(comm.children, (item, index) => (
                <CSS.Wrapper key={index} className="comment-children">
                  {renderButton(item)}
                  <CSS.Icon icon={FontIcon.Reply} />
                  <CSS.UserArea>
                    <CSS.Profile src={item.comment_profile} />
                    <CSS.User>{item.comment_username}</CSS.User>
                  </CSS.UserArea>
                  <CSS.TextArea>
                    <CSS.Text>{item.comment_info}</CSS.Text>
                  </CSS.TextArea>
                </CSS.Wrapper>
              ))}

              {ans.show && _.isEqual(ans.id, comm.id) && (
                <>
                  <CSS.AnsWrapper>
                    <CSS.Input type="text" name="userName" value={comment.userName} onChange={onChange} disabled={login} />
                    {!login && <CSS.Input type="text" name="password" value={comment.password} onChange={onChange} />}
                  </CSS.AnsWrapper>
                  <CSS.AnsWrapper>
                    <CSS.TextField name="text" value={comment.text} placeholder={"답글을 남겨주세요."} onChange={onChangeText} />
                  </CSS.AnsWrapper>
                  <CSS.AnsWrapper>
                    <CSS.ButtonWrapper>
                      <CSS.Button onClick={insert}>등록</CSS.Button>
                    </CSS.ButtonWrapper>
                  </CSS.AnsWrapper>
                </>
              )}
            </CSS.Container>
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
