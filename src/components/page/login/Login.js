import React, { useState } from "react";
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

  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginBoxWrapper = styled.div`
  width: 350px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const LoginBoxTitle = styled.h1`
  font-size: 30px;
  line-height: 30px;

  margin-bottom: 15px;

  color: rgba(54, 54, 54);
`;

const LoginBoxInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 12px;

  margin: 20px 0px 0px 0px;

  border: none;
  border-bottom: 1px solid rgba(54, 54, 54);
  background-color: transparent;

  color: rgba(54, 54, 54);

  &:focus {
    outline: none;
  }
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
          <LoginBoxTitle>Hello, Fearless</LoginBoxTitle>
          <LoginBoxInput type={"text"} name="address" placeholder="이메일을 입력해주세요." value={inputData.address} onChange={onChangeInput} />
          <LoginBoxInput type={"password"} name="password" placeholder="비밀번호를 입력해주세요." value={inputData.password} onChange={onChangeInput} />
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
