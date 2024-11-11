function drawLissajousCurve(elementId, A, B, a, b, delta, duration) {
  const width = 80;
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
    .attr("stroke-width", 1)
    .attr("d", line);

  path
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween("stroke-dasharray", function () {
      const length = this.getTotalLength();
      return d3.interpolate(`0,${length}`, `${length},${length}`);
    });
}
