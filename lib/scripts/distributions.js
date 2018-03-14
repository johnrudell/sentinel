import { drawShares } from './share_tracking.js';

export const drawDistributions = distData => {

  const data = d3.nest()
    .key(function(d) { return d['Name']; })
    .rollup(function(d) {
     return d3.sum(d, function(g) {return g['Shares']; });
   }).entries(distData);

  data.forEach(d => {
    d.Date = d.Date;
    d['Name'] = d.key;
    d['Shares'] = Math.round(d.value);
  });

  const parseTime = d3.timeParse("%m/%d/%Y");
  const cMonth = new Date().getMonth() + 1;
  const cYear = new Date().getFullYear();

  const startYear = 2017;
  const startMonth = 2;
  const yearDif = cYear - startYear;
  const inc =  cMonth + yearDif * 12 - startMonth;
  const arrayDates = [];
  let yearInc = startYear;

  for (let i = 0; i <= inc; i++) {
    let month = startMonth + i;
    let incDate;
    if (month > 12) {
      month = 1;
      yearInc = startYear + 1;
    }

    incDate =  new Date(`${yearInc}-${month}-02`);
    arrayDates.push(incDate);
  }

  const dateMap = person => {
    let personDataFrame = [];
    let nameFilter;
    let sumValues;

    if (person === "Total") {
      nameFilter = distData;
    } else {
      nameFilter = _.filter(distData, d => {
        return d.Name === person || d.Name === "Valuation";
      });
    }

    for (let j = 0; j < arrayDates.length; j++ ) {
      let dateComp = arrayDates[j];

      const dateFilter = _.filter(nameFilter, d => {
        return new Date(d.Date).getTime() < dateComp.getTime();
      });

      let d = dateFilter.length - 1;
      // get price
      // convert price from string to float for accuracy
      const priceByDate = parseFloat(dateFilter[d]["Price"]);

      const removePrice = _.filter(dateFilter, d => {
        return d['Name'] !== 'Valuation';
      });

      // find name, filtered out 'Valuation'
      const namePerson = _.filter(removePrice, d => {
        return d['Name'];
      });

      //get shares
      const sumShares = _.reduce(removePrice, (acc, num) => {
        return acc + parseFloat(num["Shares"]);
      }, 0);

      //get principle
      const principle = _.reduce(removePrice, (acc, num) => {
        return acc + parseFloat(num["Value"]);
      }, 0);

      //get earned
      const sumEarned = (sumShares * priceByDate) - principle;

      //get balance
      const sumBalance = principle + sumEarned;

      const dateObject = {
        date: arrayDates[j],
        earned: sumEarned,
        price:  priceByDate,
        shares:   sumShares,
        principle: principle,
        balance: sumBalance,
        name: namePerson
      }
      personDataFrame.push(dateObject)
    }
    return personDataFrame;
  }

  let arrayOfNames = [];
  for (let i = 0; i < data.length; i++) {
    arrayOfNames.push(data[i].key);
  }
  arrayOfNames.push("Total");

  const nameDataMapping = array => {
    const arrayOfObjects = {};
    for (let i = 0; i < arrayOfNames.length; i++) {
      arrayOfObjects[arrayOfNames[i]] = dateMap(arrayOfNames[i]);
    }
    return arrayOfObjects;
  }

  const finalData = nameDataMapping(arrayOfNames);

  // render the initial total
  drawShares(finalData.Total, "Total Account");

  const tooltip = d3.select('#pie')
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div').attr('class', 'label');
  tooltip.append('div').attr('class', 'count');
  tooltip.append('div').attr('class', 'percent');

  const width = 360;
  const height = 360;
  const donutWidth = 75;
  const radius = Math.min(width, height) / 2;
  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const svg = d3.select('#pie').append('svg')
    // .attr('width', "75%")
    // .attr('height', "75%")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 360 360")
    .classed('distributions', true)
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');


  const arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  const pie = d3.pie()
    .value(function(d) { return d["Shares"]; })
    .sort(null);

  const arcOver = d3.arc()
      .innerRadius(radius - donutWidth)
      .outerRadius(radius + 10);

  const path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('class', 'pie-slice')
    .attr('fill', function(d, i) {
      return color(d.data["Name"]);
    })
    .on('click', d => {
      const filteredData = finalData[d.data.Name];

      d3.select('.sharetracking').remove();
      drawShares(filteredData, d.data.Name);
    })
    .on('mouseover', function(d) {
      const total = d3.sum(data.map(d => {
        return d["Shares"];
      }));

      d3.select(this)
        .style('opacity', '1')
        .transition()
        .duration(500)
        .ease(d3.easeBounce)
        .attr('d', arcOver);

      d3.select('.dist-label').style('opacity', '0');

      const percent = Math.round(1000 * d.data["Shares"] / total) / 10;
      tooltip.select('.label').html(d.data["Name"]);
      tooltip.select('.count').html(`${d.data["Shares"]} shares`);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'flex');
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', '0.6')
      d3.select(this).transition().attr('d', arc);
      d3.select('.dist-label').style('opacity', '1');

      tooltip.style('display', 'none');
    });

    const totalButton = d3.select('#pie')
      .append('button')
      .attr('class', 'total-button')
      .text('Total Account')
      .on('click', d => {
        d3.select('.sharetracking').remove();
        drawShares(finalData.Total, "Total Account");
      });

    const distLabel = d3.select('#pie')
      .append('div')
      .attr('class', 'dist-label')
      .text('Distributions');

}
