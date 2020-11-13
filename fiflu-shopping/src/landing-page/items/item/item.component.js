import React, { forwardRef } from "react";

import "./style.css";

const Item = forwardRef(({ name, ...props }, ref) => {
  return (
    <div className="item" ref={ref} {...props}>
      {name}
    </div>
  );
});

export default Item;
