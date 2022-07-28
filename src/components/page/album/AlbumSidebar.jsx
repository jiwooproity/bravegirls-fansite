import React from "react";
import styled from "styled-components";

import _ from "lodash";

const AlbumSidebarContainer = styled.div`
  width: 400px;
  height: 100vh;

  position: fixed;
  top: 0;
  right: 0;

  background-color: black;
`;

const AlbumSidebar = (props) => {
  const { data } = props;
  console.log(data);

  return <AlbumSidebarContainer></AlbumSidebarContainer>;
};

export default AlbumSidebar;
