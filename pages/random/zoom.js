import React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
// import { events } from "d3-selection";

const Zoom = () => {
  // https://observablehq.com/@d3/d3v6-migration-guide#events
  // https://github.com/facebook/react/issues/6641#issuecomment-215469084
  const svgRef = useRef(null)
  useEffect(() => {
    const svgAux = d3.select(svgRef.current);
    svgAux.selectAll("*").remove();
    var svg = svgAux
      .attr("width", 460)
      .attr("height", 460)
      .call(
        d3.zoom().on("zoom", function (event) {
          svg.attr("transform", event.transform);
        })
      )
      .append("g");
    // console.log("event", d3.event);
    svg
      .append("circle")
      .attr("cx", 300)
      .attr("cy", 300)
      .attr("r", 40)
      .style("fill", "#68b2a1");

    return () => {
      // d3.select("#dataviz_basicZoom").select("*").remove();
    };
  }, []);

  return <svg ref={svgRef} id="dataviz_basicZoom"></svg>;
};

export default Zoom;
