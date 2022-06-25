import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";

import { Menu } from "../../constant";

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
`;

const NavbarLogo = styled.h1`
  display: block;
  font-size: 20px;
  line-height: 20px;
  color: white;
`;

const NavbarMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
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
`;

const NavbarButton = styled.button`
  font-size: 14px;
  line-height: 14px;
  display: block;
  border: none;
  border-radius: 2.5px;
  padding: 5px 10px;
  background-color: rgba(194, 177, 185);
  color: white;

  &:hover {
    background-color: rgba(163, 151, 135);
  }

  transition: background-color 0.5s ease;
  cursor: pointer;
`;

const Navbar = () => {
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

  return (
    <NavbarContainer>
      <NavbarWrap>
        <NavbarLogo>BraveGirls</NavbarLogo>
        <NavbarMenu>{getElement()}</NavbarMenu>
      </NavbarWrap>
    </NavbarContainer>
  );
};

export default Navbar;
