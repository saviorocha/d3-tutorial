import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

// https://www.d3indepth.com/selections/

const Selections = () => {
  useEffect(() => {
    d3.selectAll("circle").on("click", function (e, d) {
      d3.select(this).style("fill", "orange");
    });
  }, []);

  return (
    <svg width="760" height="140">
      <g transform="translate(70, 70)">
        <circle r="40" />
        <circle r="40" cx="120" />
        <circle r="40" cx="240" />
        <circle r="40" cx="360" />
        <circle r="40" cx="480" />
      </g>
    </svg>
  );
};

export default Selections;
