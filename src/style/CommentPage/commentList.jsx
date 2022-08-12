import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CommentList = {};

CommentList.Container = styled.div``;

CommentList.Wrapper = styled.div`
  width: 100%;

  position: relative;

  border-top: 1px solid ${({ theme }) => theme.inputBottomColor};

  &.comment-parent {
    padding: 0px 10px;
  }

  &.comment-children {
    padding: 0px 10px 0px 40px;
    background-color: ${({ theme }) => theme.inputReplyColor};
  }
`;

CommentList.ReplyWrapper = styled.div`
  padding: 15px 10px 15px 15px;
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
  padding: 15px 0px;

  cursor: pointer;
`;

CommentList.Text = styled.span`
  font-size: 14px;
  line-height: 14px;
  white-space: pre-wrap;

  color: ${({ theme }) => theme.titleTextColor};
`;

CommentList.UserArea = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0px 0px 0px;
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
  right: 10px;

  border-radius: 2px;
  cursor: pointer;

  color: ${({ theme }) => theme.backgroundColor};
  background-color: ${({ theme }) => theme.backgroundOpacityColor};
`;

CommentList.AnsWrapper = styled.div`
  width: 100%;
  padding: 0px 0px 0px 25px;

  display: flex;
`;

CommentList.Input = styled.input`
  border: none;
  border: 1px solid ${({ theme }) => theme.inputBottomColor};

  padding: 5px;
  margin-bottom: 5px;

  color: ${({ theme }) => theme.titleTextColor};
  background-color: ${({ theme }) => theme.backgroundColor};

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
  padding: 0px 0px 0px 0px;

  display: flex;
  justify-content: flex-end;
`;

CommentList.Button = styled.button`
  width: 100%;
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
