import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";

// https://codepen.io/Dentz/pen/qZVZwB (faltando estilos)

const CatesianPlot = () => {
  useEffect(() => {
    // Set graph
    var width = 700,
      height = 700,
      padding = 100;

    // create an svg container
    var vis = d3
      .select("#graph")
      .append("svg:svg")
      .attr("width", width)
      .attr("height", height);

    var xScale = d3
      .scaleLinear()
      .domain([10, -10])
      .range([width - padding, padding]);
    var yScale = d3
      .scaleLinear()
      .domain([-10, 10])
      .range([height - padding, padding]);

    // define the y axis
    var yAxis = d3.axisLeft(yScale).tickSize(() => -height);

    // define the y axis
    var xAxis = d3.axisBottom(xScale).tickSize(() => -width);

    var xAxisPlot = vis
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height / 2 + ")")
      .call(xAxis);

    var yAxisPlot = vis
      .append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + width / 2 + ",0)")
      .call(yAxis);
    vis
      .append("line")
      .style("stroke", "lightgreen")
      .style("stroke-width", 10)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 200)
      .attr("y2", 200);
  }, []);

  return <div id="graph"></div>;
};

export default CatesianPlot;
