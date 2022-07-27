import React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import path from "path";
import fs from "fs/promises";

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

const Shapes = ({data}) => {
  const { width, height, margin } = dimensions;

  useEffect(() => {
    console.log(data);
    const svg = d3.select(".svg-shape");
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    return () => {
      svg.select("*").remove();
    };
  }, []);

  return <svg width={width} height={height} className="svg-shape"></svg>;
};

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "aapl-bollinger.csv");
  const csvData = await fs.readFile(filePath);
  return {
    props: {
      data: ""
    }
  }
}

export default Shapes;
