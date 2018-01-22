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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(1);

window.addEventListener('DOMContentLoaded', _data.render);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _share_tracking = __webpack_require__(2);

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

  $(".fa-spinner").css("display", "none");
  var shareTracking = tabletop.sheets("John Copy of ShareTracking").elements;
  var distributions = tabletop.sheets("John Copy of InterestPurchases").elements;

  (0, _share_tracking.drawShares)(shareTracking);
  (0, _distributions.drawDistributions)(distributions);
};

var loading = function loading() {
  $(".fa-spinner").css("display", "inline-block");
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawShares = exports.drawShares = function drawShares(data) {

  var margin = { top: 20, right: 50, bottom: 30, left: 50 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var parseTime = d3.timeParse("%m/%d/%Y");
  var bisectDate = d3.bisector(function (d) {
    return d.DATE;
  }).left;

  data.forEach(function (d) {
    d.DATE = parseTime(d.DATE);
    d["SHARE VALUE"] = +d["SHARE VALUE"];
    d["SHARES"] = +d["SHARES"];
  });

  var x = d3.scaleTime().range([0, width]);

  var y0 = d3.scaleLinear().range([height, 0]);

  var y1 = d3.scaleLinear().range([height, 0]);

  var lineShareValue = d3.line().x(function (d) {
    return x(d.DATE);
  }).y(function (d) {
    return y0(d["SHARE VALUE"]);
  }).curve(d3.curveMonotoneX);

  var lineShareNumber = d3.line().x(function (d) {
    return x(d.DATE);
  }).y(function (d) {
    return y1(d["SHARES"]);
  }).curve(d3.curveMonotoneX);

  var svg = d3.select('#line').append('svg').classed('sharetracking', true).attr('width', "75%").attr('height', "75%").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 960 500").append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");

  x.domain([data[0].DATE, data[data.length - 1].DATE]);
  y0.domain(d3.extent(data, function (d) {
    return d["SHARE VALUE"];
  }));
  // y1.domain(d3.extent(data, d => d["SHARES"]));

  svg.append('g').attr('class', 'x axis axis--x').attr('transform', "translate(0, " + height + ")").call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y")));

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
  d3.selectAll('.axis path').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

  d3.selectAll('.axis line').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');

  // d3.selectAll('.axis--x path')
  //   .style('display', 'none');

  svg.append('path').datum(data).attr('class', 'line0').attr('d', lineShareValue);

  svg.append('path').datum(data).attr('class', 'line1').style('stroke', 'purple').attr('d', lineShareNumber);

  var focus = svg.append('g').attr('class', 'focus').style('display', 'none');

  focus.append('circle').attr('r', 4.5);

  focus.append('line').classed('x', true);

  focus.append('line').classed('y', true);

  focus.append('text').classed('share-value', true).attr("transform", "translate(-200, -15)")
  // .attr('x', 9)
  .attr('dy', '.35em');

  focus.append('text').classed('shares', true).attr('x', 9).attr('y', 16).attr('dy', '.35em');

  focus.append('text').classed('total-acct-val', true).attr('x', 9).attr('y', 33).attr('dy', '.35em');

  svg.append('rect').attr('class', 'overlay0').attr('width', width).attr('height', height).on('mouseover', function () {
    return focus.style('display', null);
  }).on('mouseout', function () {
    return focus.style('display', 'none');
  }).on('mousemove', mousemove0);

  // svg.append('rect')
  //   .attr('class', 'overlay1')
  //   .attr('width', width)
  //   .attr('height', height)
  //   .on('mouseover', () => focus.style('display', null))
  //   .on('mouseout', () => focus.style('display', 'none'))
  //   .on('mousemove', mousemove1);

  d3.select('.line0').style('fill', 'none').style('stroke', 'white').style('stroke-width', '1.5px');

  d3.select('.line1').style('fill', 'none').style('stroke', 'purple').style('stroke-width', '1.5px');

  d3.selectAll('.overlay0').style('fill', 'none').style('pointer-events', 'all');

  d3.selectAll('.overlay1').style('fill', 'none').style('pointer-events', 'all');

  d3.selectAll('.focus').style('opacity', 0.7);

  d3.selectAll('.focus circle').style('fill', 'none').style('stroke', 'black');

  d3.selectAll('.focus line').style('fill', 'none').style('stroke', 'black').style('stroke-width', '1.5px').style('stroke-dasharray', '3 3');

  // Remove stroke right on Share Value line
  d3.selectAll('.focus .y');
  // .style('stroke-width', '0px');

  function mousemove0() {
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisectDate(data, x0, 1);
    var d0 = data[i - 1];
    var d1 = data[i];
    var d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
    focus.attr('transform', "translate(" + x(d.DATE) + ", " + y0(d["SHARE VALUE"]) + ")");
    focus.select('line.x').attr('x1', 0).attr('x2', -x(d.DATE)).attr('y1', 0).attr('y2', 0);

    focus.select('line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', height - y0(d["SHARE VALUE"]));

    focus.select('.share-value').text("share value: " + d["SHARE VALUE"]);
    focus.select('.shares').text("shares: " + d["SHARES"]);
    focus.select('.total-acct-val').text("total account value: $" + d["TOTAL ACCOUNT VALUE"]);
  }

  function mousemove1() {
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisectDate(data, x0, 1);
    var d0 = data[i - 1];
    var d1 = data[i];
    var d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
    focus.attr('transform', "translate(" + x(d.DATE) + ", " + y1(d["SHARES"]) + ")");
    focus.select('line.x').attr('x1', 0).attr('x2', -x(d.DATE)).attr('y1', 0).attr('y2', 0);

    focus.select('line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', height - y1(d["SHARES"]));

    // focus.select('.share-value').text(`share value: ${d["SHARE VALUE"]}`);
    focus.select('.shares').text("shares: " + d["SHARES"]);
    // focus.select('.total-acct-val').text(`total account value: $${d["TOTAL ACCOUNT VALUE"]}`);
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawDistributions = exports.drawDistributions = function drawDistributions(data) {

  var tooltip = d3.select('#pie').append('div').attr('class', 'tooltip');

  tooltip.append('div').attr('class', 'label');

  tooltip.append('div').attr('class', 'count');

  tooltip.append('div').attr('class', 'percent');

  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal(d3.schemeCategory20c);

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

  var svg = d3.select('#pie').append('svg')
  // .attr('width', "75%")
  // .attr('height', "75%")
  // .attr("preserveAspectRatio", "xMinYMin meet")
  // .attr("viewBox", "0 0 360 360")
  .attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  var donutWidth = 75;

  var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

  var pie = d3.pie().value(function (d) {
    return d["#Shares"];
  }).sort(null);

  var legendRectSize = 18;
  var legendSpacing = 4;

  var path = svg.selectAll('path').data(pie(data)).enter().append('path').attr('d', arc).attr('fill', function (d, i) {
    return color(d.data["Name"]);
  });

  path.on('mouseover', function (d) {
    var total = d3.sum(data.map(function (d) {
      return d["#Shares"];
    }));

    var percent = Math.round(1000 * d.data["#Shares"] / total) / 10;
    tooltip.select('.label').html(d.data["Name"]);
    tooltip.select('.count').html(d.data["#Shares"] + ' shares');
    tooltip.select('.percent').html(percent + '%');
    tooltip.style('display', 'block');
  });

  path.on('mouseout', function () {
    tooltip.style('display', 'none');
  });

  var legend = svg.selectAll('.legend').data(color.domain()).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
    var height = legendRectSize + legendSpacing;
    var offset = height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

  legend.append('rect').attr('width', legendRectSize).attr('height', legendRectSize).style('fill', color).style('stroke', color);

  legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).text(function (d) {
    return d;
  });
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map