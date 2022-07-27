import React, { useEffect, useState } from "react";
import * as d3 from "d3";

// https://blog.devgenius.io/d3-js-visualize-a-mathematical-function-d0c164ddcf2c
const LineFunction = () => {
  const svgRef = React.useRef(null);
  const [direction, setDirection] = useState(true)
  const coordinates1 = [
    [0, 0],
    [1, 1],
  ];

  const coordinates2 = [
    [0, 0],
    [2, 2.5],
  ];

  function update(coordinates) {
    d3.select("svg")
      .select("path")
      .transition()
      .duration(750)
      .datum(
        direction
          ? [
              [0, 0],
              [1, 1],
            ]
          : [
              [0, 0],
              [2, 2.5],
            ]
      );

    setDirection(!direction);
  }

  useEffect(() => {
    const margin = { top: 10, right: 50, bottom: 50, left: 50 },
      width = 450 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svgAux = d3.select(svgRef.current);
    svgAux.selectAll("*").remove();
    const svg = svgAux
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define chart area
    svg
      .append("clipPath")
      .attr("id", "chart-area")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    // Add Axes
    const xMax = 4;
    const yMax = 5;

    let xScale = d3.scaleLinear([0, xMax], [0, width]);
    let yScale = d3.scaleLinear([0, yMax], [height, 0]);

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").attr("transform", `translate(0,0)`).call(yAxis);

    // Axes label
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + 5)
      .attr("y", height + 35)
      .text("x");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -35)
      .attr("x", -height / 2)
      .attr("transform", "rotate(-90)")
      .html("y");

    // function f(x) {
    //   return 2 * x;
    // }

    // function graphFunction() {
    //   const pointNum = 500;
    //   let y = 0;
    //   const data = [];
    //   for (let x = 0; x <= pointNum; x++) {
    //     y = f(x);
    //     data.push([x, y]);
    //   }
    //   return data;
    // }

    // Add function graph
    let line = d3
      .line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]));
    svg
      .append("path")
      .datum([
        [0, 0],
        [1, 1],
      ])
      // .datum(graphFunction())
      .attr("clip-path", "url(#chart-area)")
      .attr("fill", "none")
      .attr("stroke", "teal")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("marker-end", "url(#arrow)");

    const def = svg.append("defs");
    def = def.append("marker");
    def = def
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "12")
      .attr("markerHeight", "12")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "6")
      .attr("refY", "6")
      .attr("orient", "auto");
    def
      .append("path")
      .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      .style("fill", "teal");

    // svg.attr("marker-end", "url(#arrow)");
  }, []);

  return (
    <>
      <svg ref={svgRef} id="root"></svg>
      <button onClick={() => update(direction)}>Update</button>
    </>
  );
};

export default LineFunction;
