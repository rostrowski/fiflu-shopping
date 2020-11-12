import React, { forwardRef } from "react";

const Item = forwardRef(({ name, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {name}
    </div>
  );
});

export default Item;
