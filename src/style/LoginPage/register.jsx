import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Register = {};

Register.Container = styled.div`
  width: 100%;
  height: 100vh;

  padding: 30px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

Register.Box = styled.div`
  padding: 30px;

  position: relative;

  border-radius: 5px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0px;
  }
`;

Register.InputWrap = styled.div`
  width: 400px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

Register.InputGrid = styled.div`
  display: grid;
  padding: 20px 0px 0px 0px;
  grid-template-columns: 5fr 1fr;
  gap: 15px;
`;

Register.InputBox = styled.div`
  padding: 20px 0px 0px 0px;
`;

Register.Button = styled.button`
  font-size: 12px;
  line-height: 12px;
  font-weight: 200;
  border: none;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.backgroundOpacityColor};
  color: ${({ theme }) => theme.backgroundColor};
  cursor: pointer;
`;

Register.CheckWrap = styled.div`
  position: relative;
`;

Register.Timer = styled.span`
  font-size: 12px;
  line-height: 12px;

  position: absolute;
  top: 50%;
  right: 0;

  transform: translateY(-50%);

  color: red;
`;

Register.Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 12px;

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

Register.Submit = styled.button`
  width: 100%;

  font-size: 15px;
  font-weight: 400;

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

Register.Icon = styled(FontAwesomeIcon)`
  font-size: 12px;
  line-height: 12px;

  position: absolute;
  top: 50%;
  right: 2px;

  transform: translateY(-50%);

  color: ${({ status }) => (status ? "green" : "red")};
  opacity: ${({ visible }) => (visible ? "1" : "0")};
`;

Register.ProfileWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 0px 30px 0px;
`;

Register.ProfileLayout = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

Register.ProfileBackdrop = styled.label`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.5s ease;
  cursor: pointer;
`;

Register.ProfileText = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;

  color: white;
`;

Register.Profile = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  display: block;
`;

Register.FileInput = styled.input`
  display: none;
`;

export { Register };
