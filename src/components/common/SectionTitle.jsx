import React from "react";
import styled from "styled-components";

const CardSectionTitleWrapper = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardSectionLeft = styled.div``;

const CardSectionTitle = styled.h1`
  font-size: 15px;
  color: rgba(194, 177, 155);
`;

const CardSectionSubTitle = styled.h1`
  font-size: 13px;
  line-height: 13px;
  padding-top: 5px;
  color: rgb(40, 40, 40);
`;

const CardSectionRight = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SectionTitle = (props) => {
  const { title, subTitle } = props;
  const { children } = props;

  return (
    <CardSectionTitleWrapper>
      <CardSectionLeft>
        <CardSectionTitle>{title}</CardSectionTitle>
        <CardSectionSubTitle>{subTitle}</CardSectionSubTitle>
      </CardSectionLeft>

      {children && <CardSectionRight>{children}</CardSectionRight>}
    </CardSectionTitleWrapper>
  );
};

export default SectionTitle;
