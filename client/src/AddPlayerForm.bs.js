'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var TextInput$Yahtzee = require("./TextInput.bs.js");

function AddPlayerForm(Props) {
  var onSubmit = Props.onSubmit;
  var match = React.useState((function () {
          return "";
        }));
  var setValue = match[1];
  var value = match[0];
  return React.createElement("div", undefined, React.createElement(TextInput$Yahtzee.make, {
                  value: value,
                  onChange: Curry.__1(setValue)
                }), React.createElement("button", {
                  disabled: value === "",
                  onClick: (function (param) {
                      return Curry._1(onSubmit, value);
                    })
                }, "Add player"));
}

var make = AddPlayerForm;

exports.make = make;
/* react Not a pure module */
