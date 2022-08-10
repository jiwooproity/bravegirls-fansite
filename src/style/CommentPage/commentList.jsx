import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CommentList = {};

CommentList.Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

CommentList.TextArea = styled.div`
  width: 100%;
  padding: 15px 0px;
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
  right: 0;

  border-radius: 2px;
  cursor: pointer;

  color: ${({ theme }) => theme.backgroundColor};
  background-color: ${({ theme }) => theme.backgroundOpacityColor};
`;

export { CommentList };
