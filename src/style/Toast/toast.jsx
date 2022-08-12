import styled from "styled-components";

const Toast = {};

Toast.Box = styled.div`
  width: 500px;
  padding: 15px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: rgba(54, 54, 54);

  z-index: 999;
`;

Toast.Text = styled.span`
  font-size: 15px;
  line-height: 15px;

  color: rgba(245, 245, 245);
`;

export { Toast };
