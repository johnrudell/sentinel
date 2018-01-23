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
    y1.domain(d3.extent(data, d => d["SHARES"]));

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
      .style('stroke', 'none')
      .attr('d', lineShareNumber);

    const focus0 = svg.append('g')
      .attr('class', 'focus focus0')
      .style('display', 'none');

    focus0.append('circle')
      .attr('r', 4.5);

    focus0.append('line')
      .classed('x', true);

    focus0.append('line')
      .classed('y', true);

    focus0.append('text')
      .classed('share-value', true)
      .attr("transform", "translate(-200, -15)")
      // .attr('x', 9)
      .attr('dy', '.35em');

    focus0.append('text')
      .classed('shares', true)
      .attr('x', 9)
      .attr('y', 16)
      .attr('dy', '.35em');

    focus0.append('text')
      .classed('total-acct-val', true)
      .attr('x', 9)
      .attr('y', 33)
      .attr('dy', '.35em');

    const focus1 = svg.append('g')
      .attr('class', 'focus focus1')
      .style('display', 'none');

    focus1.append('circle')
      .attr('r', 4.5);

    focus1.append('line')
      .classed('x', true);

    focus1.append('line')
      .classed('y', true);

    focus1.append('text')
      .classed('share-value', true)
      .attr("transform", "translate(-225, -15)")
      .attr('dy', '.35em');

    focus1.append('text')
      .classed('shares', true)
      .attr("transform", "translate(0, 15)rotate(90)")
      .attr('dy', '.35em');

    focus1.append('text')
      .classed('total-acct-val', true)
      .attr("transform", "translate(15, -15)")
      .attr('dy', '.35em');


    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        focus0.style('display', null);
        focus1.style('display', null);
      })
      .on('mouseout', () => {
        focus0.style('display', 'none')
        focus1.style('display', 'none')
      })
      .on('mousemove', mousemove);

    // svg.append('rect')
    //   .attr('class', 'overlay0')
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
      .style('stroke-width', '1.5px');

    d3.selectAll('.overlay')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    d3.selectAll('.overlay1')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    d3.selectAll('.focus')
      .style('opacity', 0.7);

    d3.selectAll('.focus circle')
      .style('fill', 'black')
      .style('stroke', 'black');

    d3.selectAll('.focus1 circle')
      .style('fill', 'none')
      .style('stroke', 'none');

    d3.selectAll('.focus0 line.x')
      .style('fill', 'none')
      .style('stroke', 'lightgrey')
      .style('stroke-width', '1.5px')
      .style('stroke-dasharray', '3 3');

    d3.selectAll('.focus0 line.y')
      .style('stroke', 'none');

    d3.selectAll('.focus1 line.x')
      .attr("transform", "translate(-12.5, 0)rotate(180)")
      .style('stroke', 'rgba(37, 66, 62, 1)')
      .style('stroke-dasharray', '3 3');

    d3.selectAll('.focus1 line.y')
      .style('stroke', 'rgba(37, 66, 62, 0.5)')
      .style('stroke-width', '25px')
      .style('stroke-dasharray', '0');

    function mousemove() {
      const x0 = x.invert(d3.mouse(this)[0]);
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
      focus0.attr('transform', `translate(${x(d.DATE)}, ${y0(d["SHARE VALUE"])})`);
      focus0.select('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.DATE))
        .attr('y1', 0)
        .attr('y2', 0);

      focus0.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y0(d["SHARE VALUE"]));

      focus0.select('.share-value').text(`share value: $${d["SHARE VALUE"]}`);

      focus1.attr('transform', `translate(${x(d.DATE)}, ${y1(d["SHARES"])})`);
      focus1.select('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.DATE))
        .attr('y1', 0)
        .attr('y2', 0);

      focus1.select('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', height - y1(d["SHARES"]));

      focus1.select('.shares').text(`${d["SHARES"]} shares`);
      focus1.select('.total-acct-val').text(`total account value: $${d["SHARES"]}`);
    }

}
