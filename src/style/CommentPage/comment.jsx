import styled from "styled-components";

const Comment = {};

Comment.Wrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

Comment.InnerWrapper = styled.div`
  &:nth-child(1) {
    display: flex;
  }

  &:nth-child(2) {
    display: flex;
    flex-direction: column;

    white-space: nowrap;
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    padding: 2px 0px 0px 0px;
  }
`;

Comment.Input = styled.input`
  border: none;
  border: 1px solid ${({ theme }) => theme.inputBottomColor};
  background-color: transparent;

  padding: 5px;
  margin-bottom: 5px;

  color: ${({ theme }) => theme.titleTextColor};

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

Comment.Button = styled.button`
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  padding: 5px 20px;
  border: none;
  border-radius: 3px;

  color: ${({ theme }) => theme.diffTitleTextColor};
  background-color: ${({ theme }) => theme.backgroundOpacityColor};

  &:hover {
    background-color: ${({ theme }) => theme.black};
  }

  transition: color 0.5s ease, background-color 0.5s ease;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  cursor: pointer;
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
