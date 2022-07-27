import React, { useRef, useState } from "react";
import * as d3 from "d3";
import { useEffect } from "react";

const Line = () => {
 const [x, setX] = useState(0);
 const [axisX, setAxisX] = useState(0);
 const [y, setY] = useState(0);
 const [axisY, setAxisY] = useState(0);
 const svgRef = useRef(null);

  // Create a function that takes a dataset as input and update the plot:
  function update() {
    
    // Create the X axis:
    // x.domain([
    //   0,
    //   d3.max(data, function (d) {
    //     return d.ser1;
    //   }),
    // ]);
    // svg.selectAll(".myXaxis").transition().duration(3000).call(xAxis);

    // // create the Y axis
    // y.domain([
    //   0,
    //   d3.max(data, function (d) {
    //     return d.ser2;
    //   }),
    // ]);
    // svg.selectAll(".myYaxis").transition().duration(3000).call(yAxis);

    // // Create a update selection: bind to the new data
    // const u = svg.selectAll(".lineTest").data([data], function (d) {
    //   return d.ser1;
    // });

    // // Updata the line
    // u.join("path")
    //   .attr("class", "lineTest")
    //   .transition()
    //   .duration(3000)
    //   .attr(
    //     "d",
    //     d3
    //       .line()
    //       .x(function (d) {
    //         return x(d.ser1);
    //       })
    //       .y(function (d) {
    //         return y(d.ser2);
    //       })
    //   )
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 2.5);
  }

  useEffect(() => {
    // Create 2 datasets
    const data1 = [
      { ser1: 0.3, ser2: 4 },
      { ser1: 2, ser2: 16 },
      { ser1: 3, ser2: 8 },
    ];

    const data2 = [
      { ser1: 1, ser2: 7 },
      { ser1: 4, ser2: 1 },
      { ser1: 6, ser2: 8 },
    ];
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("ref", svgRef)
      .attr("id", "plot")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Initialise a X axis:
    const x = d3.scaleLinear().range([0, width]);
    const xAxis = d3.axisBottom().scale(x);
    setX(x);
    setAxisX(xAxis);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "myXaxis");

    // Initialize an Y axis
    const y = d3.scaleLinear().range([height, 0]);
    const yAxis = d3.axisLeft().scale(y);
    setY(y);
    setAxisY(yAxis);

    svg.append("g").attr("class", "myYaxis");

    // At the beginning, I run the update function on the first dataset:
    update(data1);

    // cleanup
    return () => {
      d3.select("#plot").selectAll("*").remove();
    };
  }, []);

  return (
    <>
      <button onClick={() => update(data1)}>Dataset 1</button>
      <button onClick={() => update(data2)}>Dataset 2</button>
      <div id="my_dataviz"></div>
    </>
  );
};

export default Line;
