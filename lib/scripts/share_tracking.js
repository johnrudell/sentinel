export const drawShares = data => {

  const margin = { top: 20, right: 50, bottom: 30, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const parseTime = d3.timeParse("%m/%d/%Y");
  const bisectDate = d3.bisector(d => d.DATE).left;

  data.forEach(d => {
    d.DATE = parseTime(d.DATE);
    d["SHARE VALUE"] = +d["SHARE VALUE"];
    d["SHARES"] = +d["SHARES"];
  });

  const x = d3.scaleTime()
    .range([0, width]);

  const y0 = d3.scaleLinear()
    .range([height, 0]);

  const y1 = d3.scaleLinear()
    .range([height, 0]);

  const lineShareValue = d3.line()
    .x(d => x(d.DATE))
    .y(d => y0(d["SHARE VALUE"]))
    .curve(d3.curveMonotoneX);

  const lineShareNumber = d3.line()
    .x(d => x(d.DATE))
    .y(d => y1(d["SHARES"]))
    .curve(d3.curveMonotoneX);



  const svg = d3.select('#line').append('svg')
    .classed('sharetracking', true)
    .attr('width', "75%")
    .attr('height', "75%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500")
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain([data[0].DATE, data[data.length - 1].DATE]);
    y0.domain(d3.extent(data, d => d["SHARE VALUE"]));
    // y1.domain(d3.extent(data, d => d["SHARES"]));

    svg.append('g')
      .attr('class', 'x axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%b %Y")));

    // y axis

    // svg.append('g')
    //   .attr('class', 'y axis axis--y')
    //   .call(d3.axisLeft(y))
    //   .append('text')
    //     .attr('class', 'axis-title')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('y', 6)
    //     .attr('dy', '.71em')
    //     .style('text-anchor', 'end');

    // style the axes
    d3.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    d3.selectAll('.axis line')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges');

    // d3.selectAll('.axis--x path')
    //   .style('display', 'none');

    svg.append('path')
      .datum(data)
      .attr('class', 'line0')
      .attr('d', lineShareValue);

    svg.append('path')
      .datum(data)
      .attr('class', 'line1')
      .style('stroke', 'purple')
      .attr('d', lineShareNumber);

    const focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle')
      .attr('r', 4.5);

    focus.append('line')
      .classed('x', true);

    focus.append('line')
      .classed('y', true);

    focus.append('text')
      .classed('share-value', true)
      .attr("transform", "translate(-200, -15)")
      // .attr('x', 9)
      .attr('dy', '.35em');

    focus.append('text')
      .classed('shares', true)
      .attr('x', 9)
      .attr('y', 16)
      .attr('dy', '.35em');

    focus.append('text')
      .classed('total-acct-val', true)
      .attr('x', 9)
      .attr('y', 33)
      .attr('dy', '.35em');


    svg.append('rect')
      .attr('class', 'overlay0')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'))
      .on('mousemove', mousemove0);

    // svg.append('rect')
    //   .attr('class', 'overlay1')
    //   .attr('width', width)
    //   .attr('height', height)
    //   .on('mouseover', () => focus.style('display', null))
    //   .on('mouseout', () => focus.style('display', 'none'))
    //   .on('mousemove', mousemove1);

    d3.select('.line0')
      .style('fill', 'none')
      .style('stroke', 'white')
      .style('stroke-width', '1.5px');

    d3.select('.line1')
      .style('fill', 'none')
      .style('stroke', 'purple')
      .style('stroke-width', '1.5px');

    d3.selectAll('.overlay0')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    d3.selectAll('.overlay1')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    d3.selectAll('.focus')
      .style('opacity', 0.7);

    d3.selectAll('.focus circle')
      .style('fill', 'none')
      .style('stroke', 'black');

    d3.selectAll('.focus line')
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', '1.5px')
      .style('stroke-dasharray', '3 3');

    // Remove stroke right on Share Value line
    d3.selectAll('.focus .y')
      // .style('stroke-width', '0px');

    function mousemove0() {
      const x0 = x.invert(d3.mouse(this)[0]);
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
      focus.attr('transform', `translate(${x(d.DATE)}, ${y0(d["SHARE VALUE"])})`);
      focus.select('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.DATE))
        .attr('y1', 0)
        .attr('y2', 0);

      focus.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y0(d["SHARE VALUE"]));

      focus.select('.share-value').text(`share value: ${d["SHARE VALUE"]}`);
      focus.select('.shares').text(`shares: ${d["SHARES"]}`);
      focus.select('.total-acct-val').text(`total account value: $${d["TOTAL ACCOUNT VALUE"]}`);
    }

    function mousemove1() {
      const x0 = x.invert(d3.mouse(this)[0]);
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
      focus.attr('transform', `translate(${x(d.DATE)}, ${y1(d["SHARES"])})`);
      focus.select('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.DATE))
        .attr('y1', 0)
        .attr('y2', 0);

      focus.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y1(d["SHARES"]));

      // focus.select('.share-value').text(`share value: ${d["SHARE VALUE"]}`);
      focus.select('.shares').text(`shares: ${d["SHARES"]}`);
      // focus.select('.total-acct-val').text(`total account value: $${d["TOTAL ACCOUNT VALUE"]}`);
    }

}
