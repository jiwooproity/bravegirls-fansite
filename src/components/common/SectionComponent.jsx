import React from "react";
import _ from "lodash";

import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  padding: 10px 0px;
  margin: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionWrap = styled.div`
  width: 990px;
  margin: 0px 0px 15px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionContent = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "990px")};
`;

const Tag = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: rgba(194, 177, 185);
  color: white;
  cursor: pointer;
`;

const LeftSide = styled.div``;

const Title = styled.h1`
  font-size: 15px;
  color: rgba(194, 177, 155);
`;

const SubTitle = styled.h1`
  font-size: 13px;
  line-height: 13px;
  padding-top: 5px;
  color: rgb(40, 40, 40);
`;

const RightSide = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SectionComponent = (props) => {
  const { title, subTitle } = props;
  const { tag } = props;
  const { width, children } = props;

  return (
    <Section>
      <SectionWrap>
        {title && subTitle && (
          <LeftSide>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
          </LeftSide>
        )}

        {tag ? (
          <RightSide>
            {_.map(tag, (item, index) => (
              <a key={index} href={item.url} target={"_blank"} rel="noreferrer">
                <Tag>{item.label}</Tag>
              </a>
            ))}
          </RightSide>
        ) : null}
      </SectionWrap>
      <SectionContent width={width}>{children}</SectionContent>
    </Section>
  );
};

export default SectionComponent;
