import React from "react";

import { AlbumInfo as CSS } from "style";

const AlbumInfo = (props) => {
  const { data } = props;

  // 앨범 이미지
  const { cover, lp } = data;

  // 앨범 INFO 데이터
  const { title, enter, description, descriptionSecond } = data;

  return (
    <CSS.Wrapper>
      {/* Left Side */}
      <CSS.LeftSide>
        <CSS.ImageWrapper>
          <CSS.CoverImage src={cover} />
          <CSS.LpImageWrapper>
            <CSS.LpImage src={lp} />
          </CSS.LpImageWrapper>
        </CSS.ImageWrapper>
      </CSS.LeftSide>
      {/* Left Side */}
      {/* Right Side */}
      <CSS.RightSide>
        <CSS.InfoWrapper>
          <CSS.Title>{title}</CSS.Title>
          <CSS.PlanInfo>{enter}</CSS.PlanInfo>
          <CSS.Description>{description}</CSS.Description>
          <CSS.Description>{descriptionSecond}</CSS.Description>
        </CSS.InfoWrapper>
      </CSS.RightSide>
      {/* Right Side */}
    </CSS.Wrapper>
  );
};

export default AlbumInfo;
