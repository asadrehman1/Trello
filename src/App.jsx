import React, { useState } from "react";
import Board from "./components/Board";
import Form from "./components/Form";
import { useTrello } from "./context/TrelloContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [board, setBoard] = useState("");
  const { boards, setBoards } = useTrello();

  const addTask = (bid, task) => {
    let items = [...boards];
    let boardIndex = items.findIndex((item) => item.id === bid);

    if (boardIndex < 0) return;

    let boardItem = boards[boardIndex];

    let newTask = {
      id: Date.now() + Math.random() * 2,
      title: task,
      description: "",
    };

    boardItem.cards.push(newTask);
    setBoards(items);
  };

  const removeTask = (bid, cid) => {
    let boardItems = [...boards];

    let boardIndex = boardItems.findIndex((item) => item.id === bid);

    if (boardIndex < 0) return;

    let boardItem = boardItems[boardIndex];

    let cardIndex = boardItem?.cards.findIndex((item) => item.id === cid);

    if (cardIndex < 0) return;

    boardItem.cards.splice(cardIndex, 1);

    setBoards(boardItems);
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

  const removeBoard = (bid) => {
    let boardItems = [...boards];

    let boardIndex = boardItems.findIndex((item) => item.id === bid);

    if (boardIndex < 0) return;

    boardItems.splice(boardIndex, 1);

    setBoards(boardItems);
  };

  const handleChange = (e) => {
    setBoard(e.target.value);
  };

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
      <div className="min-h-[100vh] w-full">
        <div className="h-[8vh] w-full border-4 bg-[#1d2125] border-b bordered-box border-b-[#9fadbc29] flex justify-center items-center">
          <h1 className="text-4xl font-bold text-slate-50">Trello</h1>
        </div>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(provided) => (
            <div
              className="w-full flex flex-wrap items-start my-5"
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
              <div className="mx-6">
                <Form
                  text="Add Board"
                  placeholder="Add Board"
                  value={board}
                  onChange={handleChange}
                  onSubmit={addBoard}
                />
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
