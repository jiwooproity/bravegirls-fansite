import React, { useState } from "react";
import _ from "lodash";

import { Link } from "react-router-dom";
import { Menu } from "constant";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavbarContainer = styled.div`
  width: 100%;
  padding: 30px 30px;
  display: flex;
  justify-content: center;
  position: absolute;

  z-index: 2;
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

const NavbarLogo = styled.h1`
  display: block;
  font-size: 20px;
  line-height: 20px;

  a {
    text-decoration: none;
    color: white;
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
  font-size: 14px;
  line-height: 14px;
  padding: 0px 0px 0px 10px;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: rgba(251, 187, 98);
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
  color: white;
  cursor: pointer;

  z-index: 1;

  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
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

  const getElement = () => {
    return _.map(Menu, (list, index) => {
      switch (list.type) {
        case "text":
          return (
            <NavbarList key={index}>
              <Link to={list.root}>{list.name}</Link>
            </NavbarList>
          );
        case "button":
          return (
            <NavbarList key={index}>
              <NavbarButton>{list.name}</NavbarButton>
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
    <NavbarContainer>
      <NavbarWrap>
        <NavbarLogo>
          <Link to={"/"}>BraveGirls</Link>
        </NavbarLogo>
        <NavbarMenu>{getElement()}</NavbarMenu>
        <FontAwesomeCustom icon={faBars} onClick={() => setMedia(!media)} />
      </NavbarWrap>
      <MediaNavbar active={media}>
        <MediaMenu>{getMediaElement()}</MediaMenu>
      </MediaNavbar>
    </NavbarContainer>
  );
};

export default Navbar;
