import { drawShares, updateData } from './share_tracking.js';

export const drawDistributions = distData => {

  const data = d3.nest()
    // .key(function(d) { return d.Date; })
    .key(function(d) { return d['Name']; })
    .rollup(function(d) {
     return d3.sum(d, function(g) {return g['Shares']; });
   }).entries(distData);

  data.forEach(function(d) {
    d.Date = d.Date;
    //
    d['Name'] = d.key;
    d['Shares'] = Math.round(d.value);
  });

  const parseTime = d3.timeParse("%m/%d/%Y");

  const cMonth = new Date().getMonth() + 1;
  const cYear = new Date().getFullYear();

  const startYear = 2017;
  let startMonth = 2;
  const yearDif = cYear - startYear;
  const inc =  cMonth + yearDif * 12 - startMonth;
  let yearInc = startYear;

  let arrayDates = [];

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

  // const getBalance = (obj) => {
  //   obj["Balance"] = [];
  //
  //   for (let i = 0; i < obj["Earned"].length; i++) {
  //     // debugger
  //     const price = obj["Price"][i].value;
  //     const shares = obj["Shares"][i].value;
  //
  //     // obj["Balance"][i] = {"date": obj["Earned"][i].date , "value": obj["Earned"][i].value + obj["Principle"][i].value }
  //   }
  //   // shares * price = balance // earned + prinicple = balance
  //   return price * shares;
  // }

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

    // const getValueDataByDate = valueArray => {

      for (let j = 0; j < arrayDates.length; j++ ) {
        let dateComp = arrayDates[j];
        // debugger
        const dateFilter = _.filter(nameFilter, d => {
          // debugger
          return new Date(d.Date).getTime() < dateComp.getTime();
        });
        // debugger
        //get price
          let d = dateFilter.length - 1;
          // convert price from string to int
          // debugger
          const PriceByDate = parseFloat(dateFilter[d]["Price"]);
          // debugger

        //get other values
          const removePrice = _.filter(dateFilter, d => {
            return d['Name'] !== 'Valuation';
          });
          // debugger
            //get shares
            const sumShares = _.reduce(removePrice, (acc, num) => {
              return acc + parseFloat(num["Shares"]);
            }, 0);
              // debugger

            //get principle
            const principle = _.reduce(removePrice, (acc, num) => {
              return acc + parseFloat(num["Value"]);
            }, 0);
              // debugger

            //get Earned
            const sumEarned = (sumShares * PriceByDate) - principle
              // debugger

            //get balance
            const sumBalance = principle+sumEarned;

          const dateObject = {
            date: arrayDates[j],
            earned: sumEarned,
            price:  PriceByDate,
            shares:   sumShares,
            principle: principle,
            balance: sumBalance,
          }
        personDataFrame.push(dateObject)
      }

    return personDataFrame;
  }

    let arrayOfNames = [];
    for (let i = 0; i < data.length; i++) {
      arrayOfNames.push(data[i].key)
    }
    arrayOfNames.push("Total")

    const nameDataMapping = array => {
      const arrayOfObjects = {};
      for (let i = 0; i < arrayOfNames.length; i++) {
        arrayOfObjects[arrayOfNames[i]] = dateMap(arrayOfNames[i]);
      }
      return arrayOfObjects;
    }

    const finalData = nameDataMapping(arrayOfNames)

    // Find the total property
    // const total = Object.keys(finalData)
    //   .filter(key => key === "Total")
    //   .reduce((obj, key) => {
    //     obj[key] = finalData[key];
    //     return obj;
    // }, {});


    // const changeData = (data, changedVal) => {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].hasOwnProperty("value")) {
    //       data[i][changedVal] = data[i]["value"];
    //       delete data[i]["value"];
    //     }
    //   }
    // }

    // debugger
    // console.log(total);
    // debugger
    drawShares(finalData.Total);

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

  const color = d3.scaleOrdinal(d3.schemeCategory20);
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

  const svg = d3.select('#pie').append('svg')
    // .attr('width', "75%")
    // .attr('height', "75%")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 360 360")
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
    .value(function(d) { return d["Shares"]; })
    .sort(null);

// debugger
  const path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .style('opacity', '0.6')
    .attr('fill', function(d, i) {
      return color(d.data["Name"]);
    })
    .on('click', d => {
      const filteredData = finalData[d.data.Name];
      d3.select('.sharetracking').remove();
      drawShares(filteredData);
      // d3.select('.circle-earned')
      //   .style('background', 'red')
      //   .transition();
    })
    .on('mouseover', function(d) {
    const total = d3.sum(data.map(function(d) {
      return d["Shares"];
    }));
    d3.select(this).style('opacity', '1');
    d3.select('.dist-label').style('opacity', '0');

    const percent = Math.round(1000 * d.data["Shares"] / total) / 10;
      tooltip.select('.label').html(d.data["Name"]);
      tooltip.select('.count').html(`${d.data["Shares"]} shares`);
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'flex');
  })
  .on('mouseout', function() {
    d3.select(this).style('opacity', '0.6')
    d3.select('.dist-label').style('opacity', '1');
    tooltip.style('display', 'none');
  });

  const distLabel = d3.select('#pie')
    .append('div')
    .attr('class', 'dist-label')
    .text('Distributions');

}
