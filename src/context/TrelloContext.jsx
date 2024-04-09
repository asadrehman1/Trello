import { createContext, useContext, useState, useEffect } from "react";

const TrelloContext = createContext();

export const useTrello = () => {
  return useContext(TrelloContext);
};

export const TrelloProvider = ({ children }) => {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("trello")) || []
  );

  useEffect(() => {
    localStorage.setItem("trello", JSON.stringify(boards));
  }, [boards]);

  return (
    <TrelloContext.Provider value={{ boards, setBoards }}>
      {children}
    </TrelloContext.Provider>
  );
};
