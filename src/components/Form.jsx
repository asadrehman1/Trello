import React, { useState } from "react";
import { X, Plus } from "react-feather";

const Form = ({ text, placeholder, value, onChange, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") return;
    onSubmit();
    setShowForm(false);
  };

  return (
    <div className="mt-4">
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={value}
              onChange={onChange}
              className="p-2 rounded-md w-80 text-gray-900 outline-none"
            />
            <p
              onClick={() => setShowForm(false)}
              className="hover:bg-gray-500 p-1 rounded-sm mx-2 cursor-pointer"
            >
              <X size={16} />
            </p>
          </div>
          <button className="bg-sky-700 p-2 rounded-md my-2 text-white block">
            {text}
          </button>
        </form>
      ) : (
        <div
          onClick={() => setShowForm(true)}
          className="h-[50px] w-[330px] bg-zinc-900 border-2 border-zinc-900 hover:border-gray-500 mt-3 mb-3 p-2 cursor-pointer rounded-md flex justify-center items-center"
        >
          <p className="mx-2">
            <Plus size={16} />
          </p>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
