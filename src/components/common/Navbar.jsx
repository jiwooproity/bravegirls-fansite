import React, { useState } from "react";
import _ from "lodash";

import { Link, useLocation } from "react-router-dom";
import { Menu } from "constant";

import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { snsMenu } from "constant/Menu";
import { useEffect } from "react";
import { useCallback } from "react";
import useStore from "hooks/useStore";
import SideNavbar from "./SideNavbar";

const NavbarContainer = styled.div`
  width: 100%;
  padding: 30px 15px;
  display: flex;
  justify-content: center;
  position: fixed;

  ${(props) =>
    css`
      background-color: ${({ active }) => (active ? props.theme.navbarBgColor : props.theme.navbarActiveColor)};
      backdrop-filter: ${({ active }) => (active ? "blur(5px)" : "")};
    `}

  z-index: 3;
`;

const NavbarWrap = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LeftWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavbarLogo = styled.h1`
  display: block;
  font-size: 25px;
  line-height: 25px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.navbarTextColor};
  }
`;

const NavbarMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavbarList = styled.li`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  padding: 0px 0px 0px 25px;

  a {
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

const MediaMenuButtonWrap = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

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

const SnSFontAwesomeCustom = styled(FontAwesomeIcon)`
  font-size: 20px;

  color: ${(props) => props.theme.navbarTextColor};

  cursor: pointer;

  z-index: 3;
`;

const ThemeButton = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: ${(props) => props.theme.navbarTextColor};
  cursor: pointer;
`;

const MediaList = styled.li`
  display: flex;
  align-items: center;

  a {
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

const Navbar = () => {
  const [media, setMedia] = useState(false);
  const [scrollY, setScrollY] = useState(false);
  const { themeStore } = useStore();
  const history = useLocation();

  const { pathname } = history;

  // eslint-disable-next-line
  useEffect(
    useCallback(() => {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY > 0);
      });
    }, []),
    [scrollY]
  );

  const setTheme = () => {
    themeStore.changeTheme();
  };

  const getElement = (Menu) => {
    return _.map(Menu, (list, index) => {
      switch (list.type) {
        case "text":
          return (
            <NavbarList focus={pathname === list.root} key={index}>
              <Link to={list.root}>{list.name}</Link>
            </NavbarList>
          );
        case "icon":
          return (
            <NavbarList key={index}>
              <a href={list.root} target={"_blank"} rel="noreferrer">
                <SnSFontAwesomeCustom icon={list.icon} />
              </a>
            </NavbarList>
          );
        default:
          break;
      }
    });
  };

  return (
    <NavbarContainer active={scrollY}>
      <NavbarWrap>
        <NavbarLogo>
          <LeftWrap>
            <Link to={"/"}>BRAVEGIRLS</Link>
            <NavbarMenu>{getElement(Menu)}</NavbarMenu>
          </LeftWrap>
        </NavbarLogo>
        <NavbarMenu>
          <MediaList>
            <ThemeButton onClick={setTheme} icon={themeStore.theme ? faMoon : faSun} />
          </MediaList>
          {getElement(snsMenu)}
        </NavbarMenu>
        <MediaMenuButtonWrap>
          <FontAwesomeCustom setting={themeStore.theme.toString()} active={media.toString()} icon={themeStore.theme ? faMoon : faSun} onClick={setTheme} />
          <FontAwesomeCustom setting={themeStore.theme.toString()} active={media.toString()} icon={faBars} onClick={() => setMedia(!media)} />
        </MediaMenuButtonWrap>
      </NavbarWrap>
      <SideNavbar media={media} setMedia={setMedia} />
    </NavbarContainer>
  );
};

export default Navbar;
