import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import styled from "styled-components";

import { Menu } from "../../constant";

const NavbarContainer = styled.div`
  width: 100%;
  padding: 15px 25px;
  background-color: rgba(0, 0, 0, 0.9);
`;

const NavbarWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLogo = styled.h1`
  display: block;
  font-size: 20px;
  color: white;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
`;

const NavbarList = styled.li`
  padding: 0px 0px 0px 10px;

  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: yellow;
    }
  }
`;

const Navbar = () => {
  const getElement = () => {
    return _.map(Menu, (list, index) => (
      <NavbarList key={index}>
        <Link to={list.root}>{list.name}</Link>
      </NavbarList>
    ));
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
