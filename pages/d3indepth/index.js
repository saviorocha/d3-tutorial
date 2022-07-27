import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const D3indepth = () => {
  useEffect(() => {

    let scaleSecond = d3.scaleLinear().domain([0, 100]).range([0, 400]);

    let axisLeft = d3.axisLeft(scaleSecond);
    let axisRight = d3.axisRight(scaleSecond);
    let axisTop = d3.axisTop(scaleSecond);
    let axisBottom = d3.axisBottom(scaleSecond);

    d3.select("#left").call(axisLeft);
    d3.select("#right").call(axisRight);
    d3.select("#top").call(axisTop);
    d3.select("#bottom").call(axisBottom);
  }, []);

  return (
    <>
      <p>https://stackoverflow.com/questions/36579339/how-to-draw-line-with-arrow-using-d3-js</p>
      <svg width="500" height="500">
        <g id="left" transform="translate(30, 40)"></g>
        <g id="right" transform="translate(450, 40)"></g>
        <g id="top" transform="translate(40, 30)"></g>
        <g id="bottom" transform="translate(40, 450)"></g>
      </svg>
    </>
  );
};

export default D3indepth;
