'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var YahtzeeGame$Yahtzee = require("./YahtzeeGame.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(YahtzeeGame$Yahtzee.make, { }), "Yahtzee");

/*  Not a pure module */
