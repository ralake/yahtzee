'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Styles$Yahtzee = require("./Styles.bs.js");
var Core = require("@material-ui/core");
var MaterialUi_Button = require("@jsiebern/bs-material-ui/src/MaterialUi_Button.bs.js");
var MaterialUi_TextField = require("@jsiebern/bs-material-ui/src/MaterialUi_TextField.bs.js");
var MaterialUi_WithStyles = require("@jsiebern/bs-material-ui/src/MaterialUi_WithStyles.bs.js");

function classRecordToJs(param) {
  return {
          color: param.color
        };
}

var classes = /* Record */Block.__(0, [{
      color: {
        color: "#ffffff"
      }
    }]);

function classRecordStringsFromJs(arg) {
  return {
          color: arg.color
        };
}

var StyleOverridesDefs = {
  classRecordToJs: classRecordToJs,
  classRecordStringsFromJs: classRecordStringsFromJs,
  classes: classes
};

var StyleOverrides = MaterialUi_WithStyles.WithStylesSafe(StyleOverridesDefs);

function AddPlayerForm(Props) {
  var onSubmit = Props.onSubmit;
  var classes = Curry._1(StyleOverrides.useStyles, undefined);
  var match = React.useState((function () {
          return "";
        }));
  var setValue = match[1];
  var value = match[0];
  return React.createElement("div", {
              className: Styles$Yahtzee.addPlayerForm
            }, React.createElement(Core.TextField, MaterialUi_TextField.makeProps(undefined, undefined, undefined, undefined, undefined, undefined, /* Secondary */67972948, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, (function (e) {
                        return Curry._1(setValue, e.target.value);
                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* `String */[
                      -976970511,
                      value
                    ], undefined, undefined, undefined, /* :: */[
                      /* Root */[classes.color],
                      /* [] */0
                    ], undefined, undefined)), React.createElement(Core.Button, MaterialUi_Button.makeProps(undefined, undefined, undefined, undefined, (function (param) {
                        Curry._1(onSubmit, value);
                        return Curry._1(setValue, (function (param) {
                                      return "";
                                    }));
                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Add player", undefined, /* Inherit */-72987685, undefined, value === "", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* Outlined */-28821822, undefined, undefined, undefined, undefined, undefined)));
}

var make = AddPlayerForm;

exports.StyleOverridesDefs = StyleOverridesDefs;
exports.StyleOverrides = StyleOverrides;
exports.make = make;
/* StyleOverrides Not a pure module */
