import React from "react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
// import { events } from "d3-selection";

const ZoomPlot = () => {
  // https://observablehq.com/@d3/d3v6-migration-guide#events
  // https://github.com/facebook/react/issues/6641#issuecomment-215469084
  const svgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  useEffect(() => {
    const svgAux = d3.select(svgRef.current);
    svgAux.selectAll("*").remove();
    var svg = svgAux
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //Read the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
    ).then((data) => {
      // Add X axis
      var x = d3.scaleLinear().domain([4, 8]).range([0, width]);
      var xAxis = svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
      var yAxis = svg.append("g").call(d3.axisLeft(y));

      // Add a clipPath: everything out of this area won't be drawn.
      var clip = svg
        .append("defs")
        .append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

      // Create the scatter variable: where both the circles and the brush take place
      var scatter = svg.append("g").attr("clip-path", "url(#clip)");

      // Add circles
      scatter
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.Sepal_Length);
        })
        .attr("cy", function (d) {
          return y(d.Petal_Length);
        })
        .attr("r", 8)
        .style("fill", "#61a3a9")
        .style("opacity", 0.5);

      // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
      var zoom = d3
        .zoom()
        .scaleExtent([0.5, 20]) // This control how much you can unzoom (x0.5) and zoom (x20)
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", updateChart);

      // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
      // now the user can zoom and it will trigger the function called updateChart

      // A function that updates the chart when the user zoom and thus new boundaries are available
      function updateChart(event) {
        // recover the new scale
        var newX = event.transform.rescaleX(x);
        var newY = event.transform.rescaleY(y);

        // update axes with these new boundaries
        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        // update circle position
        scatter
          .selectAll("circle")
          .attr("cx", function (d) {
            return newX(d.Sepal_Length);
          })
          .attr("cy", function (d) {
            return newY(d.Petal_Length);
          });
      }
    });

    return () => {
      // d3.select("#dataviz_basicZoom").select("*").remove();
    };
  }, []);

  //   if (isLoading) {
  //     return <div>Loading</div>;
  //   } else {
  //       return <svg ref={svgRef} id="dataviz_basicZoom"></svg>
  //   }
  return <svg ref={svgRef} id="dataviz_basicZoom"></svg>;
};

export default ZoomPlot;
