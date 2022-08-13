import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

const Comment = {};

Comment.Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

Comment.InnerWrapper = styled.div`
  &:nth-child(1) {
    display: flex;
    align-items: center;
    margin-bottom: ${({ login }) => (login ? "5px" : "0px")};
  }

  &:nth-child(2) {
    display: flex;
    flex-direction: column;

    white-space: nowrap;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    padding: 0px 0px 0px 0px;
  }
`;

Comment.Profile = styled.img`
  width: 20px;
  height: 20px;
  display: block;

  border-radius: 50%;
`;

Comment.Input = styled.input`
  background-color: transparent;

  ${({ login }) =>
    login
      ? css`
          border: none;
        `
      : css`
          border: none;
          border: 1px solid ${({ theme }) => theme.inputBottomColor};
          margin-bottom: 5px;
        `}

  padding: 5px;

  color: ${({ theme }) => theme.titleTextColor};

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  transition: color 0.5s ease;
`;

Comment.Button = styled.button`
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  margin: 5px 0px 0px 0px;
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

Comment.SendIcon = styled(FontAwesomeIcon)`
  font-size: 12px;
`;

Comment.TextField = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 5px;

  border: 1px solid ${({ theme }) => theme.inputBottomColor};
  background-color: transparent;

  &:focus {
    outline: none;
  }

  transition: border 0.5s ease;
  resize: none;

  color: ${({ theme }) => theme.titleTextColor};
`;

Comment.Info = styled.div`
  width: 100%;
  padding: 0px 0px 5px 0px;
`;

Comment.Number = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme }) => theme.titleTextColor};
`;

export { Comment };
