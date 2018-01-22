export const drawDistributions = data => {

  const tooltip = d3.select('#pie')
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'label');

  tooltip.append('div')
    .attr('class', 'count');

  tooltip.append('div')
    .attr('class', 'percent');

  const width = 360;
  const height = 360;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal(d3.schemeCategory20c);

  // const color = d3.scaleOrdinal()
  //   .range([
  //     "#2C93E8",
  //     "#838690",
  //     "#F56C4E",
  //     "#C2E812",
  //     "#EFC7C2",
  //     "#7A5C61",
  //     "#7E4E60"
  //   ]);

  const svg = d3.select('#pie')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');

  const donutWidth = 75;

  const arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  const pie = d3.pie()
    .value(function(d) { return d["#Shares"]; })
    .sort(null);

  const legendRectSize = 18;
	const legendSpacing = 4;

  const path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data["Name"]);
    });

  path.on('mouseover', function(d) {
    const total = d3.sum(data.map(function(d) {
      return d["#Shares"];
    }));

    const percent = Math.round(1000 * d.data["#Shares"] / total) / 10;
      tooltip.select('.label').html(d.data["Name"]);
      tooltip.select('.count').html(`${d.data["#Shares"]} shares`);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
  });

  path.on('mouseout', function() {
    tooltip.style('display', 'none');
  });

  const legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      const height = legendRectSize + legendSpacing;
      const offset =  height * color.domain().length / 2;
      const horz = -2 * legendRectSize;
      const vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });

}
