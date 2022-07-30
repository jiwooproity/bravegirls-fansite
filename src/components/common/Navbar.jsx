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
import { utils } from "util/utils";

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

  margin: 0px 0px 0px 12.5px;

  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

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

const NavbarList = styled.li`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;

  padding: 0px 12.5px 0px 12.5px;

  position: relative;

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

const NavbarChildrenTitle = styled.span`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  cursor: pointer;

  color: ${(props) => props.theme.navbarTextColor};
`;

const NavbarChildrenList = styled.ul`
  display: ${({ active }) => (active ? "flex" : "none")};
  position: absolute;
  list-style: none;

  padding: 10px 15px;

  top: 30px;
  left: calc(50%);

  transform: translateX(-50%);

  background-color: white;

  &::after {
    position: absolute;
    top: -10px;
    left: calc(50% - 10px);
    transform: translate(-50%, -50%);
    content: "";
    height: 0;
    z-index: -1;
    border-bottom: 10px solid;
    border-left: 10px solid rgba(0, 0, 0, 0);
    border-right: 10px solid rgba(0, 0, 0, 0);
    color: white;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }

  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.1) -5px -5px 15px 0px, rgba(0, 0, 0, 0.1) 0px 8px 16px -0px;
`;

const NavbarChildrenItem = styled.li`
  font-size: 12px;

  padding: 5px 5px;

  #children {
    text-decoration: none;
    white-space: nowrap;

    color: rgb(0, 0, 0);

    position: relative;

    &::before {
      content: "";
      width: ${({ focus }) => (focus ? "100%" : "0px")};
      height: 4px;

      position: absolute;
      top: 50%;

      z-index: -1;

      background-color: rgb(254, 187, 108);

      transition: width 0.5s ease;
    }

    &:hover {
      color: rgb(0, 0, 0);

      &::before {
        content: "";
        width: 100%;
        height: 6px;

        position: absolute;
        top: 50%;

        z-index: -1;

        background-color: rgb(254, 187, 108);
      }
    }
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
  const [list, setList] = useState({});
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

  useEffect(() => {
    setList(utils.setStatus(Menu));
  }, []);

  const setTheme = () => {
    themeStore.changeTheme();
  };

  const onDisabled = (name) => {
    let status = {};

    _.forEach(list, (item) => {
      item = false;

      status = {
        ...status,
        [item]: false,
      };
    });

    setList({ ...status, [name]: !list[name] });
  };

  const getElement = (Menu) =>
    _.map(Menu, (list, index) => (
      <SnsNavbarList key={index}>
        <a href={list.root} target={"_blank"} rel="noreferrer">
          <SnSFontAwesomeCustom icon={list.icon} />
        </a>
      </SnsNavbarList>
    ));

  const renderData = (data) => {
    const nowLocation = (root) => {
      return pathname === root;
    };

    return _.map(data, (item, index) => (
      <>
        {item.isLeaf ? (
          <NavbarChildrenItem key={index} focus={nowLocation(item.root)}>
            <Link id="children" to={item.root} onClick={() => onDisabled(item.parent)}>
              {item.name}
            </Link>
          </NavbarChildrenItem>
        ) : (
          <NavbarList key={index} focus={nowLocation(item.root)}>
            {_.isEmpty(item.children) ? (
              <Link id="parent" to={item.root} onClick={() => onDisabled(item.name)}>
                {item.name}
              </Link>
            ) : (
              <>
                <NavbarChildrenTitle onClick={() => onDisabled(item.name)}>{item.name}</NavbarChildrenTitle>
                <NavbarChildrenList active={list[item.name]}>{item.children && renderData(item.children)}</NavbarChildrenList>
              </>
            )}
          </NavbarList>
        )}
      </>
    ));
  };

  return (
    <NavbarContainer active={scrollY}>
      <NavbarWrap>
        <NavbarLogo>
          <LeftWrap>
            <Link to={"/"}>BRAVEGIRLS</Link>
            <NavbarMenu>{renderData(Menu)}</NavbarMenu>
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
