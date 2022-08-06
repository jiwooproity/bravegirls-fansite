import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import _ from "lodash";

import { Top } from "components";

import { canvasService } from "service/canvasService";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

const BoardContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 85px);

  padding: 0px 15px 30px 15px;

  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  width: 990px;
`;

const ArtContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }
`;

const ArtWrapper = styled.div`
  width: 100%;

  ${({ active, start, end }) =>
    active &&
    css`
      grid-row-start: ${start};
      grid-row-end: ${end};
    `};
`;

const ArtImageWrapper = styled.div`
  width: 100%;
  border-radius: 2px;
  position: relative;
  padding-bottom: ${({ active }) => (active ? "131.5%" : "65%")};
  overflow: hidden;

  @media screen and (max-width: 768px) {
    padding-bottom: ${({ active }) => (active ? "133%" : "65%")};
  }
`;

const ArtImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: block;
`;

const ArtImageBackdrop = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);

    h1 {
      opacity: 1;
    }
  }
`;

const ArtTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;

  opacity: 0;

  transition: opacity 0.5s ease;

  color: white;
`;

const CanvasBoard = () => {
  const [canvasList, setCanvasList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    setLoading(false);
    const canvasArr = [];
    const response = await canvasService.canvasList();
    let img = new Image();

    _.forEach(response, (res, index) => {
      img.src = res.canvas_art;

      canvasArr.push({
        id: res.canvas_idx,
        art: res.canvas_art,
        title: res.canvas_title,
        vertical: res.canvas_vertical,
        start: Math.round(index / 3),
        end: Math.round(index / 3) + 2,
      });
    });

    setCanvasList(canvasArr);
    setLoading(true);
  };

  return (
    <>
      <Top />
      <BoardContainer>
        {loading ? (
          <BoardWrapper>
            <ArtContainer>
              {_.map(canvasList, (canvas, index) => (
                <ArtWrapper active={canvas.vertical} start={canvas.start} end={canvas.end} key={index}>
                  <Fade bottom>
                    <Link to={`/canvas/board/${canvas.id}`}>
                      <ArtImageWrapper active={canvas.vertical}>
                        <ArtImage src={canvas.art} />
                        <ArtImageBackdrop>
                          <ArtTitle>{canvas.title}</ArtTitle>
                        </ArtImageBackdrop>
                      </ArtImageWrapper>
                    </Link>
                  </Fade>
                </ArtWrapper>
              ))}
            </ArtContainer>
          </BoardWrapper>
        ) : null}
      </BoardContainer>
    </>
  );
};

export default CanvasBoard;
