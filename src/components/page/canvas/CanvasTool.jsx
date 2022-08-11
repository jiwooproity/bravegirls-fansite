import React from "react";

import _ from "lodash";

import { lineWidth, eraseLine } from "constant";
import { CanvasTool as CSS, FontIcon } from "style";

const ToolItem = (props) => {
  const { data, value, title, switching } = props;
  const { onClick, onChange } = props;

  return (
    <>
      <CSS.SizeText onClick={() => onClick(!switching)}>{title}</CSS.SizeText>
      {switching && (
        <CSS.SelectBox value={value} onChange={onChange}>
          {_.map(data, (item, index) => (
            <CSS.Option key={index} value={item.value}>
              {item.name}
            </CSS.Option>
          ))}
        </CSS.SelectBox>
      )}
    </>
  );
};

const CanvasTool = (props) => {
  const { hidden, active, color } = props;
  const { erase, brush, picker, stroke, eraseStroke } = props;
  const { setOpenBrush, setOpenErase, openBrush, openErase } = props;
  const { onChangeStroke, onChangeErase } = props;
  const { onChangeTool, onChangeColor, onRefresh, onDelete, onPicker } = props;
  const { uploadCanvas, saveImage } = props;

  return (
    <CSS.ToolBox active={active || hidden}>
      {/* 브러쉬 사용중 표시 */}
      <CSS.Wrapper mode={brush ? "true" : "false"}>
        <CSS.Icon icon={FontIcon.Brush} onClick={onChangeTool} />
      </CSS.Wrapper>

      {/* 브러쉬 모션 */}
      <CSS.Wrapper>
        <ToolItem
          title={"굵기"}
          data={lineWidth}
          value={stroke}
          switching={openBrush}
          onChange={onChangeStroke}
          onClick={setOpenBrush}
        />
      </CSS.Wrapper>

      {/* 지우개 사용중 표시 */}
      <CSS.Wrapper mode={erase ? "true" : "false"}>
        <CSS.Icon icon={FontIcon.Eraser} onClick={onChangeTool} />
      </CSS.Wrapper>

      {/* 지우개 모션 */}
      <CSS.Wrapper>
        <ToolItem
          title={"크기"}
          data={eraseLine}
          value={eraseStroke}
          switching={openErase}
          onChange={onChangeErase}
          onClick={setOpenErase}
        />
      </CSS.Wrapper>

      {/* 초기화 아이콘 */}
      <CSS.Wrapper>
        <CSS.Icon icon={FontIcon.Refresh} onClick={onDelete} />
      </CSS.Wrapper>

      {/* 삭제 아이콘 */}
      <CSS.Wrapper>
        <CSS.Icon icon={FontIcon.Trash} onClick={onRefresh} />
      </CSS.Wrapper>

      {/* 업로드 아이콘 */}
      <CSS.Wrapper>
        <CSS.Icon icon={FontIcon.Upload} onClick={uploadCanvas} />
      </CSS.Wrapper>

      {/* 다운로드 아이콘 */}
      <CSS.Wrapper>
        <CSS.Icon icon={FontIcon.Download} onClick={saveImage} />
      </CSS.Wrapper>

      {/* 팔레트 아이콘 및 피커 */}
      <CSS.Wrapper>
        <CSS.Palette color={color} onClick={onPicker} />
        {picker && <CSS.Picker color={color.rgb} onChange={onChangeColor} />}
      </CSS.Wrapper>
    </CSS.ToolBox>
  );
};

export default CanvasTool;
