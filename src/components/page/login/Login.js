import React, { useState } from "react";
import { Fade } from "react-reveal";
import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  padding: 30px;

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

  color: rgba(54, 54, 54);

  @media screen and (max-width: 768px) {
    font-size: 10vw;
    line-height: 10vw;
  }
`;

const LoginBoxInputWrap = styled.div`
  width: 400px;
`;

const LoginBoxInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 12px;

  margin: 20px 0px 0px 0px;

  border: none;
  border-radius: 0px;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(54, 54, 54, 0.1);

  color: rgba(54, 54, 54);

  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(54, 54, 54, 0.5);
  }

  &:hover {
    border-bottom: 1px solid rgba(54, 54, 54, 0.5);
  }

  transition: border-bottom 0.5s ease;
`;

const LoginBoxButton = styled.button`
  width: 100%;

  font-size: 15px;
  font-weight: 700;

  margin: 20px 0px 0px 0px;
  padding: 8px 10px;

  border: none;

  color: white;
  background-color: rgba(54, 54, 54);

  &:hover {
    background-color: rgba(0, 0, 0);
  }

  cursor: pointer;
  transition: background-color 0.5s ease;
`;

const LoginBoxRegisterDes = styled.span`
  font-size: 11px;

  padding: 10px 0px 0px 0px;

  display: flex;

  color: rgba(54, 54, 54);
`;

const LoginBoxRegister = styled.a`
  font-size: 11px;

  margin-left: 5px;

  display: block;

  color: rgba(54, 54, 54);
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
      <LoginBox>
        <LoginBoxWrapper>
          <Fade bottom>
            <LoginBoxTitle>Hello! Fearless</LoginBoxTitle>
          </Fade>
          <LoginBoxInputWrap>
            <LoginBoxInput type={"text"} name="address" placeholder="@ 이메일을 입력해주세요." value={inputData.address} onChange={onChangeInput} />
            <LoginBoxInput type={"password"} name="password" placeholder="* 비밀번호를 입력해주세요." value={inputData.password} onChange={onChangeInput} />
            <LoginBoxButton>로그인</LoginBoxButton>
            <LoginBoxRegisterDes>
              아직 아이디가 없으신가요?<LoginBoxRegister>회원가입</LoginBoxRegister>
            </LoginBoxRegisterDes>
          </LoginBoxInputWrap>
        </LoginBoxWrapper>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
