import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "./Modal";
import { useTrello } from "../context/TrelloContext";
import { modules, formats } from "../constants";
import { filterBoardById } from "../utils/utils";

const CardInfo = ({ setShowModal, cardId, boardId, description }) => {
  const { boards, setBoards } = useTrello();
  const [newDescription, setNewDescription] = useState(description); // Initialize with description
  const quillRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!quillRef.current) return;

    const htmlContent = quillRef.current.editor.root.innerHTML;

    if (htmlContent.trim() === "") return;

    // let boardItems = [...boards];
    // let boardIndex = boardItems.findIndex((item) => item.id === boardId);

    // if (boardIndex < 0) return;

    // let boardItem = boardItems[boardIndex];
    const boardItem = filterBoardById(boards, boardId);

    if (!boardItem) return;

    let cardIndex = boardItem?.cards.findIndex((item) => item.id === cardId);

    if (cardIndex < 0) return;

    let cardItem = boardItem.cards[cardIndex];

    cardItem.description = htmlContent;

    setBoards([...boards]);

    setNewDescription("");
  };

  return (
    <Modal onClose={() => setShowModal(false)}>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={newDescription}
          onChange={setNewDescription}
          theme="snow"
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
        <button
          type="submit"
          className="bg-sky-700 p-2 rounded-md my-2 text-white w-full"
        >
          Save
        </button>
      </form>
      <h1 className="text-2xl my-4">Description:</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </Modal>
  );
};

export default CardInfo;
