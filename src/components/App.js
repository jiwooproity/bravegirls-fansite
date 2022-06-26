import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import styled from "styled-components";

import { Main, PhotoCardPage } from "./page";
import { Navbar } from "./common";
import { Url } from "../constant";

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
          <Route path={`${Url.PHOTOCARD}`} element={<PhotoCardPage />} />
        </Routes>
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
