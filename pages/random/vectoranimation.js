import React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

const dimensions = {
  width: 800,
  height: 400,
  margin: {
    top: 20,
    right: 0,
    bottom: 0,
    left: 30,
  },
};

const VectorAnimation = () => {
  const { width, height, margin } = dimensions;
  const svgRef = useRef(null);

  const svgWidth = width + 30;
  // width + margin.left + margin.right;

  const svgHeight = height + 40;
  // height + margin.top + margin.bottom;

  const direction = true;

  function update() {
    d3.select("svg")
      .selectAll("line")
      .transition()
      .duration(750)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 200)
      .attr("y2", direction ? 300 : 200);
    direction = !direction;
  }
  
  useEffect(() => {
    const svgAux = d3.select(svgRef.current);
    // svgAux.selectAll("*").remove();
    const svg = svgAux
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 200)
      .attr("y2", 200)
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");
  }, []);

  return (
    <>
      <button onClick={update}>Update</button>
      <svg ref={svgRef} width={svgWidth} height={svgHeight}>
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
            <path
              d="M2,2 L10,6 L2,10 L6,6 L2,2"
              style={{ fill: "#f00;" }}
            ></path>
          </marker>
        </defs>
      </svg>
    </>
  );
};

export default VectorAnimation;
