'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function TopNumber(Props) {
  var value = Props.value;
  var multiplier = Props.multiplier;
  var onChange = Props.onChange;
  return React.createElement("input", {
              max: "6",
              min: "0",
              type: "number",
              value: String(value === 0 ? value : Caml_int32.div(value, multiplier)),
              onChange: (function ($$event) {
                  var value = $$event.target.value;
                  return Curry._1(onChange, Caml_int32.imul(Caml_format.caml_int_of_string(value), multiplier));
                })
            });
}

var make = TopNumber;

exports.make = make;
/* react Not a pure module */
