import styled from "styled-components";

const BoardContainer = styled.div`
  width: 100%;
  height: calc(100vh - 85px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWrapper = styled.div`
  width: 990px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
`;

const ArtWrapper = styled.div`
  width: 100%;
  padding-bottom: 65%;
  position: relative;
  overflow: hidden;
`;

const ArtImage = styled.img`
  width: 100%;
  display: block;
  position: absolute;
  top: 50%;
  left: 0px;

  transform: translateY(-50%);
`;

export { BoardContainer, BoardWrapper, ArtWrapper, ArtImage };
