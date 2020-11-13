import React, { useState, useEffect } from "react";
import Item from "../item/item.component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";

import { reorderItems } from "../../../shared/shared.slice";

const ItemsList = ({ items }) => {
  const dispatch = useDispatch();
  const [orderedItems, setOrderedItems] = useState(items);
  const draggingModeOn = useSelector((state) => state.shared.draggingModeOn);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination || !items?.length) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setOrderedItems(reorderedItems);

    dispatch(reorderItems(reorderedItems.map((item) => item.id)));
  };

  const renderItemsWithToggle = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {orderedItems.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Item
                        name={item.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const renderItemsWithoutToggle = () => {
    return (
      <>
        {orderedItems.map((item) => (
          <Item name={item.name} />
        ))}
      </>
    );
  };

  return draggingModeOn ? renderItemsWithToggle() : renderItemsWithoutToggle();
};

export default ItemsList;
