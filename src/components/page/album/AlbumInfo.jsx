import React from "react";

import {
  AlbumWrapper,
  AlbumLeftSide,
  AlbumImageWrap,
  AlbumImage,
  LpImageWrap,
  LpImage,
  AlbumRightSide,
  AlbumDescription,
  AlbumTitleText,
  DescriptionText,
  AlbumEntertainment,
} from "style";

const AlbumInfo = (props) => {
  const { data } = props;

  // 앨범 이미지
  const { cover, lp } = data;

  // 앨범 INFO 데이터
  const { title, enter, description, descriptionSecond } = data;

  return (
    <AlbumWrapper>
      <AlbumLeftSide>
        <AlbumImageWrap>
          <AlbumImage src={cover} />
          <LpImageWrap>
            <LpImage src={lp} />
          </LpImageWrap>
        </AlbumImageWrap>
      </AlbumLeftSide>
      <AlbumRightSide>
        <AlbumDescription>
          <AlbumTitleText>{title}</AlbumTitleText>
          <AlbumEntertainment>{enter}</AlbumEntertainment>
          <DescriptionText>{description}</DescriptionText>
          <DescriptionText>{descriptionSecond}</DescriptionText>
        </AlbumDescription>
      </AlbumRightSide>
    </AlbumWrapper>
  );
};

export default AlbumInfo;
