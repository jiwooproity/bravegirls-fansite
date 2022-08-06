import styled from "styled-components";

const CanvasDetailContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 0px 15px;

  display: flex;
  justify-content: center;
`;

const CanvasDetailWrapper = styled.div`
  width: 990px;

  padding: 50px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasDetailInfo = styled.div`
  width: 100%;
  padding: 50px 0px;
`;

const CanvasDetailText = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: ${(props) => props.theme.titleTextColor};

  white-space: pre-wrap;
`;

const DetailImageContainer = styled.div``;

const DetailImageWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
  border-radius: 5px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

const CommentWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
  border-top: 1px solid rgba(54, 54, 54, 0.1);

  display: flex;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 0px;
  white-space: nowrap;

  &:nth-child(2) {
    width: 100%;
    padding: 10px 0px 10px 10px;
  }
`;

const CommentInsertButton = styled.button`
  font-size: 15px;
  padding: 10px;
  height: 100%;

  border: none;

  &:focus {
    outline: none;
  }

  color: ${(props) => props.theme.diffTitleTextColor};
  background-color: ${(props) => props.theme.backgroundOpacityColor};

  transition: color 0.5 ease, background-color 0.5s ease;
`;

const CommentInfo = styled.div`
  width: 100%;
  padding: 0px 0px 5px 0px;
`;

const CommentNumber = styled.span`
  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentInput = styled.input`
  border: none;
  border: 1px solid ${(props) => props.theme.inputBottomColor};
  background-color: transparent;

  padding: 5px;
  margin-bottom: 5px;

  color: ${(props) => props.theme.titleTextColor};

  &:focus {
    outline: none;
  }
`;

const CommentTextField = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 5px;

  border: 1px solid ${(props) => props.theme.inputBottomColor};
  border-radius: 5px 0px 0px 5px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

const CommentListWrapper = styled.div`
  width: 100%;

  padding: 10px 0px 10px 0px;

  border-top: 1px solid ${(props) => props.theme.inputBottomColor};

  display: flex;
`;

const CommentList = styled.div`
  width: 100%;
  padding: 0px 0px 10px 10px;
`;

const CommentUserWrapper = styled.div`
  width: 250px;
`;

const CommentUserName = styled.span`
  font-size: 14px;
  line-height: 14px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentText = styled.span`
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.titleTextColor};

  white-space: pre-wrap;
`;

export { CanvasDetailContainer, CanvasDetailInfo, CanvasDetailText };
export { CanvasDetailWrapper, CommentBox, CommentInfo, CommentInput };
export { CommentInsertButton, CommentList, CommentListWrapper };
export { CommentNumber, CommentText, CommentTextField };
export { CommentUserName, CommentUserWrapper, CommentWrapper };
export { DetailImage, DetailImageContainer, DetailImageWrapper };
