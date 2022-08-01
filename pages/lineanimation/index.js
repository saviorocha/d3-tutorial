import React, { useEffect, useRef, useState } from "react";
import LineComponent from "../../components/d3/d3-line-animation";
import * as d3 from "d3";

const LineAnimation = () => {
  const margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const refElement = useRef(null);
  const [d3Component, setD3Component] = useState(null);
  const [data1, setData1] = useState([
    { ser1: 0, ser2: 0 },
    { ser1: 2, ser2: 2 },
  ]);
  const [data2, setData2] = useState([
    { ser1: 0, ser2: 0 },
    { ser1: 3, ser2: 7 },
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
    };
    setD3Component(new LineComponent(refElement.current, d3Props));
    return () => {
      div.selectAll("*").remove();
    };
  }

  function update(data) {
    d3Component.updateData(data);
  }

  const handleChange = (event) => {
    setData1(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div ref={refElement}></div>
      <button onClick={() => update(data1)}>Linha 1</button>
      <button onClick={() => update(data2)}>Linha 2</button>

      {/* <button onClick={handleClick}>Linha 1</button>
      <input onChange={handleChange} />
      <input />
      <h2>vetor 1: {data1}</h2>
      <br />
      <button onClick={() => update(data2)}>Linha 2</button>
      <input />
      <input />
      <h2>vetor 2: {data2}</h2> */}
    </>
  );
};

export default LineAnimation;
