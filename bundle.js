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

window.addEventListener('DOMContentLoaded', _data.init);

// $(document).ready(function(){
//
//
//
// });

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _share_tracking = __webpack_require__(2);

var _distributions = __webpack_require__(3);

var publicSpreadsheetUrl = '1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU';

// https://docs.google.com/spreadsheets/d/1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU/edit?usp=sharing


var init = exports.init = function init() {
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

  // const displayData = [];
  // for (let i = 0; i < shareTracking.length; i++) {
  //   displayData.push(shareTracking[i]);
  //   // displayData.push(data[i]["TOTAL ACCOUNT VALUE"]);
  // }
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

  var parseTime = d3.timeParse('%d-%b-%y');
  var bisectDate = d3.bisector(function (d) {
    return d.DATE;
  }).left;
  // const formatValue = d3.format(',.2f');
  // const formatCurrency = d => `$${formatValue(d)}`;
  // debugger
  // d3.select('body')
  //   .style('font', '10px sans-serif')

  data.forEach(function (d) {
    d.DATE = parseTime(d.DATE);
    d["SHARE VALUE"] = +d["SHARE VALUE"];
  });

  var x = d3.scaleLinear().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  var line = d3.line().x(function (d) {
    // debugger
    return x(d.DATE);
  }).y(function (d) {
    // debugger
    return y(d["SHARE VALUE"]);
  });

  var svg = d3.select('body').append('svg').classed('sharetracking', true).attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");

  x.domain([data[0].DATE, data[data.length - 1].DATE]);
  y.domain(d3.extent(data, function (d) {
    return d["SHARE VALUE"];
  }));

  svg.append('g').attr('class', 'x axis axis--x').attr('transform', "translate(0, " + height + ")").call(d3.axisBottom(x));

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

  // .text('Price ($)');

  // style the axes
  d3.selectAll('.axis path').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');
  // .styles({
  //   fill: 'none',
  //   stroke: '#000',
  //   'shape-rendering': 'crispEdges'
  // });

  d3.selectAll('.axis line').style('fill', 'none').style('stroke', '#000').style('shape-rendering', 'crispEdges');
  // .styles({
  //   fill: 'none',
  //   stroke: '#000',
  //   'shape-rendering': 'crispEdges'
  // });

  // d3.selectAll('.axis--x path')
  //   .style('display', 'none');

  svg.append('path').datum(data).attr('class', 'line').attr('d', line);

  var focus = svg.append('g').attr('class', 'focus').style('display', 'none');

  focus.append('circle').attr('r', 4.5);

  focus.append('line').classed('x', true);

  focus.append('line').classed('y', true);

  focus.append('text').classed('share-value', true).attr('x', 9).attr('dy', '.35em');

  focus.append('text').classed('shares', true).attr('x', 9).attr('y', 16).attr('dy', '.35em');

  focus.append('text').classed('total-acct-val', true).attr('x', 9).attr('y', 33).attr('dy', '.35em');

  svg.append('rect').attr('class', 'overlay').attr('width', width).attr('height', height).on('mouseover', function () {
    return focus.style('display', null);
  }).on('mouseout', function () {
    return focus.style('display', 'none');
  }).on('mousemove', mousemove);

  d3.selectAll('.line').style('fill', 'none').style('stroke', 'rgba(24, 31, 28, 1)').style('stroke-width', '1.5px');

  d3.select('.overlay').style('fill', 'none').style('pointer-events', 'all');

  d3.selectAll('.focus').style('opacity', 0.7);

  d3.selectAll('.focus circle').style('fill', 'none').style('stroke', 'black');

  d3.selectAll('.focus line').style('fill', 'none').style('stroke', 'black').style('stroke-width', '1.5px').style('stroke-dasharray', '3 3');

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisectDate(data, x0, 1);
    var d0 = data[i - 1];
    var d1 = data[i];
    var d = x0 - d0.DATE > d1.DATE - x0 ? d1 : d0;
    focus.attr('transform', "translate(" + x(d.DATE) + ", " + y(d["SHARE VALUE"]) + ")");
    focus.select('line.x').attr('x1', 0).attr('x2', -x(d.DATE)).attr('y1', 0).attr('y2', 0);

    focus.select('line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', height - y(d["SHARE VALUE"]));

    focus.select('.share-value').text("share value: " + d["SHARE VALUE"]);
    focus.select('.shares').text("shares: " + d["SHARES"]);
    focus.select('.total-acct-val').text("total account value: $" + d["TOTAL ACCOUNT VALUE"]);
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

  // var svg = d3.select("svg"),
  //   width = +svg.attr("width"),
  //   height = +svg.attr("height"),
  //   radius = Math.min(width, height) / 2,
  //   g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  //
  // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  //
  // var pie = d3.pie()
  //     .sort(null)
  //     .value(function(d) { return d.population; });
  //
  // var path = d3.arc()
  //     .outerRadius(radius - 10)
  //     .innerRadius(0);
  //
  // var label = d3.arc()
  //     .outerRadius(radius - 40)
  //     .innerRadius(radius - 40);
  //
  // d3.csv("data.csv", function(d) {
  //   d.population = +d.population;
  //   return d;
  // }, function(error, data) {
  //   if (error) throw error;
  //
  //   var arc = g.selectAll(".arc")
  //     .data(pie(data))
  //     .enter().append("g")
  //       .attr("class", "arc");
  //
  //   arc.append("path")
  //       .attr("d", path)
  //       .attr("fill", function(d) { return color(d.data.age); });
  //
  //   arc.append("text")
  //       .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
  //       .attr("dy", "0.35em")
  //       .text(function(d) { return d.data.age; });
  // });
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map