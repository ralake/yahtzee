'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var YahtzeeGame$ReasonReactExamples = require("./YahtzeeGame.bs.js");

ReactDOMRe.renderToElementWithId(React.createElement(YahtzeeGame$ReasonReactExamples.make, { }), "root");

/*  Not a pure module */
