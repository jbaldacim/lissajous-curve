d3.select("#slider-delta").attr("max", `${2 * Math.PI}`);
d3.select("#slider-delta").attr("value", Math.PI / 2);

function drawLissajousCurve(elementId, A, B, a, b, delta, duration) {
  const width = 500;
  const height = width;
  const padding = width * 0.05;

  const svg = d3
    .select(elementId)
    .attr("class", "svg-container")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const xScale = d3
    .scaleLinear()
    .domain([-A, A])
    .range([0 + padding, width * A - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([-B, B])
    .range([height * B - padding, 0 + padding]);

  const step = 0.01;
  const points = d3
    .range(0, duration + step, step)
    .map((t) => [
      xScale(A * Math.sin(a * t + delta)),
      yScale(B * Math.sin(b * t)),
    ]);

  const line = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1]);

  const path = svg
    .append("path")
    .datum(points)
    .attr("fill", "none")
    .attr("stroke", "firebrick")
    .attr("stroke-width", 2.5)
    .attr("d", line)
    .attr(
      "transform",
      `translate(${(width * (1 - A)) / 2}, ${(height * (1 - B)) / 2})`
    );

  path
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween("stroke-dasharray", function () {
      const length = this.getTotalLength();
      return d3.interpolate(`0,${length}`, `${length},${length}`);
    });
}

function drawPlaygroundGraph() {
  d3.select("#playground-graph svg").remove();
  const A = +document.getElementById("slider-A").value;
  const B = +document.getElementById("slider-B").value;
  const a = +document.getElementById("slider-a").value;
  const b = +document.getElementById("slider-b").value;
  const delta = +document.getElementById("slider-delta").value;
  drawLissajousCurve("#playground-graph", A, B, a, b, delta, 2 * Math.PI);
}

window.onload = () => {
  document.getElementById("slider-delta").setAttribute("max", 2 * Math.PI);
  document.getElementById("slider-delta").setAttribute("value", Math.PI / 2);
  document.getElementById("slider-a").setAttribute("value", 1);
  document.getElementById("slider-b").setAttribute("value", 1);
  document.getElementById("slider-A").setAttribute("value", 1);
  document.getElementById("slider-B").setAttribute("value", 1);
  drawPlaygroundGraph();
};
