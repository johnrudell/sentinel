/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var x = void 0;
var y0 = void 0;
var y1 = void 0;
var lineShareValue = void 0;
var lineShareNumber = void 0;

var drawShares = exports.drawShares = function drawShares(data) {

  var margin = { top: 20, right: 50, bottom: 30, left: 50 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var parseTime = d3.timeParse("%m/%d/%Y");
  var bisectDate = d3.bisector(function (d) {
    return d.Date;
  }).left;

  data.forEach(function (d) {
    d.Date = parseTime(d.Date);
    d["Price"] = +d["Price"];
    d["Shares"] = +d["Shares"];
  });

  x = d3.scaleTime().range([0, width]);

  y0 = d3.scaleLinear().range([height, 0]);

  y1 = d3.scaleLinear().range([height, 0]);

  lineShareValue = d3.line().x(function (d) {
    return x(d.Date);
  }).y(function (d) {
    return y0(d["Price"]);
  }).curve(d3.curveMonotoneX);

  lineShareNumber = d3.line().x(function (d) {
    return x(d.Date);
  }).y(function (d) {
    return y1(d["Shares"]);
  }).curve(d3.curveMonotoneX);

  var svg = d3.select('#line').append('svg').classed('sharetracking', true).attr('width', "75%").attr('height', "75%").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 960 500").append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");

  x.domain([data[0].Date, data[data.length - 1].Date]);
  y0.domain(d3.extent(data, function (d) {
    return d["Price"];
  }));
  y1.domain(d3.extent(data, function (d) {
    return d["Shares"];
  }));

  svg.append('g').attr('class', 'x axis axis--x').attr('transform', "translate(0, " + height + ")").call(d3.axisBottom(x)
  // .tickFormat(d3.timeFormat("%b %Y")));
  // date format year.month for x axis
  .tickFormat(d3.timeFormat("%y.%m")));

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

  svg.append('path').datum(data).attr('class', 'line line0').attr('d', lineShareValue);

  svg.append('path').datum(data).attr('class', 'line line1').style('stroke', 'none').attr('d', lineShareNumber);

  var focus0 = svg.append('g').attr('class', 'focus focus0').style('display', 'none');

  focus0.append('circle').classed("price-circle", true).attr('r', 4.5);

  focus0.append('line').classed('x', true);

  focus0.append('line').classed('y', true);

  focus0.append('text').classed('share-value', true).attr("transform", "translate(-200, -15)").attr('dy', '.35em');

  focus0.append('text').classed('shares', true).attr('x', 9).attr('y', 16).attr('dy', '.35em');

  focus0.append('text').classed('total-acct-val', true).attr('x', 9).attr('y', 33).attr('dy', '.35em');

  var focus1 = svg.append('g').attr('class', 'focus focus1').style('display', 'none');

  focus1.append('line').classed('x', true);

  focus1.append('line').classed('y', true);

  focus1.append('text').classed('share-value', true).attr("transform", "translate(-225, -15)").attr('dy', '.35em');

  focus1.append('text').classed('shares', true).attr("transform", "translate(0, 15)rotate(90)").attr('dy', '.35em');

  focus1.append('text').classed('total-acct-val', true).attr("transform", "translate(15, -15)").attr('dy', '.35em');

  svg.append('rect').attr('class', 'overlay').attr('width', width).attr('height', height).on('mouseover', function () {
    focus0.style('display', null);
    focus1.style('display', null);
  }).on('mouseout', function () {
    // only hide share-amount focus
    focus1.style('display', 'none');
  }).on('mousemove', mousemove);

  d3.selectAll('.line').style('fill', 'none').style('stroke-width', '1.5px');

  d3.select('.line0').style('stroke', 'white');

  d3.selectAll('.overlay').style('fill', 'none').style('pointer-events', 'all');

  d3.selectAll('.focus').style('opacity', 0.7);

  d3.selectAll('.focus circle').style('stroke-dasharray', '3 3').style('fill', 'none').style('stroke', 'black');

  d3.selectAll('.focus1 circle').style('display', 'none');

  d3.selectAll('.focus0 line.x').style('fill', 'none').style('stroke', 'lightgrey').style('stroke-width', '1.5px').style('stroke-dasharray', '3 3');

  d3.selectAll('.focus0 line.y').style('stroke', 'none');

  d3.selectAll('.focus1 line.x')
  // .attr("transform", "translate(-12.5, 0)rotate(180)")
  .style('stroke', 'rgba(37, 66, 62, 1)').style('stroke-dasharray', '3 3');

  d3.selectAll('.focus1 line.y').style('stroke', 'rgba(37, 66, 62, 0.5)').style('stroke-width', '25px').style('stroke-dasharray', '0');

  svg.append('text').attr('class', 'text text0').attr('y', 0);

  svg.append('text').attr('class', 'text text1').attr('y', 20);

  svg.append('text').attr('class', 'text text2').attr('y', 40);

  d3.selectAll('.text').attr('x', 0);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisectDate(data, x0, 1);
    var d0 = data[i - 1];
    var d1 = data[i];
    var d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;

    d3.selectAll(".focus").selectAll('line.x').attr('x1', 0).attr('x2', -x(d.Date)).attr('y1', 0).attr('y2', 0);

    d3.select('.text0').text("price: $" + d.Price);

    d3.select('.text1').text("shares: " + d.Shares);

    d3.select('.text2').text("total account value: $" + d['Total Account Value']);

    // share value dashed line
    d3.select(".focus0").selectAll('line.x').attr('x2', -x(d.Date) - width);

    // share amt dashed line
    d3.select(".focus1").selectAll('line.x').attr('x2', x(d.Date) + width * 2);

    d3.selectAll(".focus").selectAll('line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0);

    focus0.select('line.y').attr('y2', height - y0(d["Price"]));
    focus1.select('line.y').attr('y2', height - y1(d["Shares"]));

    // circle radius hover for Price
    d3.select(".price-circle").attr("r", (d.Price - 75) * 3);

    // append text
    focus0.attr('transform', "translate(" + x(d.Date) + ", " + y0(d["Price"]) + ")");
    focus0.select('.share-value').text("share value: $" + d["Price"]);

    focus1.attr('transform', "translate(" + x(d.Date) + ", " + y1(d["Shares"]) + ")");
    focus1.select('.shares').text(d["Shares"] + " shares");
    focus1.select('.total-acct-val').text("total account value: $" + d["Total Account Value"]);

    // If text gets too low, reposition it beyond date overlap
    var shares = focus1.select('.shares');
    if (height - y1(d["Shares"]) < 25) {
      shares.attr("transform", "translate(0, 30)rotate(90)");
    } else {
      shares.attr("transform", "translate(0, 15)rotate(90)");
    }
  }
};

var updateData = exports.updateData = function updateData(distData) {
  var parseTime = d3.timeParse("%m/%d/%Y");
  // console.log(distData)
  // debugger

  distData.forEach(function (d) {
    d["Price"] = +d["Price"];
    d["Shares"] = +d["Shares"];
    d["Total Account Value"] = parseInt(d["Value"]);
  });
  console.log(distData);

  // debugger

  // Scale the range of the distData again
  x.domain([distData[0].Date, distData[distData.length - 1].Date]);
  y0.domain(d3.extent(distData, function (d) {
    return d["Price"];
  }));
  y1.domain(d3.extent(distData, function (d) {
    return d["Shares"];
  }));

  // Select the section we want to apply our changes to
  var svg = d3.select('#line').transition();

  var lineShareValue = d3.line().x(function (d) {
    return x(d.Date);
  }).y(function (d) {
    return y0(d["Price"]);
  }).curve(d3.curveMonotoneX);

  var lineShareNumber = d3.line().x(function (d) {
    return x(d.Date);
  }).y(function (d) {
    return y1(d["Shares"]);
  }).curve(d3.curveMonotoneX);

  // Make the changes
  svg.select(".line0") // change the line
  .duration(750).attr("d", lineShareValue(distData));

  svg.select(".line1") // change the line
  .duration(750).attr("d", lineShareNumber(distData));

  svg.select('.x.axis').duration(750).call(d3.axisBottom(x));
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(2);

window.addEventListener('DOMContentLoaded', _data.render);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _share_tracking = __webpack_require__(0);

var _distributions = __webpack_require__(3);

var publicSpreadsheetUrl = '1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU';

var render = exports.render = function render() {
  loading();
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: draw,
    simpleSheet: false
  });
};

var draw = function draw(data, tabletop) {

  // const update = document.getElementById('update');
  // $(update).on('click', () => {
  //   updateData
  // });


  $(".fa-spinner").css("display", "none");
  var shareTracking = tabletop.sheets("John Copy of ShareTracking").elements;
  var distributions = tabletop.sheets("TestInterestPurchases").elements;

  (0, _share_tracking.drawShares)(shareTracking);
  (0, _distributions.drawDistributions)(distributions);
};

var loading = function loading() {
  $(".fa-spinner").css("display", "inline-block");
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDistributions = undefined;

var _share_tracking = __webpack_require__(0);

var drawDistributions = exports.drawDistributions = function drawDistributions(distData) {
  // debugger
  var data = d3.nest()
  // .key(function(d) { return d.Date; })
  .key(function (d) {
    return d['Name'];
  }).rollup(function (d) {
    return d3.sum(d, function (g) {
      return g['Shares'];
    });
  }).entries(distData);

  data.forEach(function (d) {
    d.Date = d.Date;
    // debugger
    d['Name'] = d.key;
    d['Shares'] = Math.round(d.value);
  });

  var parseTime = d3.timeParse("%m/%d/%Y");

  var cMonth = new Date().getMonth() + 1;
  var cYear = new Date().getFullYear();
  // debugger

  var startYear = 2017;
  var startMonth = 5;
  var yearDif = cYear - startYear;
  var inc = cMonth + yearDif * 12;
  var yearInc = startYear;

  var arrayDates = [];

  for (var i = 0; i < inc; i++) {

    var month = startMonth + i;
    var incDate = void 0;
    if (month > 12) {
      month = 1;
      yearInc = startYear + 1;
    }

    incDate = new Date(yearInc + '-' + month + '-02');

    arrayDates.push(incDate);
  }

  var dateMap = function dateMap(value, person) {
    // debugger
    var graphData = [];

    var nameFilter = void 0;
    if (person) {
      nameFilter = _.filter(distData, function (d) {
        return d.Name === person || d.Name === "Valuation";
      });
    }

    var _loop = function _loop(_i) {
      var dateComp = arrayDates[_i];
      var dateFilter = _.filter(nameFilter, function (d) {
        return new Date(d.Date).getTime() < dateComp.getTime();
      });

      var sumValues = _.reduce(dateFilter, function (acc, num) {
        return parseInt(acc) + parseInt(num[value]);
      }, 0);

      var object = {
        date: arrayDates[_i],
        value: sumValues
      };

      graphData.push(object);
    };

    for (var _i = 0; _i < arrayDates.length; _i++) {
      _loop(_i);
    }
    return graphData;
  };
  //
  // const getPrice = () => {
  //
  //   _.filter
  //
  // }

  var findBalance = function findBalance(obj) {
    // debugger

    var result = Object.assign(obj[1], obj[2]);
    debugger;
    return result;
    // let newArray = _.each(obj, value => {
    //   _.each(value, )
    //   debugger
    //   return value['Principle'] + value['Earned'];
    // });
  };

  // const earningsData = dateMap("Shares", "Matt");
  // const dataByPerson = [];
  var getDataByPerson = function getDataByPerson(name) {
    // debugger
    var dataByPerson = {
      "Shares": dateMap("Shares", name),
      "Principle": dateMap("Value", name),
      "Earned": dateMap("MoneyMade", name)
      //"Balance":


      // dataByPerson.push(dateMap("Shares", name));
      // dataByPerson.push(dateMap("Value", name));
      // dataByPerson.push(dateMap("MoneyMade", name));
    };return dataByPerson;
  };
  console.log(getDataByPerson("Matt"));

  var testData = getDataByPerson("Matt");
  findBalance(testData);
  //make price static

  //    var principleData = datamap(principle)


  // const function (creates another function for date)

  data.forEach(function (d) {
    d.Date = parseTime(d.Date);
    // console.log(d.Date)
    d['Name'] = d['Name'];
    d["Shares"] = +d["Shares"];
    d["Price"] = +d["Price"];
  });

  var tooltip = d3.select('#pie').append('div').attr('class', 'tooltip');

  tooltip.append('div').attr('class', 'label');

  tooltip.append('div').attr('class', 'count');

  tooltip.append('div').attr('class', 'percent');

  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;

  // const color = d3.scaleOrdinal(d3.schemeCategory20c);

  var color = d3.scaleOrdinal().range(["#2C93E8", "#838690", "#F56C4E", "#C2E812", "#EFC7C2", "#7A5C61", "#7E4E60"]);

  var svg = d3.select('#pie').append('svg')
  // .attr('width', "75%")
  // .attr('height', "75%")
  // .attr("preserveAspectRatio", "xMinYMin meet")
  // .attr("viewBox", "0 0 360 360")
  .attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  var donutWidth = 75;

  var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

  var pie = d3.pie().value(function (d) {
    return d["Shares"];
  }).sort(null);

  var path = svg.selectAll('path').data(pie(data)).enter().append('path').attr('d', arc).style('opacity', '0.6').attr('fill', function (d, i) {
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
  .on('mouseover', function (d) {
    var total = d3.sum(data.map(function (d) {
      return d["Shares"];
    }));
    d3.select(this).style('opacity', '1');
    d3.select('.dist-label').style('opacity', '0');

    var percent = Math.round(1000 * d.data["Shares"] / total) / 10;
    tooltip.select('.label').html(d.data["Name"]);
    tooltip.select('.count').html(d.data["Shares"] + ' shares');
    tooltip.select('.percent').html(percent + '%');
    tooltip.style('display', 'flex');
  }).on('mouseout', function () {
    d3.select(this).style('opacity', '0.6');
    d3.select('.dist-label').style('opacity', '1');
    tooltip.style('display', 'none');
  });

  var distLabel = d3.select('#pie').append('div').attr('class', 'dist-label').text('Distributions');

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
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map