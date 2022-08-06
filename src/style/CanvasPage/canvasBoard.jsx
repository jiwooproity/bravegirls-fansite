import styled, { css } from "styled-components";

const BoardContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);

  padding: 0px 15px;

  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  width: 990px;
`;

const ArtContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
`;

const ArtWrapper = styled.div`
  width: 100%;

  ${({ active, start, end }) =>
    active
      ? css`
          grid-row-start: ${start};
          grid-row-end: ${end};
        `
      : null}
`;

const ArtImageWrapper = styled.div`
  width: 100%;

  border-radius: 5px;
  overflow: hidden;
`;

const ArtImage = styled.img`
  width: 100%;
  display: block;
`;

const ArtTitle = styled.h1`
  font-size: 20px;
  line-height: 20px;
`;

export { BoardContainer, BoardWrapper, ArtContainer, ArtWrapper, ArtImageWrapper, ArtImage, ArtTitle };
