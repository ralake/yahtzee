'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Core = require("@material-ui/core");
var MaterialUi_TableCell = require("@jsiebern/bs-material-ui/src/MaterialUi_TableCell.bs.js");
var MaterialUi_WithStyles = require("@jsiebern/bs-material-ui/src/MaterialUi_WithStyles.bs.js");

function classRecordToJs(param) {
  return {
          lineHeight: param.lineHeight
        };
}

var classes = /* Record */Block.__(0, [{
      lineHeight: {
        lineHeight: "33px"
      }
    }]);

function classRecordStringsFromJs(arg) {
  return {
          lineHeight: arg.lineHeight
        };
}

var StyleOverridesDefs = {
  classRecordToJs: classRecordToJs,
  classRecordStringsFromJs: classRecordStringsFromJs,
  classes: classes
};

var StyleOverrides = MaterialUi_WithStyles.WithStylesSafe(StyleOverridesDefs);

function Cell(Props) {
  var children = Props.children;
  var classes = Curry._1(StyleOverrides.useStyles, undefined);
  return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(children), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* :: */[
                  /* Root */Block.__(0, [classes.lineHeight]),
                  /* [] */0
                ], undefined, undefined));
}

var make = Cell;

exports.StyleOverridesDefs = StyleOverridesDefs;
exports.StyleOverrides = StyleOverrides;
exports.make = make;
/* StyleOverrides Not a pure module */
