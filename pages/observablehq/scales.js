// import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import styles from "../../components/MultilineChart/multiline.module.css";
/* https://observablehq.com/@d3/learn-d3-scales */

const fruits = [
  { name: "🍊", count: 21 },
  { name: "🍇", count: 13 },
  { name: "🍏", count: 8 },
  { name: "🍌", count: 5 },
  { name: "🍐", count: 3 },
  { name: "🍋", count: 2 },
  { name: "🍎", count: 1 },
  { name: "🍉", count: 1 },
];
const dimensions = {
  width: 640,
  height: 202,
  margin: {
    top: 20,
    right: 0,
    bottom: 0,
    left: 30,
  },
};
export default function Scales() {
  const { width, height, margin } = dimensions;
  const svgRef = useRef(null);

  const svgWidth = width + 30;
  // width + margin.left + margin.right;

  const svgHeight = height + 40;
  // height + margin.top + margin.bottom;

  // const fruitData = JSON.parse(fruits);
  useEffect(() => {
    // console.log("fruitData", fruitData);
    const svgAux = d3.select(svgRef.current);
    svgAux.selectAll("*").remove();
    const svg = svgAux
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(fruits.map((f) => f.count))]) // o que vai ter na escala
      .range([margin.left, width - margin.right]) // onde vai começar e terminar na tela a escala
      .interpolate(d3.interpolateRound); // an interpolator is a function which takes a value between 0 and 1, returning the corresponding visual value.

    const yScale = d3
      .scaleBand()
      .domain(fruits.map((f) => f.name)) // o que vai ter na escala
      .range([margin.top, height - margin.bottom]) // onde vai começar e terminar na tela a escala
      .padding(0.1)
      .round(true);

    // Add X grid lines with labels - https://www.d3indepth.com/axes/
    const xAxis = d3.axisTop(xScale);
    svg
      .append("g")
      .call(xAxis)
      .call((g) => g.select(".domain").remove());

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .call(yAxis)
      .call((g) => g.select(".domain").remove());

      // data 
      // Object { Country: "Italy", Value: "660" }

      // data 
      // Object { Country: "Israel", Value: "1263" }
    // Bars
    fruits.map((fruit) => {
      console.log("width", xScale(fruit.count) - xScale(0));
      svg
        // .selectAll(".bar")
        .append("rect")
        .attr("x", xScale(0))
        .attr("y", yScale(fruit.name))
        .attr("width", xScale(fruit.count) - xScale(0))
        .attr("height", 33)
        .attr("fill", "steelblue");
    });
  }, []);

  return (
    <div className={styles.app}>
      <svg ref={svgRef} viewBox={`0 0 ${svgWidth} ${svgHeight}`} id="area" height={svgHeight} width={svgWidth}></svg>
    </div>
  );
}
