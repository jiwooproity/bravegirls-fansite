import React, { useState } from "react";
import _ from "lodash";

import { Link, useLocation } from "react-router-dom";
import { Menu } from "constant";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { snsMenu } from "constant/Menu";
import { useEffect } from "react";
import { useCallback } from "react";

const NavbarContainer = styled.div`
  width: 100%;
  padding: 30px 15px;
  display: flex;
  justify-content: center;
  position: fixed;

  background-color: ${({ active }) => (active ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0)")};
  backdrop-filter: ${({ active }) => (active ? "blur(5px)" : "")};

  z-index: 3;

  transition: background-color 0.5s ease;
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
    color: rgba(0, 0, 0);
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
    color: rgba(0, 0, 0);

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
      color: rgba(0, 0, 0);

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

    transition: color 0.5s ease;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const NavbarButton = styled.button`
  font-size: 14px;
  line-height: 14px;
  display: block;
  border: none;
  border-radius: 2.5px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  transition: background-color 0.5s ease;
  cursor: pointer;
`;

const FontAwesomeCustom = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: ${({ active }) => (active ? "rgba(255, 255, 255)" : "rgba(0, 0, 0)")};
  cursor: pointer;

  z-index: 3;

  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }

  transition: color 0.5s ease;
`;

const SnSFontAwesomeCustom = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: rgba(0, 0, 0);
  cursor: pointer;

  z-index: 3;
`;

const MediaNavbar = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: ${({ active }) => (active ? "0px" : "-100%")};

  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);

  z-index: 2;

  transition: left 0.5s ease;
`;

const MediaMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const MediaList = styled.li`
  padding: 2px 0px;

  a {
    font-size: 20px;
    color: white;
    text-decoration: none;
    &:hover {
      color: rgba(251, 187, 98);
    }

    text-transform: uppercase;
  }
`;

const Navbar = () => {
  const [media, setMedia] = useState(false);
  const [scrollY, setScrollY] = useState(false);
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

  const getElement = (Menu) => {
    return _.map(Menu, (list, index) => {
      switch (list.type) {
        case "text":
          return (
            <NavbarList focus={pathname === list.root} key={index}>
              <Link to={list.root}>{list.name}</Link>
            </NavbarList>
          );
        case "button":
          return (
            <NavbarList key={index}>
              <NavbarButton>{list.name}</NavbarButton>
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

  const getMediaElement = () => {
    return _.map(Menu, (list, index) => {
      switch (list.type) {
        case "text":
          return (
            <MediaList key={index}>
              <Link to={list.root} onClick={() => setMedia(!media)}>
                {list.name}
              </Link>
            </MediaList>
          );
        case "button":
          return (
            <MediaList key={index}>
              <Link to={list.root} onClick={() => setMedia(!media)}>
                {list.name}
              </Link>
            </MediaList>
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
        <NavbarMenu>{getElement(snsMenu)}</NavbarMenu>
        <FontAwesomeCustom active={media} icon={faBars} onClick={() => setMedia(!media)} />
      </NavbarWrap>
      <MediaNavbar active={media}>
        <MediaMenu>{getMediaElement()}</MediaMenu>
      </MediaNavbar>
    </NavbarContainer>
  );
};

export default Navbar;
