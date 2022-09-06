import React, { useEffect } from "react";
import * as d3 from "d3";

const Shapes = () => {
  useEffect(() => {
    // d3.selectAll("circle").on("click", function (e, d) {
    //   d3.select(this).style("fill", "orange");
    // });
    var w = 500;
    var h = 100;
    var dataset = [
      [5, 20],
      [480, 90],
      [250, 50],
      [100, 33],
      [330, 95],
      [410, 12],
      [475, 44],
      [25, 67],
      [85, 21],
      [220, 88],
    ];
    var xScale = d3.scaleLinear().domain([
      0,
      d3.max(dataset, function (d) {
        return d[0];
      }),
    ]);
    d3.select("body").on("click", function (e) {
      console.log("x is " + xScale.invert(e.pageX));
      console.log("y is " + xScale.invert(e.pageX));
    });
    // d3.selectAll("g").on("click", function(e) {
    //   d3.select(this).style("fill", "purple")
    // })
  }, []);

  return (
    <>
      <svg width="760" height="140">
        <g transform="translate(70, 70)">
          <circle r="40" />
          <circle r="40" cx="120" />
          <circle r="40" cx="240" />
          <circle r="40" cx="360" />
          <circle r="40" cx="480" />
        </g>
      </svg>
      <div className="status">Click on a circle</div>
    </>
  );
};

export default Shapes;
