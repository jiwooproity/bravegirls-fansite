import React from "react";
import styled, { css } from "styled-components";

import _ from "lodash";

const TabContainer = styled.div`
  width: 990px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px 15px;
  }

  z-index: 1;
`;

const TabWrapper = styled.div`
  width: 100%;

  margin: 30px 0px 0px 0px;

  display: flex;

  position: relative;

  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;

    margin: 30px 0px 30px 0px;
  }
`;

const MemberTabsBar = styled.div`
  width: calc(100% / 4);
  height: 36px;

  position: absolute;
  top: 0;
  left: ${({ active }) => `calc(100% / 4 * ${active})`};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background: ${({ linear }) => linear};
  opacity: ${({ timing }) => (timing === "true" ? "1" : "0")};

  object-fit: cover;

  z-index: -1;

  border-radius: 10px;

  transition: opacity 0.3s ease-in-out, left 0.5s ease-in-out;

  @media screen and (max-width: 768px) {
    height: 29px;
  }
`;

const MemberTabs = styled.span`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  padding: 5px 8px;
  color: ${(props) => props.theme.titleTextColor};

  text-align: center;

  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 13px;
  }

  ${({ active }) =>
    active &&
    css`
      color: rgba(54, 54, 54);
    `}

  transition: color 0.5s ease, background-color 0.5s ease;
`;

const MemberTab = (props) => {
  const { data, list, selectValue, timing, linear, func } = props;

  return (
    <TabContainer>
      <TabWrapper>
        {!_.isEmpty(data) && <MemberTabsBar timing={timing ? "true" : "false"} linear={linear} active={selectValue} />}
        {_.map(list, (tab, index) => (
          <MemberTabs active={selectValue === tab.id} key={index} onClick={() => func.onSelect(tab.id)}>
            {tab.name}
          </MemberTabs>
        ))}
      </TabWrapper>
    </TabContainer>
  );
};

export default MemberTab;
