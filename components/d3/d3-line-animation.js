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
    this.updateData(data1);
    this.createVector();
  }

  createAxis = (width, height) => {
    // Initialise a X axis:
    // this.x = d3.scaleLinear().range([width - 100, 100]);
    this.x = d3.scaleLinear().range([0, width]);
    this.xAxis = d3.axisBottom().scale(this.x);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "myXaxis");

    // Initialize an Y axis
    // this.y = d3.scaleLinear().range([height - 100, 100]);
    this.y = d3.scaleLinear().range([height, 0]);
    this.yAxis = d3.axisLeft().scale(this.y);
    this.svg.append("g").attr("class", "myYaxis");
  };

  updateData = (data) => {
    const maxX = d3.max(data, function (d) {
      return d.ser1;
    });
    const minX = d3.min(data, function (d) {
      return d.ser1;
    });
    const maxY = d3.max(data, function (d) {
      return d.ser2;
    });
    const minY = d3.min(data, function (d) {
      return d.ser2;
    });

    const defaultMax = 5;
    const defaultMin = 0;

    // Create the X axis:
    this.x.domain([
      minX < defaultMin ? minX : defaultMin,
      maxX > defaultMax ? maxX : defaultMax,
    ]);
    this.svg.selectAll(".myXaxis").transition().duration(3000).call(this.xAxis);

    // create the Y axis
    this.y.domain([
      minY < defaultMin ? minY : defaultMin,
      maxY > defaultMax ? maxY : defaultMax,
    ]);
    this.svg.selectAll(".myYaxis").transition().duration(3000).call(this.yAxis);

    // Create a update selection: bind to the new data
    const u = this.svg.selectAll(".lineTest").data([data], function (d) {
      return d.ser1;
    });
    // console.log("u: ", u)
    let x = this.x,
      y = this.y;
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
      .attr("clip-path", "url(#chart-area)")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");
    // .attr("clip-path", "url(#chart-area)")
    // .attr("fill", "none")
    // .attr("stroke", "teal")
    // .attr("stroke-width", 2)
    // .attr("d", line)
    // .attr("marker-end", "url(#arrow)");
  };

  createVector = () => {
    let def = this.svg.append("defs");
    def = def.append("marker");
    def = def
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "12")
      .attr("markerHeight", "12")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "6")
      .attr("refY", "6")
      .attr("orient", "auto");
    def
      .append("path")
      .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      .style("fill", "teal");
  };
}

export default LineComponent;
