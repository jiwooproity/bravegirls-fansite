import styled from "styled-components";

const Toast = {};

Toast.Box = styled.div`
  width: 500px;
  padding: 20px 30px;

  display: flex;
  position: fixed;
  opacity: ${({ show }) => (show ? "1" : "0")};
  bottom: ${({ show }) => (show ? "20px" : "-90px")};
  left: 50%;

  transform: translateX(-50%);

  border-radius: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  background-color: rgba(255, 255, 255);

  overflow: hidden;

  z-index: 999;

  transition: bottom 0.8s ease, opacity 0.5s ease;
`;

Toast.TextWrap = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

Toast.StatusColor = styled.div`
  width: 10px;
  height: 100%;

  position: absolute;
  top: 0px;
  left: 0px;

  &.Type-Success {
    background-color: #b4eeb4;
  }

  &.Type-Error {
    background-color: #fff4bd;
  }

  &.Type-Info {
    background-color: #bbeaff;
  }
`;

Toast.Text = styled.span`
  font-size: 15px;
  line-height: 15px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0px 0px 5px 0px;

  color: rgba(54, 54, 54);
`;

Toast.SubText = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;

  color: rgba(54, 54, 54);
`;

export { Toast };
