import React, { useState } from "react";
import Dropdown from "./Dropdown";
import CardInfo from "./CardInfo";
import { MoreHorizontal, FileText } from "react-feather";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ title, boardId, id, onRemove, description, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          setShowModal={setShowModal}
          boardId={boardId}
          cardId={id}
          description={description}
        />
      )}
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="h-[50px] w-[330px] bg-zinc-700 border-2 border-zinc-900 hover:border-gray-500 mt-3 mb-3 p-2 cursor-pointer rounded-md flex justify-between items-center"
          >
            <div>
              <p>{title}</p>
              <p
                onClick={() => setShowModal(true)}
                className="hover:bg-gray-500 w-fit p-1 rounded-sm"
              >
                <FileText size={18} />
              </p>
            </div>
            {!showDropdown ? (
              <p
                onClick={(e) => {
                  setShowDropdown(true);
                  e.stopPropagation();
                }}
                className="hover:bg-gray-500 p-1 rounded-sm"
              >
                <MoreHorizontal size={16} />
              </p>
            ) : (
              <Dropdown setShowDropdown={setShowDropdown}>
                <p
                  onClick={(e) => {
                    onRemove(boardId, id);
                    e.stopPropagation();
                  }}
                >
                  Delete Task
                </p>
              </Dropdown>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;
