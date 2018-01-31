import { updateData } from './share_tracking.js';

export const drawDistributions = distData => {
  // debugger
  const data = d3.nest()
    // .key(function(d) { return d.Date; })
    .key(function(d) { return d['Name']; })
    .rollup(function(d) {
     return d3.sum(d, function(g) {return g['Shares']; });
   }).entries(distData);

  data.forEach(function(d) {
    d.Date = d.Date;
    // debugger
    d['Name'] = d.key;
    d['Shares'] = Math.round(d.value);
  });

  const parseTime = d3.timeParse("%m/%d/%Y");

  const cMonth = new Date().getMonth() + 1;
  const cYear = new Date().getFullYear();
  // debugger

  const startYear = 2017;
  let startMonth = 5;
  const yearDif = cYear - startYear;
  const inc = cMonth + yearDif * 12;
  let yearInc = startYear;

  let arrayDates = [];

  for (let i = 0; i < inc; i++) {

    let month = startMonth + i;
    let incDate;
    if (month > 12) {
      month = 1;
      yearInc = startYear + 1;
    }

    incDate =  new Date(`${yearInc}-${month}-02`);

    arrayDates.push(incDate);
  }

  const dateMap = (value, person) => {
    // debugger
    let graphData = [];

    let nameFilter;
    if (person) {
      nameFilter = _.filter(distData, d => {
       return d.Name === person || d.Name === "Valuation";
      });
    }

    for (let i = 0; i < arrayDates.length; i++ ) {
      let dateComp = arrayDates[i];
      const dateFilter = _.filter(nameFilter, d => {
        return new Date(d.Date).getTime() < dateComp.getTime();
      });

      const sumValues = _.reduce(dateFilter, (acc, num) => {
        return parseInt(acc) + parseInt(num[value]);
      }, 0);

      const object = {
         date: arrayDates[i],
         value: sumValues
       }

      graphData.push(object);
    }
    return graphData;
  }
  //
  // const getPrice = () => {
  //
  //   _.filter
  //
  // }

  const findBalance = (obj) => {
  // debugger

    const result = Object.assign(obj[1], obj[2]);
    debugger
    return result;
    // let newArray = _.each(obj, value => {
    //   _.each(value, )
    //   debugger
    //   return value['Principle'] + value['Earned'];
    // });
  }



    // const earningsData = dateMap("Shares", "Matt");
    // const dataByPerson = [];
    const getDataByPerson = name => {
      // debugger
      const dataByPerson = {
        "Shares": dateMap("Shares", name),
        "Principle": dateMap("Value", name),
        "Earned": dateMap("MoneyMade", name),
        //"Balance":
      }

      // dataByPerson.push(dateMap("Shares", name));
      // dataByPerson.push(dateMap("Value", name));
      // dataByPerson.push(dateMap("MoneyMade", name));
      return dataByPerson;
    }
    console.log(getDataByPerson("Matt"))

    const testData = getDataByPerson("Matt")
    findBalance(testData)
    //make price static

//    var principleData = datamap(principle)


  // const function (creates another function for date)

  data.forEach(d => {
    d.Date = parseTime(d.Date);
    // console.log(d.Date)
    d['Name'] = d['Name'];
    d["Shares"] = +d["Shares"];
    d["Price"] = +d["Price"];
  });

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

  // const color = d3.scaleOrdinal(d3.schemeCategory20c);

  const color = d3.scaleOrdinal()
    .range([
      "#2C93E8",
      "#838690",
      "#F56C4E",
      "#C2E812",
      "#EFC7C2",
      "#7A5C61",
      "#7E4E60"
    ]);

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


  const path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .style('opacity', '0.6')
    .attr('fill', function(d, i) {
      return color(d.data["Name"]);
    })
    // .on('click', d => {
    //   console.log(data)
    //   // const month = data.filter(d => d.date.getMonth() === 0);
    //
    //   // debugger
    //   const filteredData = data.filter( (el, idx) => {
    //     // if (idx === 20) {
    //     //
    //     //   debugger
    //     // }
    //     // console.log(data)
    //     return el['Name'] === d.data.Name
    //   })
    //   //   const parseTime = d3.timeParse("%m/%d/%Y");
    //   // filteredData.forEach(d => {
    //   //   d.Date = parseTime(d.Date);
    //   //   d['Name'] = d['Name'];
    //   //   d["Price"] = +d["Price"];
    //   //   d["Shares"] = +d["Shares"];
    //   //   d["Total Account Value"] = +d["Value"];
    //   // });
    //   // console.log(filteredData)
    //   // const data = d3.nest()
    //   //   // .key(function(d) { return d.Date; })
    //   //   .key(function(d) { return d['Name']; })
    //   //   .rollup(function(d) {
    //   //    return d3.sum(d, function(g) {return g['Shares']; });
    //   //  }).entries(distData);
    //   // debugger
    //   updateData(filteredData);
    // })
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

  // const legendRectSize = 18;
  // const legendSpacing = 4;

  // const legend = svg.selectAll('.legend')
  //   .data(color.domain())
  //   .enter()
  //   .append('g')
  //   .attr('class', 'legend')
  //   .attr('transform', function(d, i) {
  //     const height = legendRectSize + legendSpacing;
  //     const offset =  height * color.domain().length / 2;
  //     const horz = -2 * legendRectSize;
  //     const vert = i * height - offset;
  //     return 'translate(' + horz + ',' + vert + ')';
  //   });
  //
  // legend.append('rect')
  //   .attr('width', legendRectSize)
  //   .attr('height', legendRectSize)
  //   .style('fill', color);
  //
  // legend.append('text')
  //   .attr('x', legendRectSize + legendSpacing)
  //   .attr('y', legendRectSize - legendSpacing)
  //   .text(function(d) { return d; });

  // const distData =

  // function updateData(distData) {
  //   const parseTime = d3.timeParse("%m/%d/%Y");
  //
  //   distData.forEach(d => {
  //     d.Date = parseTime(d.Date);
  //     d["Price"] = +d["Price"];
  //     d["Shares"] = +d["Shares"];
  //     d["Value"] = +d["Total Account Value"];
  //   });
  //
  //   // Scale the range of the distData again
  //   x.domain([distData[0].Date, distData[distData.length - 1].Date]);
  //   y0.domain(d3.extent(distData, d => d["Price"]));
  //   y1.domain(d3.extent(distData, d => d["Shares"]));
  //
  //   // Select the section we want to apply our changes to
  //   let svg = d3.select('#line').transition();
  //
  //
  //   const lineShareValue = d3.line()
  //     .x(d => x(d.Date))
  //     .y(d => y0(d["Price"]))
  //     .curve(d3.curveMonotoneX);
  //
  //   const lineShareNumber = d3.line()
  //     .x(d => x(d.Date))
  //     .y(d => y1(d["Shares"]))
  //     .curve(d3.curveMonotoneX);
  //
  //   // Make the changes
  //   svg.select(".line0")   // change the line
  //       .duration(750)
  //       .attr("d", lineShareValue(distData));
  //
  //   svg.select(".line1")   // change the line
  //       .duration(750)
  //       .attr("d", lineShareNumber(distData));
  //
  //   svg.select('.x.axis')
  //     .duration(750)
  //     .call(d3.axisBottom(x));
  // }

}
