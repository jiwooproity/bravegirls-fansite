import React, { useState } from "react";
import styled, { css } from "styled-components";

import _ from "lodash";
import { Link } from "react-router-dom";
import { Menu } from "constant";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { utils } from "util/utils";

const FontAwesomeCustom = styled(FontAwesomeIcon)`
  font-size: 20px;

  ${(props) =>
    ({ setting, active }) =>
      setting === "false"
        ? css`
            color: ${active === "false" ? props.theme.navbarTextColor : props.theme.navbarBgColor};
          `
        : css`
            color: rgba(255, 255, 255, 0.9);
          `};

  cursor: pointer;

  z-index: 3;

  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    padding: 0px 0px 0px 10px;
  }
`;

const MediaBackdropFilter = styled.div`
  width: 100%;
  height: 100vh;

  backdrop-filter: blur(0);
  opacity: 0;

  position: fixed;
  top: 0;
  left: 0;

  ${({ active }) =>
    active === "false" &&
    css`
      opacity: 0;
      backdrop-filter: blur(0);
    `}

  transition: opacity 0.5s ease, backdrop-filter 0.5s ease;

  pointer-events: none;

  @media screen and (max-width: 768px) {
    backdrop-filter: blur(10px);
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.8);

    ${({ active }) =>
      active === "false" &&
      css`
        opacity: 0;
        backdrop-filter: blur(0);
      `}
  }
`;

const MediaNavbar = styled.div`
  min-width: 200px;
  height: 100vh;
  padding: 85px 15px 0px 15px;

  display: flex;

  position: fixed;
  top: 0;
  right: -100%;

  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);

  z-index: 2;

  transition: right 0.5s ease;

  @media screen and (max-width: 768px) {
    right: ${({ active }) => (active === "true" ? "0px" : "-100%")};
  }
`;

const MediaMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const MediaList = styled.li`
  display: flex;
  align-items: center;

  position: relative;

  a,
  span {
    font-size: 20px;
    color: white;
    text-decoration: none;
    &:hover {
      color: rgba(251, 187, 98);
    }

    text-transform: uppercase;
  }

  transition: background-color 0.5s ease;

  @media screen and (max-width: 768px) {
    padding: 5px 5px;
    border-top: 2px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: 2px solid hsla(0, 0%, 100%, 0.1);
    }

    svg {
      width: 20px;
      font-size: 15px;
      padding: 0px 5px 0px 0px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const MediaChildrenArrow = styled(FontAwesomeIcon)`
  font-size: 20px;

  position: absolute;
  top: 50%;
  right: ${({ active }) => (active ? "4px" : "0px")};

  transform: translateY(-50%) ${({ active }) => (active ? "rotate(-180deg)" : "rotate(0deg)")};
  transition: transform 0.5s, right 0.5s ease;

  color: rgba(255, 255, 255, 0.9);

  cursor: pointer;

  z-index: 3;

  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    padding: 0px 0px 0px 10px;
  }
`;

const MediaChildren = styled.li`
  display: ${({ active }) => (active ? "flex" : "none")};
  align-items: center;

  a {
    font-size: 15px;
    color: white;
    text-decoration: none;
    &:hover {
      color: rgba(251, 187, 98);
    }

    text-transform: uppercase;
  }

  transition: background-color 0.5s ease;

  @media screen and (max-width: 768px) {
    padding: 8px 0px 8px 30px;
    border-top: 2px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: 2px solid hsla(0, 0%, 100%, 0.1);
    }

    svg {
      width: 15px;
      font-size: 10px;
      padding: 0px 5px 0px 0px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const SideNavbar = (props) => {
  const [list, setList] = useState({});

  const { media, setMedia } = props;
  const active = media.toString();

  const onClose = () => {
    setMedia(!media);
  };

  const onDisabled = (name) => {
    setList({ ...list, [name]: !list[name] });
  };

  useEffect(() => {
    setList(utils.setStatus(Menu));
  }, []);

  const renderData = (data) => {
    return _.map(data, (item, index) => (
      <>
        {item.isLeaf ? (
          <MediaChildren key={index} active={list[item.parent]}>
            <FontAwesomeCustom icon={item.icon} />

            <Link key={index} to={item.root} onClick={onClose}>
              {item.name}
            </Link>
          </MediaChildren>
        ) : (
          <MediaList key={index}>
            <FontAwesomeCustom icon={item.icon} />
            {!!item.children.length && <MediaChildrenArrow icon={faAngleDown} onClick={() => onDisabled(item.name)} active={list[item.name]} />}

            {!item.children.length ? (
              <Link to={item.root} onClick={onClose}>
                {item.name}
              </Link>
            ) : (
              <span>{item.name}</span>
            )}
          </MediaList>
        )}

        {item.children && renderData(item.children)}
      </>
    ));
  };

  return (
    <>
      <MediaBackdropFilter active={active} />
      <MediaNavbar active={active}>
        <MediaMenu>{renderData(Menu)}</MediaMenu>
      </MediaNavbar>
    </>
  );
};

export default SideNavbar;
