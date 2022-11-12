import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

const CommentList = {};

CommentList.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  position: relative;
`;

CommentList.DepthLine = styled.div`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 20px;

  background-color: ${({ theme }) => theme.inputBottomColor};
  z-index: 0;

  @media screen and (max-width: 768px) {
    left: 10px;
  }
`;

CommentList.DepthConnect = styled.div`
  width: 30px;
  height: 1px;
  position: absolute;
  top: 50%;
  left: -30px;

  transform: translateY(-50%);

  background-color: ${({ theme }) => theme.inputBottomColor};
  z-index: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

CommentList.DepthCircle = styled.div`
  width: 8px;
  height: 8px;
  position: absolute;
  top: 50%;
  left: -33px;

  transform: translateY(-50%);

  border: 1px solid ${({ theme }) => theme.inputBottomColor};
  border-radius: 50%;

  background-color: ${({ theme }) => theme.backgroundColor};

  z-index: 3;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

CommentList.Wrapper = styled.div`
  position: relative;
  margin: 0px 0px 10px 0px;

  /* border-top: 1px solid ${({ theme }) => theme.inputBottomColor}; */

  &.comment-parent {
    width: 100%;
  }

  &.comment-children {
    width: 95%;
  }

  &.comment-reply {
    width: 95%;
  }

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.backgroundColor};

  z-index: 2;
`;

CommentList.ReplyWrapper = styled.div`
  padding: 15px 15px 15px 15px;
  background-color: ${({ theme }) => theme.inputReplyColor};
`;

CommentList.Icon = styled(FontAwesomeIcon)`
  font-size: 22px;
  height: 22px;

  position: absolute;
  top: 14px;
  left: 10px;

  color: ${({ theme }) => theme.titleTextColor};
`;

CommentList.TextArea = styled.div`
  width: 100%;
  padding: 30px 10px;

  cursor: pointer;
`;

CommentList.Text = styled.span`
  font-size: 14px;
  line-height: 14px;
  white-space: pre-wrap;

  color: ${({ theme }) => theme.titleTextColor};
`;

CommentList.UserArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0px 10px 10px;
  background-color: ${({ theme }) => theme.inputReplyColor};
`;

CommentList.Profile = styled.img`
  width: 20px;
  height: 20px;
  display: block;

  border-radius: 50%;
`;

CommentList.User = styled.span`
  font-size: 14px;
  line-height: 14px;

  color: ${({ theme }) => theme.titleTextColor};
`;

CommentList.Profile = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px 0px 0px;
  border-radius: 50%;

  display: block;
`;

CommentList.NoneArea = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

CommentList.NoneText = styled.span`
  font-size: 12px;
  line-height: 12px;

  color: ${({ theme }) => theme.titleTextColor};
`;

CommentList.DeleteButton = styled(FontAwesomeIcon)`
  font-size: 15px;
  line-height: 15px;

  width: 12px;
  height: 12px;
  position: absolute;
  top: 15px;
  right: 15px;

  border-radius: 2px;
  cursor: pointer;

  color: ${({ theme }) => theme.backgroundColor};
  background-color: ${({ theme }) => theme.backgroundOpacityColor};
`;

CommentList.AnsWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

CommentList.Input = styled.input`
  ${({ login }) =>
    login
      ? css`
          border: none;
          background-color: ${({ theme }) => theme.inputReplyColor};
          padding: 5px 5px 5px 0px;
        `
      : css`
          border: none;
          border: 1px solid ${({ theme }) => theme.inputBottomColor};
          background-color: ${({ theme }) => theme.backgroundColor};
          margin-bottom: 5px;
          padding: 5px;
        `}

  color: ${({ theme }) => theme.titleTextColor};

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  transition: 0.5s ease, background-color 0.5s ease;
`;

CommentList.TextField = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 5px;
  margin-top: 5px;

  border: 1px solid ${({ theme }) => theme.inputBottomColor};
  background-color: ${({ theme }) => theme.backgroundColor};

  &:focus {
    outline: none;
  }

  transition: border 0.5s ease;
  resize: none;

  color: ${({ theme }) => theme.titleTextColor};

  transition: 0.5s ease, background-color 0.5s ease;
`;

CommentList.ButtonWrapper = styled.div`
  width: 100%;
  padding: 5px 0px 0px 0px;

  display: flex;
  justify-content: flex-end;
`;

CommentList.Button = styled.button`
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  padding: 8px 25px;
  border: none;
  border-radius: 3px;

  color: ${({ theme }) => theme.diffTitleTextColor};
  background-color: ${({ theme }) => theme.buttonColor};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundOpacityColor};
  }

  transition: background-color 0.5s ease;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  cursor: pointer;
`;

CommentList.SendIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
`;

export { CommentList };
