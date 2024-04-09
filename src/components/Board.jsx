import React, { useState } from "react";
import Card from "./Card";
import Dropdown from "./Dropdown";
import Form from "./Form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { MoreHorizontal } from "react-feather";

const Board = ({
  id,
  index,
  title,
  cards,
  addTask,
  removeTask,
  removeBoard,
}) => {
  const [taskName, setTaskName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setTaskName(e.target.value);
  };

  const hanldeSubmit = () => {
    addTask(id, taskName);
    setTaskName("");
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          className="w-[350px] h-fit rounded-md bg-black p-3 m-5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between">
            <h2 className="font-bold">{title}</h2>
            {!showDropdown ? (
              <p
                onClick={() => setShowDropdown(true)}
                className="hover:bg-gray-500 p-1 rounded-sm"
              >
                <MoreHorizontal size={16} />
              </p>
            ) : (
              <Dropdown setShowDropdown={setShowDropdown}>
                <p onClick={() => removeBoard(id)}>Delete Board</p>
              </Dropdown>
            )}
          </div>
          <Droppable droppableId={id.toString()} type="card">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cards?.map((card, index) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    index={index}
                    boardId={id}
                    title={card.title}
                    onRemove={removeTask}
                    description={card.description}
                  />
                ))}
                {provided.placeholder}
                <Form
                  text="Add Task"
                  placeholder="Add Task"
                  value={taskName}
                  onChange={handleChange}
                  onSubmit={hanldeSubmit}
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Board;
