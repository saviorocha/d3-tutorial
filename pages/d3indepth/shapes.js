import React, { useEffect } from "react";
import * as d3 from "d3";

const Shapes = () => {
  
    useEffect(() => {
    var lineGenerator = d3.line();
    var points = [
      [0, 0],
      [100, 100],
    ];

    var pathData = lineGenerator(points);

    // Select the path element and set its d attribute
    d3.select("path").attr("d", pathData);

  }, []);

  return (
    <svg width="700" height="110">
      <path style={{
        fill: "none",
        stroke: "#999",
      }}></path>
    </svg>
  );
};

export default Shapes;
