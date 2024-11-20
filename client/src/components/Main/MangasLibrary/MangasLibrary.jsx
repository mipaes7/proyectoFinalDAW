import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import LibraryCard from "./LibraryCard";
import { v4 as uuidv4 } from "uuid";

const INITIAL_COLUMNS = {
  planToRead: { title: "Plan to Read", items: [] },
  reading: { title: "Reading", items: [] },
  finished: { title: "Finished", items: [] },
  dropped: { title: "Dropped", items: [] },
};

const MangasLibrary = () => {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  useEffect(() => {
    const fetchMockLibrary = () => {
      const library = [
        { id: uuidv4(), title: "Naruto", status: "Plan to Read" },
        { id: uuidv4(), title: "One Piece", status: "Reading" },
        { id: uuidv4(), title: "Death Note", status: "Finished" },
        { id: uuidv4(), title: "Bleach", status: "Dropped" },
      ];
      setColumns({
        planToRead: {
          title: "Plan to Read",
          items: library.filter((manga) => manga.status === "Plan to Read"),
        },
        reading: {
          title: "Reading",
          items: library.filter((manga) => manga.status === "Reading"),
        },
        finished: {
          title: "Finished",
          items: library.filter((manga) => manga.status === "Finished"),
        },
        dropped: {
          title: "Dropped",
          items: library.filter((manga) => manga.status === "Dropped"),
        },
      });
    };

    fetchMockLibrary();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      
      const sourceColumn = columns[source.droppableId];
      const destinationColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destinationColumn, items: destinationItems },
      });

      console.log(
        `Moved "${movedItem.title}" from ${sourceColumn.title} to ${destinationColumn.title}`
      );
    } else {
      
      const column = columns[source.droppableId];
      const items = [...column.items];
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      
      setColumns({
        ...columns,
        [source.droppableId]: { ...column, items },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="library">
        {Object.entries(columns).map(([columnId, column]) => (
          <div key={columnId} className="column">
            <h2 className="columnTitle">{column.title}</h2>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="droppable-column"
                >
                  {column.items.length > 0 ? (
                    column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-item"
                          >
                            <LibraryCard manga={item} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="placeholder">No mangas in this list</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default MangasLibrary;
