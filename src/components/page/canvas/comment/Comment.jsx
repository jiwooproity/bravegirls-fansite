import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import _ from "lodash";

import { useStore } from "hooks";
import { commentService } from "services";
import { utils } from "util";

import { Comment as CSS, FontIcon } from "style";

const Comment = (props) => {
  const { length, target, refresh } = props;
  const { loginStore, toastStore } = useStore();
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

  const insert = async () => {
    const isUsername = _.isEmpty(comment.userName);
    const isPassword = _.isEmpty(comment.password);
    const isInfo = _.isEmpty(comment.text);

    if (isUsername || (!loginStore.login && isPassword) || isInfo) {
      toastStore.showToast({ status: 2, msg: "댓글 등록에 필요한 내용이 부족합니다." });
      return;
    }

    if (window.confirm("댓글을 남기시겠습니까?")) {
      const params = {
        parent: target,
        username: comment.userName,
        password: comment.password,
        profile: sessionStorage.getItem("login.profile"),
        unknown: loginStore.login ? 1 : 0,
        info: comment.text,
        type: "comment",
      };

      await commentService.commentInsert({ data: params }).then(() => {
        setComment({
          ...comment,
          text: "",
        });

        refresh();
        toastStore.showToast({ status: 0, msg: "댓글이 등록 되었습니다." });
      });
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const onRest = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: _.isEqual(name, "text") ? utils.onComment({ value }) : "",
    });
  };

  return useObserver(() => {
    const { login } = loginStore;

    const placeHolderI = "아이디";
    const placeHolderP = "비밀번호";
    const placeHolderC = "악의적인 댓글은 삭제될 수 있습니다.";

    const input = [
      {
        type: "text",
        name: "userName",
        value: comment.userName,
        placeHolder: placeHolderI,
        onClick: onRest,
        onChange: onChange,
        disabled: login,
        visible: true,
      },
      {
        type: "password",
        name: "password",
        value: comment.password,
        placeHolder: placeHolderP,
        onClick: onRest,
        onChange: onChange,
        visible: !login ? true : false,
      },
    ];

    return (
      <>
        {/* 댓글 개수 */}
        <CSS.Info>
          <CSS.Number>댓글 {length}개</CSS.Number>
        </CSS.Info>

        {/* 댓글 작성 폼 */}
        <CSS.Wrapper>
          <CSS.InnerWrapper login={login}>
            {login && <CSS.Profile src={sessionStorage.getItem("login.profile")} />}
            {_.map(
              input,
              (i, index) =>
                i.visible && (
                  <CSS.Input
                    key={index}
                    type={i.type}
                    name={i.name}
                    value={i.value}
                    placeholder={i.placeHolder}
                    onClick={i.onClick}
                    onChange={i.onChange}
                    disabled={i.disabled}
                    login={login}
                  />
                )
            )}
          </CSS.InnerWrapper>
          <CSS.InnerWrapper>
            <CSS.TextField type={"area"} name="text" value={comment.text.split("<br/>").join("\r\n")} placeholder={placeHolderC} onChange={onRest} />
          </CSS.InnerWrapper>

          {/* 댓글 등록 버튼 */}
          <CSS.InnerWrapper>
            <CSS.Button onClick={insert}>
              <CSS.SendIcon icon={FontIcon.Send} />
            </CSS.Button>
          </CSS.InnerWrapper>
        </CSS.Wrapper>
      </>
    );
  });
};

export default Comment;
