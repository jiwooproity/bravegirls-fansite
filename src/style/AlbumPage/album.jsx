import styled from "styled-components";

const DarkThemeMode = styled.div`
  width: 100%;
  height: 500px;

  opacity: ${({ active }) => (active === "true" ? "1" : "0")};

  position: absolute;
  top: 0;
  left: 0;

  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: 500px;
  }

  transition: opacity 1s ease;
`;

const DarkThemeImage = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;

  transform: scale(30);

  z-index: 0;
`;

const DarkThemeBackdrop = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: ${(props) =>
    `linear-gradient(180deg, hsla(0, 0%, 100%, 0), ${props.theme.backgroundColor})`};

  background-color: ${({ active }) =>
    active === "true" ? "rgba(54, 54, 54, 0.5)" : ""};
  backdrop-filter: blur(150px);

  z-index: 1;
`;

const AlbumContainer = styled.div`
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

export { DarkThemeMode, DarkThemeImage, DarkThemeBackdrop, AlbumContainer };
