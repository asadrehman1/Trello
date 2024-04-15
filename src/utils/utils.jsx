export const filterBoardById = (boards, boardId) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  return boardIndex >= 0 ? boards[boardIndex] : null;
};
