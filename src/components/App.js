import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useObserver } from "mobx-react";

import styled, { ThemeProvider } from "styled-components";

import { Main, Member, Album, Video, Login, VideoDetail, Canvas } from ".";
import { Navbar, Footer } from "components";
import { Url } from "../constant";
import { theme } from "style/Theme";

import useStore from "hooks/useStore";

const MainContainer = styled.div`
  width: 100%;

  background-color: ${(props) => props.theme.backgroundColor};
`;

const App = () => {
  const { themeStore } = useStore();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      themeStore.setLocalData(localStorage.getItem("theme") === "false");
    }
    // eslint-disable-next-line
  }, []);

  return useObserver(() => {
    const { lightTheme, darkTheme } = theme;
    const colorData = themeStore.theme;

    const getTheme = () => {
      return colorData ? darkTheme : lightTheme;
    };

    return (
      <BrowserRouter>
        <ThemeProvider theme={getTheme()}>
          <MainContainer>
            <Navbar />
            <Routes>
              <Route path={`${Url.ROOT}`} element={<Main />} />
              <Route path={`${Url.MEMBER}`} element={<Member />} />
              <Route path={`${Url.ALBUM}`} element={<Album />} />
              <Route path={`${Url.MUSIC}`} element={<Video />} />
              <Route path={`${Url.MUSIC}/:videoId`} element={<VideoDetail />} />
              <Route path={`${Url.QUEENDOM}`} element={<Video />} />
              <Route path={`${Url.QUEENDOM}/:videoId`} element={<VideoDetail />} />
              <Route path={`${Url.BGCLIP}`} element={<Video />} />
              <Route path={`${Url.BGCLIP}/:videoId`} element={<VideoDetail />} />
              <Route path={`${Url.CANVAS}`} element={<Canvas />} />
              <Route path={`${Url.LOGIN}`} element={<Login />} />
              <Route path={`*`} element={<Main />} />
            </Routes>
            <Footer />
          </MainContainer>
        </ThemeProvider>
      </BrowserRouter>
    );
  });
};

export default App;
