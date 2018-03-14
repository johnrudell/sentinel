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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawShares = undefined;

var _util = __webpack_require__(1);

var margin = { top: 20, right: 50, bottom: 30, left: 50 };
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var drawShares = exports.drawShares = function drawShares(data, name) {
  var bisectDate = d3.bisector(function (d) {
    return d.date;
  }).left;

  var x = d3.scaleTime().range([0, width]);
  var y0 = d3.scaleLinear().range([height, 0]);
  var y1 = d3.scaleLinear().range([height, 0]);

  var linePrice = d3.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y0(d.price);
  }).curve(d3.curveMonotoneX);

  var lineBalance = d3.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y1(d.balance);
  }).curve(d3.curveMonotoneX);

  var svg = d3.select('#line').append('svg').classed('sharetracking', true).attr('width', "75%").attr('height', "75%").attr("preserveAspectRatio", "xMinYMin meet").attr("viewBox", "0 0 960 500").append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  x.domain([data[0].date, data[data.length - 1].date]);
  y0.domain([data[0].price * 0.95, data[data.length - 1].price * 1.05]);
  y1.domain([0, data[data.length - 1].balance * 1.5]);

  svg.append('g').attr('class', 'x axis axis--x').attr('transform', 'translate(0, ' + height + ')').call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m.%y")));

  svg.append('path').datum(data).attr('class', 'line line0').attr('d', linePrice);

  svg.append('path').datum(data).attr('class', 'line line1').attr('d', linePrice);

  svg.append('path').datum(data).attr('class', 'line').style('stroke', 'none').attr('d', lineBalance);

  var focus0 = svg.append('g').attr('class', 'focus focus0').style('display', 'none');

  focus0.append('circle').classed("circle-earned", true).attr('r', 4.5);

  focus0.append('line').classed('x', true);
  focus0.append('line').classed('y', true);

  focus0.append('text').classed('price', true).attr("transform", "translate(-200, -15)").attr('dy', '.35em');

  focus0.append('text').classed('earned', true).attr("transform", "translate(-55, -60)").style('fill', 'rgba(9, 82, 86, 1)').attr('dy', '.35em');

  focus0.append('text').classed('shares', true).attr('x', 9).attr('y', 16).attr('dy', '.35em');

  focus0.append('text').classed('balance', true).attr('x', 9).attr('y', 33).attr('dy', '.35em');

  var focus1 = svg.append('g').attr('class', 'focus focus1').style('display', 'none');

  focus1.append('line').classed('x', true);
  focus1.append('line').classed('y  ', true);

  focus1.append('text').classed('price', true).attr("transform", "translate(-225, -15)").attr('dy', '.35em');

  focus1.append('text').classed('shares', true).attr("transform", "translate(0, 15)rotate(90)").attr('dy', '.35em');

  focus1.append('text').classed('balance', true).attr("transform", "translate(15, -15)").attr('dy', '.35em');

  svg.append('rect').attr('class', 'overlay').attr('width', width).attr('height', height).on('mouseover', function () {
    focus0.style('display', null);
    focus1.style('display', null);
  }).on('mousemove', mousemove);

  svg.append('text').attr('class', 'text text0').attr('y', 0);

  svg.append('text').attr('class', 'text text1').attr('y', 20);

  svg.append('text').attr('class', 'text text2').attr('y', 40);

  svg.append('text').attr('class', 'text text3').attr('x', 120).attr('y', 0);

  svg.append('text').attr('class', 'text text4').attr('x', 120).attr('y', 20);

  svg.append('text').attr('class', 'text text5').attr('x', 120).attr('y', 40);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]);
    var i = bisectDate(data, x0, 1);
    var d0 = data[i - 1];
    var d1 = data[i];
    var d = x0 - d0.date > d1.date - x0 ? d1 : d0;

    var balance = (0, _util.numberWithCommas)(d.balance);
    var price = (0, _util.numberWithCommas)(d.price);
    var shares = (0, _util.numberWithCommas)(d.shares);
    var earned = (0, _util.numberWithCommas)(d.earned);
    var principle = (0, _util.numberWithCommas)(d.principle);

    d3.select('.text0').text('' + name);
    d3.select('.text1').text('price: $' + price);
    d3.select('.text2').text('shares: ' + shares);
    d3.select('.text3').text('principle: $' + principle);
    d3.select('.text4').text('earned: $' + earned);
    d3.select('.text5').text('balance: $' + balance);

    d3.selectAll(".focus").selectAll('line.x, line.y').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', 0);

    focus0.selectAll('line.x').attr('x2', -x(d.date) - width);
    focus0.selectAll('line.y').attr('y2', height - y0(d.price));
    focus1.selectAll('line.x').attr('x2', x(d.date) + width * 2);
    focus1.selectAll('line.y').attr('y2', height - y1(d.balance));

    if (d.earned < 0) d.earned = 0;
    focus0.select(".circle-earned").attr("r", d.earned / 300);
    focus1.select('line.y').style('stroke-width', d.shares / 25);

    // append text
    focus0.attr('transform', 'translate(' + x(d.date) + ', ' + y0(d.price) + ')');
    focus0.select('.price').text('price: $' + price);
    focus0.select('.earned').text('$' + earned + ' earned');
    focus1.attr('transform', 'translate(' + x(d.date) + ', ' + y1(d.balance) + ')');
    focus1.select('.balance').text('balance: $' + balance);
    focus1.select('.shares').text(shares + ' shares');
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var numberWithCommas = exports.numberWithCommas = function numberWithCommas(num) {
  return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var loading = exports.loading = function loading() {
  $(".fa-spinner").css("display", "inline-block");
};

var activeButton = exports.activeButton = function activeButton() {
  var btnContainer = document.getElementById("toggle");
  var btns = btnContainer.getElementsByClassName('toggle');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
};

var infoToggle = exports.infoToggle = function infoToggle() {
  $('.toggle-about').on('click', function () {
    $('.about').show();
    $('.company').hide();
    $('.future').hide();
  });

  $('.toggle-company').on('click', function () {
    $('.company').show();
    $('.about').hide();
    $('.future').hide();
  });

  $('.toggle-future').on('click', function () {
    $('.future').show();
    $('.about').hide();
    $('.company').hide();
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _data = __webpack_require__(3);

window.addEventListener('DOMContentLoaded', _data.render);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = undefined;

var _share_tracking = __webpack_require__(0);

var _distributions = __webpack_require__(4);

var _util = __webpack_require__(1);

var publicSpreadsheetUrl = '1Qjl_H4Mf7ChN0UqricRmArzdjIiXQ6fnTIq_OZqKrbU';

var render = exports.render = function render() {
  (0, _util.loading)();
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: draw,
    simpleSheet: false
  });
};

var draw = function draw(data, tabletop) {
  (0, _util.activeButton)();
  (0, _util.infoToggle)();

  $(".fa-spinner").css("display", "none");

  var distributionsData = tabletop.sheets("InterestPurchases").elements;
  (0, _distributions.drawDistributions)(distributionsData);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDistributions = undefined;

var _share_tracking = __webpack_require__(0);

var drawDistributions = exports.drawDistributions = function drawDistributions(distData) {

  var data = d3.nest().key(function (d) {
    return d['Name'];
  }).rollup(function (d) {
    return d3.sum(d, function (g) {
      return g['Shares'];
    });
  }).entries(distData);

  data.forEach(function (d) {
    d.Date = d.Date;
    d['Name'] = d.key;
    d['Shares'] = Math.round(d.value);
  });

  var parseTime = d3.timeParse("%m/%d/%Y");
  var cMonth = new Date().getMonth() + 1;
  var cYear = new Date().getFullYear();

  var startYear = 2017;
  var startMonth = 2;
  var yearDif = cYear - startYear;
  var inc = cMonth + yearDif * 12 - startMonth;
  var arrayDates = [];
  var yearInc = startYear;

  for (var i = 0; i <= inc; i++) {
    var month = startMonth + i;
    var incDate = void 0;
    if (month > 12) {
      month = 1;
      yearInc = startYear + 1;
    }

    incDate = new Date(yearInc + '-' + month + '-02');
    arrayDates.push(incDate);
  }

  var dateMap = function dateMap(person) {
    var personDataFrame = [];
    var nameFilter = void 0;
    var sumValues = void 0;

    if (person === "Total") {
      nameFilter = distData;
    } else {
      nameFilter = _.filter(distData, function (d) {
        return d.Name === person || d.Name === "Valuation";
      });
    }

    var _loop = function _loop(j) {
      var dateComp = arrayDates[j];

      var dateFilter = _.filter(nameFilter, function (d) {
        return new Date(d.Date).getTime() < dateComp.getTime();
      });

      var d = dateFilter.length - 1;
      // get price
      // convert price from string to float for accuracy
      var priceByDate = parseFloat(dateFilter[d]["Price"]);

      var removePrice = _.filter(dateFilter, function (d) {
        return d['Name'] !== 'Valuation';
      });

      // find name, filtered out 'Valuation'
      var namePerson = _.filter(removePrice, function (d) {
        return d['Name'];
      });

      //get shares
      var sumShares = _.reduce(removePrice, function (acc, num) {
        return acc + parseFloat(num["Shares"]);
      }, 0);

      //get principle
      var principle = _.reduce(removePrice, function (acc, num) {
        return acc + parseFloat(num["Value"]);
      }, 0);

      //get earned
      var sumEarned = sumShares * priceByDate - principle;

      //get balance
      var sumBalance = principle + sumEarned;

      var dateObject = {
        date: arrayDates[j],
        earned: sumEarned,
        price: priceByDate,
        shares: sumShares,
        principle: principle,
        balance: sumBalance,
        name: namePerson
      };
      personDataFrame.push(dateObject);
    };

    for (var j = 0; j < arrayDates.length; j++) {
      _loop(j);
    }
    return personDataFrame;
  };

  var arrayOfNames = [];
  for (var _i = 0; _i < data.length; _i++) {
    arrayOfNames.push(data[_i].key);
  }
  arrayOfNames.push("Total");

  var nameDataMapping = function nameDataMapping(array) {
    var arrayOfObjects = {};
    for (var _i2 = 0; _i2 < arrayOfNames.length; _i2++) {
      arrayOfObjects[arrayOfNames[_i2]] = dateMap(arrayOfNames[_i2]);
    }
    return arrayOfObjects;
  };

  var finalData = nameDataMapping(arrayOfNames);

  // render the initial total
  (0, _share_tracking.drawShares)(finalData.Total, "Total Account");

  var tooltip = d3.select('#pie').append('div').attr('class', 'tooltip');

  tooltip.append('div').attr('class', 'label');
  tooltip.append('div').attr('class', 'count');
  tooltip.append('div').attr('class', 'percent');

  var width = 360;
  var height = 360;
  var donutWidth = 75;
  var radius = Math.min(width, height) / 2;
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var svg = d3.select('#pie').append('svg')
  // .attr('width', "75%")
  // .attr('height', "75%")
  // .attr("preserveAspectRatio", "xMinYMin meet")
  // .attr("viewBox", "0 0 360 360")
  .classed('distributions', true).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

  var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);

  var pie = d3.pie().value(function (d) {
    return d["Shares"];
  }).sort(null);

  var arcOver = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius + 10);

  var path = svg.selectAll('path').data(pie(data)).enter().append('path').attr('d', arc).attr('class', 'pie-slice').attr('fill', function (d, i) {
    return color(d.data["Name"]);
  }).on('click', function (d) {
    var filteredData = finalData[d.data.Name];

    d3.select('.sharetracking').remove();
    (0, _share_tracking.drawShares)(filteredData, d.data.Name);
  }).on('mouseover', function (d) {
    var total = d3.sum(data.map(function (d) {
      return d["Shares"];
    }));

    d3.select(this).style('opacity', '1').transition().duration(500).ease(d3.easeBounce).attr('d', arcOver);

    d3.select('.dist-label').style('opacity', '0');

    var percent = Math.round(1000 * d.data["Shares"] / total) / 10;
    tooltip.select('.label').html(d.data["Name"]);
    tooltip.select('.count').html(d.data["Shares"] + ' shares');
    tooltip.select('.percent').html(percent + '%');
    tooltip.style('display', 'flex');
  }).on('mouseout', function () {
    d3.select(this).style('opacity', '0.6');
    d3.select(this).transition().attr('d', arc);
    d3.select('.dist-label').style('opacity', '1');

    tooltip.style('display', 'none');
  });

  var totalButton = d3.select('#pie').append('button').attr('class', 'total-button').text('Total Account').on('click', function (d) {
    d3.select('.sharetracking').remove();
    (0, _share_tracking.drawShares)(finalData.Total, "Total Account");
  });

  var distLabel = d3.select('#pie').append('div').attr('class', 'dist-label').text('Distributions');
};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map