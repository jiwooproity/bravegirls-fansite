import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";

import styled from "styled-components";
import _ from "lodash";

import { userService } from "services";
import { useStore } from "hooks";
import { utils } from "util";

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  padding: 30px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const LoginBox = styled.div`
  padding: 30px;

  position: relative;

  border-radius: 5px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`;

const LoginBoxWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginBoxTitle = styled.h1`
  font-size: 100px;
  line-height: 100px;

  margin-bottom: 100px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 10vw;
    line-height: 10vw;
  }
`;

const LoginBoxInputWrap = styled.div`
  width: 400px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginErrorText = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: rgba(219, 68, 85, 1);
`;

const LoginBoxInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 12px;

  margin: 20px 0px 0px 0px;
  padding: 2px 0px;

  border: none;
  border-radius: 0px;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ status, theme }) => (status ? "rgba(219, 68, 85, 0.5)" : theme.inputBottomColor)};

  color: ${(props) => props.theme.titleTextColor};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  &:hover {
    border-bottom: 1px solid ${(props) => props.theme.inputBottomActiveColor};
  }

  transition: border 0.5s ease;
`;

const LoginBoxButton = styled.button`
  width: 100%;

  font-size: 15px;
  font-weight: 700;

  margin: 20px 0px 0px 0px;
  padding: 8px 10px;

  border: none;

  color: ${(props) => props.theme.diffTitleTextColor};
  background-color: ${(props) => props.theme.backgroundOpacityColor};

  &:hover {
    background-color: ${(props) => props.theme.black};
  }

  transition: background-color 0.5s ease;
  cursor: pointer;
`;

const LoginBoxRegisterDes = styled.span`
  font-size: 11px;

  padding: 10px 0px 0px 0px;

  display: flex;

  color: ${(props) => props.theme.titleTextColor};

  a {
    font-size: 11px;
    text-decoration: none;
  }
`;

const LoginBoxRegister = styled.div`
  a {
    font-size: 11px;

    margin-left: 5px;

    display: block;

    color: ${(props) => props.theme.titleTextColor};
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const { loginStore, toastStore } = useStore();

  const [status, setStatus] = useState({
    message: "",
    show: false,
  });

  const [inputData, setInputData] = useState({
    address: "",
    password: "",
  });

  useEffect(() => {
    utils.onScrollTop();
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: value,
    });

    setStatus({
      message: "",
      show: false,
    });
  };

  const onLogin = async () => {
    const isAddress = _.isEmpty(inputData.address);
    const isPassword = _.isEmpty(inputData.password);

    if (isAddress || isPassword) {
      toastStore.showToast({ status: 2, msg: "로그인 정보를 모두 입력해 주세요." });
    } else {
      const params = {
        userId: inputData.address,
        password: inputData.password,
      };

      const { status, detail, userInfo } = await userService.userList({ data: params });

      switch (status) {
        case 404:
          setStatus({ message: detail, show: true });
          toastStore.showToast({ status: 1, msg: detail });
          break;
        case 200:
          sessionStorage.setItem("login.nickname", userInfo.nickname);
          sessionStorage.setItem("login.profile", userInfo.profile);
          sessionStorage.setItem("login.level", userInfo.level);
          sessionStorage.setItem("login.token", userInfo.token);
          navigate("/success");
          loginStore.setLogin();
          toastStore.showToast({ status: 0, msg: `${userInfo.nickname}님 환영합니다.` });
          break;
        default:
          break;
      }
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginBoxWrapper>
          <Fade bottom>
            <LoginBoxTitle>Hello! Fearless</LoginBoxTitle>
          </Fade>
          <LoginBoxInputWrap>
            {status.show && <LoginErrorText>{status.message}</LoginErrorText>}
            <LoginBoxInput type={"text"} name="address" status={status.show} placeholder="아이디" value={inputData.address} onChange={onChangeInput} />
            <LoginBoxInput type={"password"} name="password" placeholder="비밀번호" value={inputData.password} onChange={onChangeInput} />
            <LoginBoxButton onClick={onLogin}>로그인</LoginBoxButton>
            <LoginBoxRegisterDes>
              아직 아이디가 없으신가요?
              <LoginBoxRegister>
                <Link to={"/register"}>회원가입</Link>
              </LoginBoxRegister>
            </LoginBoxRegisterDes>
          </LoginBoxInputWrap>
        </LoginBoxWrapper>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
