import React, { useRef, useEffect } from "react";

const Dropdown = ({ setShowDropdown, children }) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown]);
  return (
    <div className="rounded-md bg-sky-700 p-2 m-2" ref={dropdownRef}>
      {children}
    </div>
  );
};

export default Dropdown;
