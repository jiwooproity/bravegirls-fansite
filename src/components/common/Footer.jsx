import React from "react";

import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  height: 200px;

  background-color: ${(props) => props.theme.footerBgColor};
`;

const Footer = () => {
  return <FooterContainer />;
};

export default Footer;
