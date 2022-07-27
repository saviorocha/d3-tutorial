import * as d3 from "d3";

class VectorComponent {
  refContainer;
  props;
  svg;
  xScale;
  yScale;

  constructor(refContainer, props) {
    this.refContainer = refContainer;
    this.props = props;
    const { width, height, margin } = props;

    this.svg = d3
      .select(refContainer)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.createChart();
    this.createVector();
  }

  createChart = () => {
    const {
      svg,
      props: { width, height },
    } = this;
    svg
      .append("clipPath")
      .attr("id", "chart-area")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    // Add Axes
    const xMax = 4;
    const yMax = 5;

    this.xScale = d3.scaleLinear([0, xMax], [0, width]);
    this.yScale = d3.scaleLinear([0, yMax], [height, 0]);

    let xAxis = d3.axisBottom(this.xScale);
    let yAxis = d3.axisLeft(this.yScale);
    svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    svg.append("g").attr("transform", `translate(0,0)`).call(yAxis);

    // Axes label
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + 5)
      .attr("y", height + 35)
      .text("x");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", -35)
      .attr("x", -height / 2)
      .attr("transform", "rotate(-90)")
      .html("y");
  };

  createVector = () => {
    const {
      svg,
      props: { data },
    } = this;
    // Add function graph
    let line = d3
      .line()
      .x((d) => this.xScale(d[0]))
      .y((d) => this.yScale(d[1]));
    svg
      .append("path")
      .datum([
        [0, 0],
        [1, 1],
      ])
      // .datum(graphFunction())
      .attr("clip-path", "url(#chart-area)")
      .attr("fill", "none")
      .attr("stroke", "teal")
      .attr("stroke-width", 2)
      .attr("d", line)
      .attr("marker-end", "url(#arrow)");

    let def = svg.append("defs");
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

export default VectorComponent;
