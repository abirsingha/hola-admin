import React from "react";

const Input = (props) => {
  const inputHandler = (event) => {
    props.onChange(event);
  };
  return (
    <div className="form-group">
      <input
        onChange={inputHandler}
        value={props.value}
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
