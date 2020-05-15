'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function NumberInput(Props) {
  var value = Props.value;
  var onChange = Props.onChange;
  var max = Props.max;
  var step = Props.step;
  var handleChange = function (e) {
    var value = e.target.value;
    return Curry._1(onChange, value === "" || Caml_int32.mod_(Caml_format.caml_int_of_string(value), step | 0) !== 0 ? undefined : Caml_format.caml_int_of_string(value));
  };
  var value_ = value !== undefined ? String(value) : "";
  return React.createElement("input", {
              max: max,
              min: "0",
              step: step,
              type: "number",
              value: value_,
              onChange: handleChange
            });
}

var make = NumberInput;

exports.make = make;
/* react Not a pure module */
