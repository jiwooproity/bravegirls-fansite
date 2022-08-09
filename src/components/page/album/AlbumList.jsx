import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { AlbumList as CSS } from "style";

const AlbumList = (props) => {
  const { data, onceData, selectValue, func } = props;

  const onHandleDrag = (result) => {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    func.dragMusic(result.destination.index, items);
  };

  return (
    <>
      <CSS.ColumnWrapper>
        <CSS.Column>
          <CSS.Dummy />
          <CSS.Info>커버</CSS.Info>
          <CSS.Info>타이틀</CSS.Info>
          <CSS.Info>작곡, 작사, 편곡</CSS.Info>
          <CSS.Info>기획</CSS.Info>
          <CSS.Info>발매일</CSS.Info>
          <CSS.Info>
            <CSS.Icon icon={faBars} />
          </CSS.Info>
        </CSS.Column>
      </CSS.ColumnWrapper>

      <DragDropContext onDragEnd={onHandleDrag}>
        <Droppable droppableId="list">
          {(provided) => (
            <CSS.LinearShadowWrapper {...provided.droppableProps} ref={provided.innerRef}>
              <CSS.Wrapper>
                <CSS.SelectBar select={selectValue} color={onceData.color} light={func.isLightColor(onceData.id)} />
                {_.map(data, (album, index) => (
                  <Draggable key={String(index)} index={index} draggableId={String(index)}>
                    {(provided) => (
                      <CSS.List
                        key={index}
                        active={index === selectValue}
                        onClick={() => func.selectMusic(index, album.id)}
                        light={func.isLightColor(album.id)}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <CSS.Number>{album.id}</CSS.Number>
                        <CSS.ListCover>
                          <CSS.CoverImage src={album.cover} />
                        </CSS.ListCover>
                        <CSS.Infos>{album.title}</CSS.Infos>
                        <CSS.Infos>{album.composition}</CSS.Infos>
                        <CSS.Infos>{album.enter}</CSS.Infos>
                        <CSS.Infos>{album.release}</CSS.Infos>
                        <CSS.Icon icon={faBars} />
                      </CSS.List>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CSS.Wrapper>
              {/* 하단 그림자 */}
              <CSS.LinearShadow />
            </CSS.LinearShadowWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default AlbumList;
