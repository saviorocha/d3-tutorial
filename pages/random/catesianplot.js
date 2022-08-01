import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";

// https://codepen.io/Dentz/pen/qZVZwB (faltando estilos)

const CatesianPlot = () => {
  useEffect(() => {
    // Set graph
    const width = 700,
      height = 700,
      padding = 100;

    // create an svg container
    const vis = d3
      .select("#graph")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([10, -10])
      .range([width - padding, padding]);
    const yScale = d3
      .scaleLinear()
      .domain([-10, 10])
      .range([height - padding, padding]);

    // define the y axis
    const yAxis = d3.axisLeft(yScale).tickSize(() => -height);

    // define the y axis
    const xAxis = d3.axisBottom(xScale).tickSize(() => -width);

    vis
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height / 2 + ")")
      .call(xAxis);

    vis
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + width / 2 + ",0)")
      .call(yAxis);
  }, []);

  return <div id="graph"></div>;
};

export default CatesianPlot;
