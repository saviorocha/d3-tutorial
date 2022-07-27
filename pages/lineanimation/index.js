import React, { useEffect, useRef, useState } from "react";
import LineComponent from "../../components/d3/d3-line-animation";
import * as d3 from "d3"

let d3Component;

const LineAnimation = () => {
  const margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const refElement = useRef(null);
  
  const [data1, setData1] = useState([
    { ser1: 0.3, ser2: 4 },
    { ser1: 2, ser2: 16 },
    { ser1: 3, ser2: 8 },
  ]);
  const [data2, setData2] = useState([
    {ser1: 1, ser2: 7},
    {ser1: 4, ser2: 1},
    {ser1: 6, ser2: 8}
 ]);
 
  useEffect(initD3, []);

 function initD3() {
  const div = d3.select(refElement.current);
  const d3Props = {
    data1,
    data2,
    margin,
    width,
    height,
  }
  d3Component = new LineComponent(refElement.current, d3Props);
  return () => {
    div.selectAll("*").remove();
  };
 }

  return <div ref={refElement}></div>;
};

export default LineAnimation;
