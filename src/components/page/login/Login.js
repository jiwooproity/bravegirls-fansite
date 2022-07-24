import React, { useState } from "react";
import styled from "styled-components";

import loginBackground from "static/img/bravegirls_first.jpg";

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const LoginBackground = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;

  filter: grayscale(20%);
`;

const LoginWhiteFilter = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: rgba(255, 255, 255, 0.2);
`;

const LoginBox = styled.div`
  padding: 30px;

  position: relative;

  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
`;

const LoginBoxWrapper = styled.div`
  width: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginBoxTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;

  color: rgba(255, 255, 255, 0.8);
`;

const LoginBoxInput = styled.input`
  width: 100%;
  height: 30px;

  margin: 20px 0px 0px 0px;

  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  background-color: transparent;

  color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
  }
`;

const LoginBoxButton = styled.button`
  width: 100%;

  font-size: 15px;
  font-weight: 700;

  margin: 20px 0px 0px 0px;
  padding: 5px 10px;

  border: none;

  color: rgba(20, 20, 20, 0.8);
  background-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }

  cursor: pointer;
  transition: background-color 0.5s ease;
`;

const LoginBoxRegisterDes = styled.span`
  font-size: 11px;

  padding: 10px 0px 0px 0px;

  display: flex;

  color: rgba(255, 255, 255, 0.8);
`;

const LoginBoxRegister = styled.a`
  font-size: 11px;

  margin-left: 5px;

  display: block;

  color: rgba(255, 255, 255, 0.8);
`;

const Login = () => {
  const [inputData, setInputData] = useState({
    address: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  return (
    <LoginContainer>
      <LoginBackground src={loginBackground} />
      <LoginWhiteFilter />

      <LoginBox>
        <LoginBoxWrapper>
          <LoginBoxTitle>Hello, Fearless</LoginBoxTitle>
          <LoginBoxInput type={"text"} name="address" placeholder="Enter Address" value={inputData.address} onChange={onChangeInput} />
          <LoginBoxInput type={"password"} name="password" placeholder="Password" value={inputData.password} onChange={onChangeInput} />
          <LoginBoxButton>로그인</LoginBoxButton>
          <LoginBoxRegisterDes>
            아직 아이디가 없으신가요?<LoginBoxRegister>회원가입</LoginBoxRegister>
          </LoginBoxRegisterDes>
        </LoginBoxWrapper>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
