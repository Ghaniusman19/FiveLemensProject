import React from "react";

const Button = ({ label, onClick, className, ...rest }) => {
  return (
    <button onClick={onClick} className={className} {...rest}>
      {" "}
      {label}{" "}
    </button>
  );
};

export default Button;
