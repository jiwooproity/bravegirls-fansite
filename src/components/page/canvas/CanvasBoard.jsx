import React, { useState, useEffect } from "react";

import _ from "lodash";

import { Top } from "components";

import { canvasService } from "service/canvasService";

import { BoardContainer, BoardWrapper, ArtWrapper, ArtImage } from "style";

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

    response.forEach((res) => {
      canvasArr.push({
        id: res.canvas_idx,
        title: res.canvas_title,
        des: res.canvas_description,
        art: res.canvas_art,
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
            {_.map(canvasList, (canvas, index) => (
              <ArtWrapper key={index}>
                <ArtImage src={canvas.art} />
              </ArtWrapper>
            ))}
          </BoardWrapper>
        ) : null}
      </BoardContainer>
    </>
  );
};

export default CanvasBoard;
