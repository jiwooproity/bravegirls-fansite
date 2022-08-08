import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import _ from "lodash";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import {
  AlbumColumn,
  AlbumColumnWrapper,
  AlbumInfo,
  AlbumInfoColum,
  AlbumInfoDummy,
  AlbumListCover,
  AlbumListIcon,
  AlbumLists,
  AlbumListShadow,
  AlbumListShadowWrapper,
  AlbumListWrapper,
  AlbumNumber,
  AlbumSelectBar,
  AlbumThumbnail,
} from "style";

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
      <AlbumColumnWrapper>
        <AlbumColumn>
          <AlbumInfoDummy />
          <AlbumInfoColum>커버</AlbumInfoColum>
          <AlbumInfoColum>타이틀</AlbumInfoColum>
          <AlbumInfoColum>작곡, 작사, 편곡</AlbumInfoColum>
          <AlbumInfoColum>기획</AlbumInfoColum>
          <AlbumInfoColum>발매일</AlbumInfoColum>
          <AlbumInfoColum>
            <AlbumListIcon icon={faBars} />
          </AlbumInfoColum>
        </AlbumColumn>
      </AlbumColumnWrapper>

      <DragDropContext onDragEnd={onHandleDrag}>
        <Droppable droppableId="list">
          {(provided) => (
            <AlbumListShadowWrapper
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <AlbumListWrapper>
                <AlbumSelectBar
                  select={selectValue}
                  color={onceData.color}
                  light={func.isLightColor(onceData.id)}
                />
                {_.map(data, (album, index) => (
                  <Draggable
                    key={String(index)}
                    index={index}
                    draggableId={String(index)}
                  >
                    {(provided) => (
                      <AlbumLists
                        key={index}
                        active={index === selectValue}
                        onClick={() => func.selectMusic(index, album.id)}
                        light={func.isLightColor(album.id)}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <AlbumNumber>{album.id}</AlbumNumber>
                        <AlbumListCover>
                          <AlbumThumbnail src={album.cover} />
                        </AlbumListCover>
                        <AlbumInfo>{album.title}</AlbumInfo>
                        <AlbumInfo>{album.composition}</AlbumInfo>
                        <AlbumInfo>{album.enter}</AlbumInfo>
                        <AlbumInfo>{album.release}</AlbumInfo>
                        <AlbumListIcon icon={faBars} />
                      </AlbumLists>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </AlbumListWrapper>
              <AlbumListShadow />
            </AlbumListShadowWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default AlbumList;
