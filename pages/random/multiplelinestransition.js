import React, { useEffect } from "react";
import * as d3 from "d3";

const Multiplelinestransition = () => {
  useEffect(() => {
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50,
      },
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // var parseDate = d3.time.format("%Y%m%d").parse;
    var xScale = d3.scaleTime().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    var color = d3.scale.category10();
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    var line = d3.svg
      .line()
      .interpolat("basis")
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.temperature);
      });

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var getNewData = function () {
      var data = [];
      var counter = 0;

      function generate() {
        var startDate = new Date();
        counter += 1;
        var range = counter % 2 === 0 ? 10 : 100;
        for (i = 0; i < 100; i++) {
          data[i] = {
            date: new Date(startDate - i),
            "New York": Math.random() * (range - 1),
            "San Francisco": Math.random() * (range - 1),
            Austin: Math.random() * (range - 10),
          };
        }
        return data;
      }
      return {
        new: function () {
          return generate();
        },
      };
    }; // function getNewData()

    var newData = getNewData();
    data = newData.new();

    color.domain(
      d3.keys(data[0]).filter(function (key) {
        return key !== "date";
      })
    );

    var cities = color.domain().map(function (name) {
      return {
        name: name,
        values: data.map(function (d) {
          return {
            date: d.date,
            temperature: +d[name],
          };
        }),
      };
    });

    xScale.domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    );
    yScale.domain([
      d3.min(cities, function (c) {
        return d3.min(c.values, function (v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function (c) {
        return d3.max(c.values, function (v) {
          return v.temperature;
        });
      }),
    ]);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

    var city = svg
      .selectAll(".city")
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        return line(d.values);
      })
      .style("stroke", function (d) {
        return color(d.name);
      });

    city
      .append("text")
      .datum(function (d) {
        return {
          name: d.name,
          values: d.values[0],
        };
      })
      .attr("class", "label")
      .attr("transform", function (d) {
        return (
          "translate(" +
          xScale(d.values.date) +
          "," +
          yScale(d.values.temperature) +
          ")"
        );
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function (d) {
        return d.name;
      });

    d3.selectAll("button").on("click", change);

    function change() {
      data = newData.new();
      color.domain(
        d3.keys(data[0]).filter(function (key) {
          return key !== "date";
        })
      );
      cities = color.domain().map(function (name) {
        return {
          name: name,
          values: data.map(function (d) {
            return {
              date: d.date,
              temperature: +d[name],
            };
          }),
        };
      });

      xScale.domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      );

      yScale.domain([
        d3.min(cities, function (c) {
          return d3.min(c.values, function (v) {
            return v.temperature;
          });
        }),
        d3.max(cities, function (c) {
          return d3.max(c.values, function (v) {
            return v.temperature;
          });
        }),
      ]);

      var cities = svg.selectAll(".city").data(cities);

      cities
        .select(".line")
        .transition()
        .duration(750)
        .attr("d", function (d) {
          return line(d.values);
        })
        .style("stroke", function (d) {
          return color(d.name);
        });

      cities
        .select(".label")
        .transition()
        .duration(750)
        .attr("transform", function (d) {
          var last = d.values[0];
          return (
            "translate(" +
            xScale(last.date) +
            "," +
            yScale(last.temperature) +
            ")"
          );
        });

      svg.selectAll(".y.axis").transition().duration(750).call(yAxis);

      svg.selectAll(".x.axis").transition().duration(750).call(xAxis);
    }
  }, []);
  return (
    <>
      <br />
      <button type="button"> Request data</button>
      <div id="chart"> </div>
    </>
  );
};

export default Multiplelinestransition;
