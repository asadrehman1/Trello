import React, { useRef, useEffect } from "react";

const Modal = ({ onClose, children }) => {
  const modalStyles =
    "min-h-[50vh] p-5 shadow-md w-[50] absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] rounded-lg bg-zinc-900 z-10000";

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={modalRef} className={modalStyles}>
      {children}
    </div>
  );
};

export default Modal;
