import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styled from "styled-components";

import { Main, Member, PhotoCardPage, Album } from ".";
import { Navbar } from "components";
import { Url } from "../constant";
import Footer from "./common/Footer";

const MainContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <MainContainer>
        <Navbar />
        <Routes>
          <Route path={`${Url.ROOT}`} element={<Main />} />
          <Route path={`${Url.MEMBER}`} element={<Member />} />
          <Route path={`${Url.ALBUM}`} element={<Album />} />
          <Route path={`${Url.PHOTOCARD}`} element={<PhotoCardPage />} />
        </Routes>
        <Footer />
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
