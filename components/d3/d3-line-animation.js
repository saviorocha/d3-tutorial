import * as d3 from "d3";
class LineComponent {
  svg;
  props;
  refComponent;
  x;
  y;
  xAxis;
  yAxis;

  constructor(refComponent, props) {
    this.props = props;
    const { width, height, margin, data1 } = props;
    this.refComponent = refComponent;
    this.svg = d3
      .select(refComponent)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    this.createAxis(width, height);
    this.update(data1);
  }

  createAxis = (width, height) => {
    // Initialise a X axis:
    this.x = d3.scaleLinear().range([0, width]);
    this.xAxis = d3.axisBottom().scale(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "myXaxis");

    // Initialize an Y axis
    this.y = d3.scaleLinear().range([height, 0]);
    this.yAxis = d3.axisLeft().scale(this.y);
    this.svg.append("g").attr("class", "myYaxis");
  };

  update = (data) => {
    console.log("data", data);
    // Create the X axis:
    this.x.domain([
      0,
      d3.max(this.data, function (d) {
        return d.ser1;
      }),
    ]);
    this.svg.selectAll(".myXaxis").transition().duration(3000).call(this.xAxis);

    // create the Y axis
    this.y.domain([
      0,
      d3.max(data, function (d) {
        return d.ser2;
      }),
    ]);
    this.svg.selectAll(".myYaxis").transition().duration(3000).call(this.yAxis);

    // Create a update selection: bind to the new data
    const u = this.svg.selectAll(".lineTest").data([data], function (d) {
      return d.ser1;
    });

    // Updata the line
    u.join("path")
      .attr("class", "lineTest")
      .transition()
      .duration(3000)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.ser1);
          })
          .y(function (d) {
            return y(d.ser2);
          })
      )
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5);
  };
}

export default LineComponent;
