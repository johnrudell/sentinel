let x;
let y0;
let y1;
let linePrice;
let lineBalance;

const margin = { top: 20, right: 50, bottom: 30, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export const drawShares = data => {

  const parseTime = d3.timeParse("%m/%d/%Y");
  const bisectDate = d3.bisector(d => d.date).left;

  // circle = earned
  // line = valuation(balance?) ( price * num of shares, but this becomes principle/value)
  // bar = shares
  // principle = line off of bar
  // legend only has price
  // const balance = data.Balance.value;


  x = d3.scaleTime()
    .range([0, width]);

  y0 = d3.scaleLinear()
    .range([height, 0]);

  y1 = d3.scaleLinear()
    .range([height, 0]);

  linePrice = d3.line()
    .x(d => x(d.date))
    .y(d => y0(d.price))
    .curve(d3.curveMonotoneX);

  lineBalance = d3.line()
    .x(d => x(d.date))
    .y(d => y1(d.balance))
    .curve(d3.curveMonotoneX);


  let svg = d3.select('#line').append('svg')
    .classed('sharetracking', true)
    .attr('width', "75%")
    .attr('height', "75%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500")
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain([data[0].date, data[data.length - 1].date]);
    // y0.domain(d3.extent(data, d => d.price));
    y0.domain([(data[0].price * 0.95), (data[data.length - 1].price * 1.05)]);
    y1.domain([0, (data[data.length - 1].balance * 1.5)]);

    svg.append('g')
      .attr('class', 'x axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        // .tickFormat(d3.timeFormat("%b %Y")));
        // date format year.month for x axis
        .tickFormat(d3.timeFormat("%m.%y")));

    // x axis line styles
    // d3.selectAll('.axis path')
    //   .style('fill', 'none')
    //   .style('stroke', '#000')
    //   .style('shape-rendering', 'crispEdges');

    // x axis tick styles
    // d3.selectAll('.axis line')
    //   .style('fill', 'none')
    //   .style('stroke', 'blue')
    //   .style('shape-rendering', 'crispEdges');

    svg.append('path')
      .datum(data)
      .attr('class', 'line line0')
      .attr('d', linePrice);

    svg.append('path')
      .datum(data)
      .attr('class', 'line line1')
      .style('stroke', 'none')
      .attr('d', lineBalance);

    const focus0 = svg.append('g')
      .attr('class', 'focus focus0')
      .style('display', 'none');

    focus0.append('circle')
      .classed("circle-earned", true)
      .attr('r', 4.5);

    focus0.append('line')
      .classed('x', true);

    focus0.append('line')
      .classed('y', true);

    focus0.append('text')
      .classed('share-value', true)
      .attr("transform", "translate(-200, -15)")
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

    focus1.append('line')
      .classed('x', true);

    focus1.append('line')
      .classed('y  ', true);

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
        // only hide share-amount focus
        // focus0.style('display', 'none')
        // focus1.style('display', 'none')
      })
      .on('mousemove',
              mousemove);

    d3.selectAll('.line')
      .style('fill', 'none')
      .style('stroke-width', '1.5px');

    d3.select('.line0')
      .style('stroke', 'white');

    d3.selectAll('.overlay')
      .style('fill', 'none')
      .style('pointer-events', 'all');

    d3.selectAll('.focus')
      .style('opacity', 0.7);

    d3.selectAll('.focus circle')
      .style('stroke-dasharray', '3 3')
      .style('fill', 'none')
      .style('stroke', 'black');

    d3.selectAll('.focus1 circle')
      .style('display', 'none');

    d3.selectAll('.focus0 line.x')
      .style('fill', 'none')
      .style('stroke', 'lightgrey')
      .style('stroke-width', '1.5px')
      .style('stroke-dasharray', '3 3');

    d3.selectAll('.focus0 line.y')
      .style('stroke', 'none');

    d3.selectAll('.focus1 line.x')
      // .attr("transform", "translate(-12.5, 0)rotate(180)")
      .style('stroke', 'rgba(37, 66, 62, 1)')
      .style('stroke-dasharray', '3 3');

    d3.selectAll('.focus1 line.y')
      .style('stroke', 'rgba(37, 66, 62, 0.5)')
      .style('stroke-width', '25px')
      .style('stroke-dasharray', '0');

    svg.append('text')
      .attr('class', 'text text0')
      .attr('y', 0);

    svg.append('text')
      .attr('class', 'text text1')
      .attr('y', 20);

    svg.append('text')
      .attr('class', 'text text2')
      .attr('y', 40);

    d3.selectAll('.text')
      .attr('x', 0);



  ///build mouseover attributes

  let x0 = x.invert(d3.mouse(this)[0]);
  let i = bisectDate(data, x0, 1);
  let d0 = data[i - 1];
  let d1 = data[i];
  let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

  d3.selectAll(".focus").selectAll('line.x')
    .attr('x1', 0)
    .attr('x2', -x(d.date))
    .attr('y1', 0)
    .attr('y2', 0);

  d3.select('.text0')
    .text(`price: $${d.price}`);

  d3.select('.text1')
    .text(`balance: $${d.balance}`);

  d3.select('.text2')
    .text(`shares: ${d.shares}`);

  // share value dashed line
  d3.select(".focus0").selectAll('line.x')
    .attr('x2', -x(d.date) - width);

  // share amt dashed line
  d3.select(".focus1").selectAll('line.x')
    .attr('x2', x(d.date) + width * 2);

  d3.selectAll(".focus").selectAll('line.y')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0);

  focus0.select('line.y')
    .attr('y2', height - y0(d.price));
  focus1.select('line.y')
    .attr('y2', height - y1(d.balance));

  if (d.earned < 0) d.earned = 0;

  // circle radius hover for Price
  d3.select(".circle-earned")
    .attr("r", d.earned / 100);

  // append text
  focus0.attr('transform', `translate(${x(d.date)}, ${y0(d.price)})`);
  focus0.select('.share-value').text(`price: $${d.price}`);

  focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.balance)})`);
  // focus1.select('.shares').text(`balance: $${d.balance}`);
  focus1.select('.total-acct-val').text(`balance: $${d.balance}`);

    function mousemove() {

      let x0 = x.invert(d3.mouse(this)[0]);
      let i = bisectDate(data, x0, 1);
      let d0 = data[i - 1];
      let d1 = data[i];
      let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      d3.selectAll(".focus").selectAll('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.date))
        .attr('y1', 0)
        .attr('y2', 0);

      d3.select('.text0')
        .text(`price: $${d.price}`);

      d3.select('.text1')
        .text(`balance: $${d.balance}`);

      d3.select('.text2')
        .text(`shares: ${d.shares}`);

      // share value dashed line
      d3.select(".focus0").selectAll('line.x')
        .attr('x2', -x(d.date) - width);

      // share amt dashed line
      d3.select(".focus1").selectAll('line.x')
        .attr('x2', x(d.date) + width * 2);

      d3.selectAll(".focus").selectAll('line.y')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0);

      focus0.select('line.y')
        .attr('y2', height - y0(d.price));
      focus1.select('line.y')
        .attr('y2', height - y1(d.balance));

      if (d.earned < 0) d.earned = 0;

      // circle radius hover for Price
      d3.select(".circle-earned")
        .attr("r", d.earned / 100);

      // append text
      focus0.attr('transform', `translate(${x(d.date)}, ${y0(d.price)})`);
      focus0.select('.share-value').text(`price: $${d.price}`);

      focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.balance)})`);
      // focus1.select('.shares').text(`balance: $${d.balance}`);
      focus1.select('.total-acct-val').text(`balance: $${d.balance}`);

      // If text gets too low, reposition it beyond date overlap
      // const shares = focus1.select('.shares')
      // if ( (height - y1(d["Shares"]) < 25)) {
      //   shares.attr("transform", "translate(0, 30)rotate(90)")
      // } else {
      //   shares.attr("transform", "translate(0, 15)rotate(90)")
      // }
    }



}

// export const updateData = data => {
//
//   //better strategy is to
//
//
//   x.domain([data[0].date, data[data.length - 1].date]);
//   y0.domain([(data[0].price * 0.95), (data[data.length - 1].price * 1.05)]);
//   y1.domain([0, (data[data.length - 1].balance * 1.5)]);
//
//   let svg = d3.select('#line').transition();
//
//   linePrice = d3.line()
//     .x(d => x(d.date))
//     .y(d => y0(d.price))
//       .curve(d3.curveMonotoneX);
//
//   lineBalance = d3.line()
//     .x(d => x(d.date))
//     .y(d => y1(d.balance))
//       .curve(d3.curveMonotoneX);
//
//   // Make the changes
//   svg.select(".line0")   // change the line
//     .duration(750)
//     .attr("d", linePrice(data));
//
//   svg.select(".line1")   // change the line
//     .duration(750)
//     .attr("d", lineBalance(data));
//
//   svg.select('.x.axis')
//     .duration(750)
//     .call(d3.axisBottom(x));
//
//   //remove
//   // debugger
//   // d3.selectAll('.focus1 line.y').remove();
//   // d3.select('.focus0 line.y').
//   // d3.selectAll('.focus1')
//   //   .enter(data)
//   //   .append('line')
//   //   .classed('y', true)
//   //   .attr('y2', 40);
//
//
//   d3.selectAll('.focus1 line.y')
//     .attr('y2', 0);
//
//   // d3.select('.focus1 line.y').remove();  height - y0(d.price
//
//
//   // focus1.enter()append('line')
//   //   .classed('y  ', true);
//   //
//   //
//   // //update
//   //
//   // svg.select('line.y')
//   //   .attr('y2', height - y0(d.price));
//   // svg.select('line.y')
//   //   .attr('y2', height - y1(d.balance));
//
//
//
//
// }
