import React, { useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import { useStore } from "hooks";
import { utils } from "util";

const LoginWrap = styled.div`
  padding: 0px 0px 0px 25px;

  display: flex;
  align-items: center;

  position: relative;

  a {
    font-size: 15px;
    line-height: 15px;
    font-weight: 600;
    text-decoration: none;
    color: ${(props) => props.theme.navbarTextColor};
  }
`;

const LoginProfile = styled.img`
  width: 25px;
  height: 25px;

  border-radius: 50%;
`;

const LoginStatus = styled.div`
  width: 250px;
  padding: 15px 15px 0px 15px;

  position: absolute;
  top: 45px;
  right: 10px;

  background-color: ${(props) => props.theme.backgroundColor};

  display: ${({ active }) => (active ? "block" : "none")};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &::after {
    position: absolute;
    top: -15px;
    right: 0px;
    transform: translate(-50%, -50%);
    content: "";
    height: 0;
    z-index: 2;
    border-bottom: 15px solid;
    border-left: 15px solid rgba(0, 0, 0, 0);
    color: ${(props) => props.theme.backgroundColor};
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);

    transition: color 0.5s ease;
  }
`;

const ProfileBox = styled.div`
  width: 100%;
  display: flex;

  &:nth-child(1) {
    padding: 0px 0px 15px 0px;
  }
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;

  &:nth-child(2) {
    padding: 2px 0px 0px 10px;
  }
`;

const ProfileDetailImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileNickname = styled.span`
  font-size: 15px;
  line-height: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.navbarTextColor};
`;

const ProfileLevel = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: 600;
  padding: 4px 0px 0px 0px;
  color: ${(props) => props.theme.navbarTextColor};
`;

const ProfileList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProfileItem = styled.span`
  font-size: 13px;
  line-height: 13px;
  font-weight: 600;
  padding: 12px 0px 12px 0px;
  border-top: 1px solid ${(props) => props.theme.inputBottomColor};
  color: ${(props) => props.theme.navbarTextColor};
  cursor: pointer;
`;

const CustomFont = styled(FontAwesomeIcon)`
  font-size: 13px;
  line-height: 13px;
  font-weight: 600;
  padding: 0px 8px 0px 0px;
  color: ${(props) => props.theme.navbarTextColor};
`;

const LoginForm = () => {
  const { loginStore } = useStore();
  const [active, setActive] = useState(false);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      utils.onLogout();
      loginStore.setLogout();
    }
  };

  useEffect(() => {
    !sessionStorage.getItem("login.token") && setActive(false);
  }, [loginStore.login]);

  return useObserver(() => {
    const login = loginStore.login;

    return (
      <LoginWrap>
        {login ? (
          <>
            <LoginProfile src={sessionStorage.getItem("login.profile")} onClick={() => setActive(!active)} />
            <LoginStatus active={active}>
              <ProfileBox>
                <ProfileDetail>
                  <ProfileDetailImage src={sessionStorage.getItem("login.profile")} />
                </ProfileDetail>
                <ProfileDetail>
                  <ProfileNickname>{sessionStorage.getItem("login.nickname")}</ProfileNickname>
                  <ProfileLevel>{`LEVEL: ${sessionStorage.getItem("login.level")}`}</ProfileLevel>
                </ProfileDetail>
              </ProfileBox>
              <ProfileBox>
                <ProfileList>
                  <ProfileItem>
                    <CustomFont icon={faGear}></CustomFont>내 계정관리
                  </ProfileItem>
                  <ProfileItem onClick={logout}>
                    <CustomFont icon={faRightFromBracket}></CustomFont>로그아웃
                  </ProfileItem>
                </ProfileList>
              </ProfileBox>
            </LoginStatus>
          </>
        ) : (
          <Link to="/login">{"로그인"}</Link>
        )}
      </LoginWrap>
    );
  });
};

export default LoginForm;
