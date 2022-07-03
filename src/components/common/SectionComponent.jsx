import React from "react";

import styled from "styled-components";

const SectionContent = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "990px")};
  padding: ${({ padding }) => (padding ? padding : "0px 0px 0px 0px")};
`;

const SectionTitleWrap = styled.div`
  width: 100%;
  padding: 0px 0px 30px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  color: ${({ color }) => (color ? color : "none")};
`;

const SectionTitle = styled.h1`
  font-size: 30px;
`;

const SectionSpan = styled.span`
  font-size: 30px;
  font-weight: 400;
`;

const SectionSubTitle = styled.p`
  font-size: 12px;
  font-weight: 100;
`;

const SectionComponent = (props) => {
  const { title, subTitle, active } = props;
  const { width, padding, color, children } = props;

  return (
    <SectionContent width={width} padding={padding}>
      <SectionTitleWrap color={color}>
        <SectionTitle>
          {title && <SectionSpan>{title}</SectionSpan>} {active}
          {subTitle && <SectionSubTitle>{subTitle}</SectionSubTitle>}
        </SectionTitle>
      </SectionTitleWrap>
      {children}
    </SectionContent>
  );
};

export default SectionComponent;
