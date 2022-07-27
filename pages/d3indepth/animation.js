import React from "react";
import * as d3 from "d3";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "../../components/animation.module.css";

const Animation = () => {
  const svgRef = useRef(null);
  let data = [];

  function updateData() {
    data = [];
    for (let i = 0; i < 5; i++) {
      data.push(Math.random() * 800);
    }
  }

  function update() {
    d3.select("svg")
      .selectAll("circle")
      .style("fill", "#ff00007f")
      .data(data)
      .join("circle")
      .attr("cy", 50)
      .attr("r", 40)
      .transition()
      .attr("cx", function (d) {
        return d;
      });
  }

  function updateAll() {
    updateData();
    update();
  }

  useEffect(() => {
    // const svgAux = d3.select(svgRef.current);
    // svgAux.remove("*");
    // const svg = svgAux;

    updateAll();
  }, []);

  return (
    <div className={styles.app}>
      <button onClick={updateAll}>Update data</button>
      <svg ref={svgRef} width={1000}>
        Animation
      </svg>
    </div>
  );
};

export default Animation;
