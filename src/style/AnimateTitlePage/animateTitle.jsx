import styled from "styled-components";

const AnimateTitle = {};

AnimateTitle.Canvas = styled.canvas`
  opacity: 0.8;

  position: absolute;
  top: 0;
  left: 0;

  display: ${({ active }) => (active ? "block" : "none")};
`;

export { AnimateTitle };
