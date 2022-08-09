import styled from "styled-components";

const Album = {};

Album.DarkMode = styled.div`
  width: 100%;
  height: 500px;

  position: absolute;
  top: 0px;
  left: 0px;

  overflow: hidden;
  opacity: ${({ active }) => (active ? "1" : "0")};

  @media screen and (max-width: 768px) {
    height: 500px;
  }
`;

Album.BackdropImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;
  position: absolute;
  top: 0px;
  left: 0px;

  object-fit: cover;
  transform: scale(30);
  z-index: 0;
`;

Album.BackdropColor = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0px;
  left: 0px;

  backdrop-filter: blur(150px);
  z-index: 1;

  background: ${({ theme }) =>
    `linear-gradient(180deg, hsla(0, 0%, 100%, 0), ${theme.backgroundColor})`};
  background-color: ${({ active }) => (active ? "rgba(54, 54, 54, 0.5)" : "")};
`;

Album.Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);
  padding: 0px 15px 30px 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0px 15px 30px 15px;
  }
`;

export { Album };
