'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Styles$Yahtzee = require("./Styles.bs.js");
var Core = require("@material-ui/core");
var MaterialUi_Button = require("@jsiebern/bs-material-ui/src/MaterialUi_Button.bs.js");
var MaterialUi_TextField = require("@jsiebern/bs-material-ui/src/MaterialUi_TextField.bs.js");

function AddPlayerForm(Props) {
  var onSubmit = Props.onSubmit;
  var match = React.useState((function () {
          return "";
        }));
  var setValue = match[1];
  var value = match[0];
  return React.createElement("div", {
              className: Styles$Yahtzee.addPlayerForm
            }, React.createElement(Core.TextField, MaterialUi_TextField.makeProps(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, (function (e) {
                        return Curry._1(setValue, e.target.value);
                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* `String */[
                      -976970511,
                      value
                    ], undefined, undefined, undefined, undefined, undefined, undefined)), React.createElement(Core.Button, MaterialUi_Button.makeProps(undefined, undefined, undefined, undefined, (function (param) {
                        Curry._1(onSubmit, value);
                        return Curry._1(setValue, (function (param) {
                                      return "";
                                    }));
                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Add player", undefined, /* Inherit */-72987685, undefined, value === "", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* Outlined */-28821822, undefined, undefined, undefined, undefined, undefined)));
}

var make = AddPlayerForm;

exports.make = make;
/* react Not a pure module */
