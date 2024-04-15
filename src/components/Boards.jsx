import React, { useState } from "react";
import Board from "./Board";
import Form from "./Form";
import { useTrello } from "../context/TrelloContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { filterBoardById } from "../utils/utils";

const Boards = () => {
  const [board, setBoard] = useState("");
  const { boards, setBoards } = useTrello();

  const addTask = (boardId, task) => {
    // let items = [...boards];
    // let boardIndex = items.findIndex((item) => item.id === boardId);

    // if (boardIndex < 0) return;

    // let boardItem = boards[boardIndex];

    const boardItem = filterBoardById(boards, boardId);

    if (!boardItem) return;

    let newTask = {
      id: Date.now() + Math.random() * 2,
      title: task,
      description: "",
    };

    boardItem.cards.push(newTask);
    setBoards([...boards]);
  };

  const removeTask = (boardId, cardId) => {
    // let boardItems = [...boards];

    // let boardIndex = boardItems.findIndex((item) => item.id === boardId);

    // if (boardIndex < 0) return;

    // let boardItem = boardItems[boardIndex];

    const boardItem = filterBoardById(boards, boardId);

    if (!boardItem) return;

    let cardIndex = boardItem?.cards.findIndex((item) => item.id === cardId);

    if (cardIndex < 0) return;

    boardItem.cards.splice(cardIndex, 1);

    setBoards([...boards]);
  };

  const addBoard = () => {
    const newBoard = {
      id: Date.now() + Math.random() * 2,
      title: board,
      cards: [],
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setBoard("");
  };

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);

    if (boardIndex < 0) return;

    boards.splice(boardIndex, 1);

    setBoards([...boards]);
  };

  //   const handleChange = (e) => {
  //     setBoard(e.target.value);
  //   };

  const reorder = (boards, startIndex, endIndex) => {
    const result = Array.from(boards);
    const [removedItem] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removedItem);

    return result;
  };

  const dragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "board") {
      const items = reorder(boards, source.index, destination.index);
      setBoards(items);
    }
    if (type === "card") {
      let items = [...boards];

      const sourceBoard = items.find(
        (board) => board.id.toString() === source.droppableId
      );
      const destinationBoard = items.find(
        (board) => board.id.toString() === destination.droppableId
      );

      if (!sourceBoard || !destinationBoard) return;

      let reorderItems;
      if (source.droppableId === destination.droppableId) {
        reorderItems = reorder(
          sourceBoard.cards,
          source.index,
          destination.index
        );
        sourceBoard.cards = reorderItems;
      } else {
        const [removedItem] = sourceBoard.cards.splice(source.index, 1);
        destinationBoard.cards.splice(destination.index, 0, removedItem);
      }
      setBoards(items);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="fixed top-10 right-0 m-4">
          <Form
            text="Add Board"
            placeholder="Add Board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            onSubmit={addBoard}
          />
        </div>

        <div className="h-16 flex justify-center items-center bg-gray-800 text-white">
          <h1 className="text-4xl font-bold">Trello</h1>
        </div>

        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(provided) => (
            <div
              className="w-full flex flex-wrap items-start my-20"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boards.map((board, index) => (
                <Board
                  key={board.id}
                  id={board.id}
                  index={index}
                  title={board.title}
                  cards={board.cards}
                  addTask={addTask}
                  removeTask={removeTask}
                  removeBoard={removeBoard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Boards;
