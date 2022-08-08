import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CanvasDetailContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 0px 15px;

  display: flex;
  justify-content: center;
`;

const DetailImageContainer = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px 50px 0px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasDetailInfo = styled.div`
  width: 100%;
`;

const CanvasTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;

  padding: 0px 0px 5px 0px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CanvasDetailText = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: ${(props) => props.theme.titleTextColor};

  white-space: pre-wrap;
`;

const DetailImageWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &:hover {
    div:nth-child(2) {
      height: 150px;
      background-color: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CanvasInfoBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 10px;
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: height 0.5s ease, background-color 0.5s ease, backdrop-filter 0.5s;
`;

const CanvasInnerInfo = styled.div`
  padding: 30px 0px 0px 0px;
`;

const CanvasInfoDescription = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;

  padding: 20px 0px;

  color: rgba(255, 255, 255, 0.9);
`;

const CanvasInfoTitle = styled.span`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;

  color: rgba(255, 255, 255, 0.9);
`;

const DetailImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

const CommentWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const CommentBox = styled.div`
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

const CommentInsertButton = styled.button`
  font-size: 12px;
  font-weight: 600;
  height: 100%;
  padding: 5px 20px;
  border: none;
  border-radius: 3px;

  color: ${(props) => props.theme.diffTitleTextColor};
  background-color: ${(props) => props.theme.backgroundOpacityColor};

  &:hover {
    background-color: ${(props) => props.theme.black};
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

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CommentTextField = styled.textarea`
  width: 100%;
  height: 100px;

  padding: 5px;

  border: 1px solid ${(props) => props.theme.inputBottomColor};
  background-color: transparent;

  &:focus {
    outline: none;
  }

  transition: border 0.5s ease;
  resize: none;
`;

const CommentListWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const CommentDeletButton = styled(FontAwesomeIcon)`
  width: 12px;
  height: 12px;
  font-size: 15px;
  line-height: 15px;
  position: absolute;
  top: 15px;
  right: 0;
  border-radius: 2px;

  color: ${(props) => props.theme.backgroundColor};
  background-color: ${(props) => props.theme.backgroundOpacityColor};
  cursor: pointer;
`;

const CommentNoneWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentNoneText = styled.span`
  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.titleTextColor};
`;

const CommentList = styled.div`
  width: 100%;
  padding: 15px 0px;
`;

const CommentUserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0px 0px 0px;
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

const CommentProfile = styled.img`
  width: 20px;
  height: 20px;
  margin: 0px 5px 0px 0px;
  border-radius: 50%;

  display: block;
`;

export { CanvasDetailContainer, CanvasDetailInfo, CanvasDetailText };
export { CanvasDetailWrapper, CommentBox, CommentInfo, CommentInput };
export { CommentInsertButton, CommentList, CommentListWrapper };
export { CommentNumber, CommentText, CommentTextField, CanvasTitle };
export { CommentUserName, CommentUserWrapper, CommentWrapper };
export { DetailImage, DetailImageContainer, DetailImageWrapper };
export { CommentProfile, CommentNoneWrapper, CommentNoneText, CanvasInnerInfo };
export { CanvasInfoBox, CanvasInfoTitle, CanvasInfoDescription };
export { CommentDeletButton };
