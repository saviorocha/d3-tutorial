import React, { useEffect, useRef, useState } from "react";
import VectorComponent from "../../components/d3/d3-vector-animation";
import * as d3 from "d3";

let vector;
const VectorAnime = () => {
  const refElement = useRef(null);
  const [data1, setData1] = useState([
    [0, 0],
    [1, 1],
  ]);
  const [data2, setData2] = useState([
    { ser1: 1, ser2: 7 },
    { ser1: 4, ser2: 1 },
    { ser1: 6, ser2: 8 },
  ]);
  const [margin, setMargin] = useState({
    top: 10,
    right: 30,
    bottom: 30,
    left: 50,
  });
  const [width, setWidth] = useState(460 - margin.left - margin.right);
  const [height, setHeight] = useState(400 - margin.top - margin.bottom);

  useEffect(init, []);

  function init() {
    const svg = d3.select(refElement.current);
    vector = new VectorComponent(refElement.current, {
      data1,
      width,
      height,
      margin,
    });
    return () => {
      svg.selectAll("*").remove();
    };
  }

  //   const

  return (
    <>
      <div ref={refElement}></div>
      {/* <button onClick="update(data1)">Before</button>
      <button onClick="update(data2)">After</button> */}
    </>
  );
};

export default VectorAnime;
