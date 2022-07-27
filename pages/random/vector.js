import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const Vector = () => {
  useEffect(() => {
    // 获取 svg
    var svg = d3.select("svg");

    // 绘制直线
    var line = svg
      .append("line")
      .attr("x1", 50)
      .attr("y1", 10)
      .attr("x2", 200)
      .attr("y2", 50)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // 绘制曲线
    var curve_path = "M20,70 T80,100 T160,80 T200,90";
    var curve = svg
      .append("path")
      .attr("d", curve_path)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("marker-start", "url(#arrow)")
      .attr("marker-mid", "url(#arrow)")
      .attr("marker-end", "url(#arrow)");
  }, []);

  return (
    <svg width="300" height="200">
      <defs>
        <marker
          id="arrow"
          markerUnits="strokeWidth"
          markerWidth="12"
          markerHeight="12"
          viewBox="0 0 12 12"
          refX="6"
          refY="6"
          orient="auto"
        >
          <path d="M2,2 L10,6 L2,10 L6,6 L2,2" style={{ fill: "#f00;" }}></path>
        </marker>
      </defs>

      {/* <line x1="0" y1="0" x2="200" y2="50"  stroke="red" stroke-width="2" marker-end="url(#arrow)"/>  */}

      {/* <path d="M20,70 T80,100 T160,80 T200,90" fill="white" stroke="red" stroke-width="2" marker-start="url(#arrow)" marker-mid="url(#arrow)" marker-end="url(#arrow)"/>  */}
    </svg>
  );
};

export default Vector;
