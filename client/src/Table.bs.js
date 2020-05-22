'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var MaterialUi_Table = require("@jsiebern/bs-material-ui/src/MaterialUi_Table.bs.js");
var Core = require("@material-ui/core");
var MaterialUi_WithStyles = require("@jsiebern/bs-material-ui/src/MaterialUi_WithStyles.bs.js");

function classRecordToJs(param) {
  return {
          width: param.width
        };
}

var classes = /* Record */Block.__(0, [{
      width: {
        width: "initial"
      }
    }]);

function classRecordStringsFromJs(arg) {
  return {
          width: arg.width
        };
}

var StyleOverridesDefs = {
  classRecordToJs: classRecordToJs,
  classRecordStringsFromJs: classRecordStringsFromJs,
  classes: classes
};

var StyleOverrides = MaterialUi_WithStyles.WithStylesSafe(StyleOverridesDefs);

function Table(Props) {
  var children = Props.children;
  var classes = Curry._1(StyleOverrides.useStyles, undefined);
  return React.createElement(Core.Table, MaterialUi_Table.makeProps(Caml_option.some(children), undefined, undefined, undefined, /* Small */311976103, undefined, undefined, undefined, undefined, /* :: */[
                  /* Root */Block.__(0, [classes.width]),
                  /* [] */0
                ], undefined, undefined));
}

var make = Table;

exports.StyleOverridesDefs = StyleOverridesDefs;
exports.StyleOverrides = StyleOverrides;
exports.make = make;
/* StyleOverrides Not a pure module */
