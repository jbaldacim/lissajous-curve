import * as d3 from "d3";

const numRows = 5;
const numCols = 5;
const cellSize = 100;
const amplitude = 40;
const dotRadius = 3;
const baseAnimationDuration = 4000;
const circleColors = d3
  .scaleSequential(d3.interpolatePuBu)
  .domain([0, numRows]);

const curveColor = (a, b) => d3.interpolateRgb(a, b)(0.5);

const grid = d3
  .select("#grid")
  .style("display", "grid")
  .style(
    "grid-template-columns",
    `${cellSize}px repeat(${numCols}, ${cellSize}px)`
  )
  .style("gap", "10px");

const step = 0.05;
const generateLissajous = (a, b) => {
  return d3
    .range(0, Math.PI * 2 + step, step)
    .map((t) => [
      cellSize / 2 + amplitude * Math.sin(a * t),
      cellSize / 2 + amplitude * Math.sin(b * t),
    ]);
};

const makeHeaderCircle = (svg, color, frequency) => {
  svg
    .append("circle")
    .attr("cx", cellSize / 2)
    .attr("cy", cellSize / 2)
    .attr("r", amplitude)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 1);

  const dot = svg.append("circle").attr("r", dotRadius).attr("fill", "#ccc");

  const animateDot = () => {
    dot
      .transition()
      .duration(baseAnimationDuration)
      .attrTween("transform", () => {
        return (t) => {
          const angle = t * Math.PI * 2;
          const x = cellSize / 2 + amplitude * Math.cos(angle);
          const y = cellSize / 2 + amplitude * Math.sin(angle);
          return `translate(${x}, ${y})`;
        };
      })
      .on("end", animateDot);
  };
  animateDot();
};

grid
  .append("div")
  .style("width", `${cellSize}px`)
  .style("height", `${cellSize}px`);

for (let col = 1; col <= numCols; col++) {
  const color = circleColors(col - 1);
  const colSvg = grid
    .append("svg")
    .attr("width", cellSize)
    .attr("height", cellSize);

  makeHeaderCircle(colSvg, color);
}
