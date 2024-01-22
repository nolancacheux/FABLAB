import React from "react";

const BeerRech = ({ beer }) => {
  return (
    <li>
      <p style={{ margin: "5px", color: "white" }}>{beer.name}</p>
    </li>
  );
};

export default BeerRech;
