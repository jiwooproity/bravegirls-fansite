import React, { useEffect, useState } from "react";
import _ from "lodash";

import styled from "styled-components";

import { photocardService } from "../../../service/photocardService";

const CardSectionContainer = styled.div`
  width: 100%;
  height: 500px;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const CardSectionTitleWrapper = styled.div`
  width: 990px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardSectionLeft = styled.div``;

const CardSectionTitle = styled.h1`
  font-size: 15px;
  color: rgba(194, 177, 155);
`;

const CardSectionSubTitle = styled.h1`
  font-size: 25px;
`;

const CardSectionRight = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const CardSectionGubun = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: rgba(194, 177, 185);
  color: white;
  cursor: pointer;
`;

const CardSectionWrapper = styled.div`
  width: 990px;
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
`;

const CardWrapper = styled.div`
  width: 230px;
  padding: 0px 0px;
`;

const CardImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 8px;
  background-color: black;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-10px);
  }

  transition: transform 0.5s ease;
  cursor: pointer;
`;

const CardDescriptionArea = styled.div`
  width: 100%;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
`;

const CardDescriptionTitle = styled.h1`
  font-size: 15px;
  display: block;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.h1`
  font-size: 20px;
`;

const CardSection = () => {
  const [photoCard, setPhotoCard] = useState([]);
  const [loading, setLoading] = useState(false);

  const gubunArr = ["RED SUN", "MVSK"];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(false);

    const response = await photocardService.getPhotocardData();

    setPhotoCard(response);
    setLoading(true);
  };

  return (
    <CardSectionContainer>
      <CardSectionTitleWrapper>
        <CardSectionLeft>
          <CardSectionTitle>PhotoCard</CardSectionTitle>
          <CardSectionSubTitle>Download File List</CardSectionSubTitle>
        </CardSectionLeft>
        <CardSectionRight>
          {_.map(gubunArr, (gubun, index) => (
            <CardSectionGubun key={index} onClick={loadData}>
              {gubun}
            </CardSectionGubun>
          ))}
        </CardSectionRight>
      </CardSectionTitleWrapper>

      <CardSectionWrapper>
        {loading ? (
          _.map(photoCard, (card, index) => (
            <CardWrapper key={index}>
              <CardImage src={card.photocard_image} />
              <CardDescriptionArea>
                <CardDescriptionTitle>{card.photocard_name}</CardDescriptionTitle>
              </CardDescriptionArea>
            </CardWrapper>
          ))
        ) : (
          <LoadingWrapper>
            <LoadingText>Loading...</LoadingText>
          </LoadingWrapper>
        )}
      </CardSectionWrapper>
    </CardSectionContainer>
  );
};

export default CardSection;
