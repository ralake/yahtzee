'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");

function cmp(a, b) {
  return Caml_primitive.caml_string_compare(a.name, b.name);
}

var PlayersCompare = Belt_Id.MakeComparable({
      cmp: cmp
    });

function getInitialPlayer(n) {
  return {
          name: n
        };
}

exports.PlayersCompare = PlayersCompare;
exports.getInitialPlayer = getInitialPlayer;
/* PlayersCompare Not a pure module */
