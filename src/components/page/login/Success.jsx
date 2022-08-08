import React from "react";
import { useEffect } from "react";
import { Fade } from "react-reveal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SuccessContainer = styled.div`
  width: 100%;
  height: 100vh;

  padding: 30px 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessTitle = styled.h1`
  font-size: 50px;
  line-height: 50px;

  margin-bottom: 100px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 10vw;
    line-height: 10vw;
  }
`;

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SuccessContainer>
        <Fade bottom>
          <SuccessTitle>{sessionStorage.getItem("login.nickname")}님 환영합니다.</SuccessTitle>
        </Fade>
      </SuccessContainer>
    </>
  );
};

export default Success;
