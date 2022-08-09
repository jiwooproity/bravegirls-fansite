import styled from "styled-components";

const AlbumTrack = {};

AlbumTrack.Container = styled.div`
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 30px 0px 10px 0px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

AlbumTrack.Box = styled.div`
  width: 100%;
  padding: 0px 15px 0px 15px;

  display: flex;
  flex-direction: column;
`;

AlbumTrack.List = styled.div`
  width: 100%;
  padding: 15px 0px;

  display: grid;
  grid-template-columns: 2fr 1fr 3fr;

  border-top: 1px solid ${(props) => props.theme.trackListBorder};

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  transition: border-top 0.5s ease;
`;

AlbumTrack.Items = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:nth-child(1) {
    padding: 0px 15px 0px 0px;
  }

  &:nth-child(2) {
    padding: 0px 0px 0px 15px;
    border-left: 1px solid ${(props) => props.theme.trackListBorder};
  }

  transition: border-left 0.5s ease;
`;

AlbumTrack.TitleWrapper = styled.div`
  width: 100%;

  display: flex;
`;

AlbumTrack.Wrapper = styled.div`
  width: 990px;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.backgroundColor};

  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

AlbumTrack.MainTitle = styled.h1`
  padding: 20px 0px 30px 0px;

  font-size: 40px;
  line-height: 40px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 25px;
    line-height: 25px;
  }
`;

AlbumTrack.Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;

  color: ${(props) => props.theme.titleTextColor};
`;

AlbumTrack.Number = styled.p`
  padding: 0px 10px 0px 0px;

  font-size: 18px;
  font-weight: 700;
  line-height: 18px;

  color: ${(props) => props.theme.titleTextColor};

  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
  }
`;

AlbumTrack.SubTitle = styled.span`
  font-size: 20px;
  line-height: 20px;

  color: ${(props) => props.theme.desTextColor};

  @media screen and (max-width: 768px) {
    font-size: 18px;
    line-height: 18px;
  }
`;

AlbumTrack.Artists = styled.p`
  padding: 0px 0px 5px 0px;

  font-size: 12px;
  line-height: 12px;

  color: ${(props) => props.theme.desTextColor};

  @media screen and (max-width: 768px) {
    font-size: 10px;
    line-height: 10px;
  }
`;

export { AlbumTrack };
