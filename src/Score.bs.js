'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");

var cmp = Caml_obj.caml_compare;

var NumbersCompare = Belt_Id.MakeComparable({
      cmp: cmp
    });

function getInitialScore(param) {
  return {
          upperScore: {
            numbers: Belt_Map.make(NumbersCompare),
            numbersTotal: 0,
            numbersBonus: 0,
            total: 0
          }
        };
}

var numbersArray = [
  /* Ones */0,
  /* Twos */1,
  /* Threes */2,
  /* Fours */3,
  /* Fives */4,
  /* Sixes */5
];

function updateNumberScore(param) {
  return 1;
}

exports.NumbersCompare = NumbersCompare;
exports.getInitialScore = getInitialScore;
exports.numbersArray = numbersArray;
exports.updateNumberScore = updateNumberScore;
/* NumbersCompare Not a pure module */
