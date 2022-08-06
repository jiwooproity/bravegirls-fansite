import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import { Loading, Top } from "components";
import { utils } from "util/utils";
import { canvasService } from "service/canvasService";

const CanvasDetailContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);
  padding: 0px 15px;

  display: flex;
  justify-content: center;
`;

const CanvasDetailWrapper = styled.div`
  width: 990px;

  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImageContainer = styled.div``;

const DetailImageWrapper = styled.div`
  width: ${({ width }) => `${width}px`};
  box-shadow: rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px;
  border-radius: 5px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  object-fit: cover;
  display: block;
`;

const CanvasDetail = () => {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const { boardId } = params;

  useEffect(() => {
    onLoad();
    utils.onScrollTop();
    // eslint-disable-next-line
  }, []);

  const onLoad = async () => {
    setLoading(false);
    let image = new Image();
    const response = await canvasService.cavasDetail({ params: { boardId } });

    image.src = response.canvas_art;

    image.onload = () => {
      setDetail({
        title: response.canvas_title,
        description: response.canvas_description,
        art: response.canvas_art,
        width: image.width,
        height: image.height,
      });

      setLoading(true);
    };
  };

  return (
    <>
      <Top />
      <CanvasDetailContainer>
        {loading ? (
          <DetailImageContainer>
            <CanvasDetailWrapper>
              <DetailImageWrapper width={detail.width}>
                <DetailImage src={detail.art} />
              </DetailImageWrapper>
            </CanvasDetailWrapper>
          </DetailImageContainer>
        ) : (
          <Loading />
        )}
      </CanvasDetailContainer>
    </>
  );
};

export default CanvasDetail;
