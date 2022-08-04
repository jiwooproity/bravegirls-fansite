import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faArrowsRotate,
  faTrashCan,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const ToolBox = styled.div`
  height: ${({ active }) => (active ? "0%" : "100%")};
  overflow: hidden;

  display: flex;
  flex-direction: column;

  position: absolute;
  top: 0;
  left: -40px;

  background-color: white;
  box-shadow: ${({ active }) =>
    active
      ? "none"
      : "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"};

  z-index: 5;

  transition: height 0.5s ease;
`;

const ToolIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  line-height: 20px;

  border-bottom: 1px solid rgba(54, 54, 54, 0.1);

  padding: 10px 5px;

  color: black;

  cursor: pointer;
`;

const CanvasTool = (props) => {
  const { active, func } = props;

  return (
    <ToolBox active={active}>
      <ToolIcon icon={faEraser} onClick={func.onErase} />
      <ToolIcon icon={faArrowsRotate} onClick={func.onRefresh} />
      <ToolIcon icon={faTrashCan} onClick={func.onDelete} />
      <ToolIcon icon={faCloudArrowDown} onClick={func.saveImage} />
    </ToolBox>
  );
};

export default CanvasTool;
