import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { decrement, increment, selectCount } from "./counterSlice";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{count}</div>
    </div>
  );
};

export default Counter;
