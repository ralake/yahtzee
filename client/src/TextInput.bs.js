'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function TextInput(Props) {
  var value = Props.value;
  var onChange = Props.onChange;
  return React.createElement("input", {
              type: "text",
              value: value,
              onChange: (function (e) {
                  return Curry._1(onChange, e.target.value);
                })
            });
}

var make = TextInput;

exports.make = make;
/* react Not a pure module */
