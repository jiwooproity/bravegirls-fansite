import React from "react";
import styled from "styled-components";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { snsMenu } from "constant/Menu";

const SnsNavbarList = styled.li`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;

  padding: 0px 0px 0px 25px;

  position: relative;

  span {
    cursor: pointer;
  }

  #parent {
    text-decoration: none;

    color: ${(props) => props.theme.navbarTextColor};

    position: relative;

    &::before {
      content: "";
      width: ${({ focus }) => (focus ? "100%" : "0px")};
      height: 4px;

      position: absolute;
      top: 50%;

      z-index: -1;

      background-color: ${(props) => props.theme.hoverColor};

      transition: width 0.5s ease;
    }

    &:hover {
      color: ${(props) => props.theme.navbarTextColor};

      &::before {
        content: "";
        width: 100%;
        height: 6px;

        position: absolute;
        top: 50%;

        z-index: -1;

        background-color: ${(props) => props.theme.hoverColor};
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SnSFontAwesomeCustom = styled(FontAwesomeIcon)`
  font-size: 20px;

  color: ${(props) => props.theme.navbarTextColor};

  cursor: pointer;

  z-index: 3;
`;

const SnsNavbar = () => {
  return _.map(snsMenu, (list, index) => (
    <SnsNavbarList key={index}>
      <a href={list.root} target={"_blank"} rel="noreferrer">
        <SnSFontAwesomeCustom icon={list.icon} />
      </a>
    </SnsNavbarList>
  ));
};

export default SnsNavbar;
