import { numberWithCommas } from './util';

const margin = { top: 20, right: 50, bottom: 30, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

export const drawShares = (data, name) => {
  const parseTime = d3.timeParse("%m/%d/%Y");
  const bisectDate = d3.bisector(d => d.date).left;

  const x = d3.scaleTime()
    .range([0, width]);

  const y0 = d3.scaleLinear()
    .range([height, 0]);

  const y1 = d3.scaleLinear()
    .range([height, 0]);

  const linePrice = d3.line()
    .x(d => x(d.date))
    .y(d => y0(d.price))
    .curve(d3.curveMonotoneX);

  const lineBalance = d3.line()
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
    y0.domain([(data[0].price * 0.95), (data[data.length - 1].price * 1.05)]);
    y1.domain([0, (data[data.length - 1].balance * 1.5)]);

    svg.append('g')
      .attr('class', 'x axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%m.%y")));

    svg.append('path')
      .datum(data)
      .attr('class', 'line line0')
      .attr('d', linePrice);

    svg.append('path')
      .datum(data)
      .attr('class', 'line line1')
      .attr('d', linePrice);

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
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
      .classed('price', true)
      .attr("transform", "translate(-200, -15)")
      .attr('dy', '.35em');

    focus0.append('text')
      .classed('earned', true)
      .attr("transform", "translate(-55, -60)")
      .style('fill', 'rgba(9, 82, 86, 1)')
      .attr('dy', '.35em');

    focus0.append('text')
      .classed('shares', true)
      .attr('x', 9)
      .attr('y', 16)
      .attr('dy', '.35em');

    focus0.append('text')
      .classed('balance', true)
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
      .classed('price', true)
      .attr("transform", "translate(-225, -15)")
      .attr('dy', '.35em');

    focus1.append('text')
      .classed('shares', true)
      .attr("transform", "translate(0, 15)rotate(90)")
      .attr('dy', '.35em');

    focus1.append('text')
      .classed('balance', true)
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
      .on('mousemove', mousemove);

    d3.selectAll('.line')
      .style('fill', 'none');

    // earnings background scale line
    d3.select('.line0')
      .style('stroke', 'rgba(23, 163, 152, 0.5)');

    // main price line
    d3.select('.line1')
      .style('stroke', 'white')
      .style('stroke-width', '1.5px');

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
      .style('stroke', 'rgba(37, 66, 62, 1)')
      .style('stroke-dasharray', '3 3');

    d3.selectAll('.focus1 line.y')
      .style('stroke', 'rgba(37, 66, 62, 0.5)')
      .style('stroke-width', '25px')
      .style('stroke-dasharray', '0');

    d3.selectAll('.text')
      .attr('x', 0);

    svg.append('text')
      .attr('class', 'text text0')
      .attr('fill', 'black')
      .attr('y', 0);

    svg.append('text')
      .attr('class', 'text text1')
      .style('fill', 'rgba(37, 66, 62, 1)')
      .attr('y', 20);

    svg.append('text')
      .attr('class', 'text text2')
      .style('fill', 'rgba(37, 66, 62, 1)')
      .attr('y', 40);

    svg.append('text')
      .attr('class', 'text text3')
      .style('fill', 'rgba(37, 66, 62, 1)')
      .attr('x', 120)
      .attr('y', 0);

    svg.append('text')
      .attr('class', 'text text4')
      .style('fill', 'rgba(37, 66, 62, 1)')
      .attr('x', 120)
      .attr('y', 20);

    svg.append('text')
      .attr('class', 'text text5')
      .style('fill', 'rgba(37, 66, 62, 1)')
      .attr('x', 120)
      .attr('y', 40);



    function mousemove() {

      let x0 = x.invert(d3.mouse(this)[0]);
      let i = bisectDate(data, x0, 1);
      let d0 = data[i - 1];
      let d1 = data[i];
      let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      const balance = numberWithCommas(Math.floor(d.balance));
      const price = numberWithCommas(Math.floor(d.price));
      const shares = numberWithCommas(Math.floor(d.shares));
      const earned = numberWithCommas(Math.floor(d.earned));
      const principle = numberWithCommas(Math.floor(d.principle));

      d3.selectAll(".focus").selectAll('line.x')
        .attr('x1', 0)
        .attr('x2', -x(d.date))
        .attr('y1', 0)
        .attr('y2', 0);

      d3.select('.text0')
        .text(`${name}`);

      d3.select('.text1')
        .text(`price: $${price}`);

      d3.select('.text2')
        .text(`shares: ${shares}`);

      d3.select('.text3')
        .text(`principle: $${principle}`);

      d3.select('.text4')
        .text(`earned: $${earned}`);

      d3.select('.text5')
        .text(`balance: $${balance}`);

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

      // add way to how earnings as a funnel rendering, not entire stroke
      // d3.select(".line0")
      //   .style('stroke-width', d.earned / 150);

      // circle radius hover for Price
      d3.select(".circle-earned")
        .attr("r", d.earned / 300);

      // bar width hover for shares
      d3.select('.focus1 line.y')
        .style('stroke-width', d.shares / 25);

      // append text
      focus0.attr('transform', `translate(${x(d.date)}, ${y0(d.price)})`);
      focus0.select('.price').text(`price: $${price}`);
      focus0.select('.earned').text(`$${earned} earned`);

      focus1.attr('transform', `translate(${x(d.date)}, ${y1(d.balance)})`);
      focus1.select('.balance').text(`balance: $${balance}`);


      focus1.select('.shares').text(`${shares} shares`);
    }

}
