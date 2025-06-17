import React from "react";

const Card = (props) => {
  return (
    <div className={`w-100 h-100 d-flex flex-column border bg-white rounded ${props.padding? 'p-1':'p-0'}`}>
      {props.children}
    </div>
  );
};

export default Card;
