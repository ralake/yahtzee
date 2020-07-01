'use strict';

var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function getRollLabel(roll) {
  switch (roll) {
    case /* Ones */0 :
        return "Ones";
    case /* Twos */1 :
        return "Twos";
    case /* Threes */2 :
        return "Threes";
    case /* Fours */3 :
        return "Fours";
    case /* Fives */4 :
        return "Fives";
    case /* Sixes */5 :
        return "Sixes";
    case /* ThreeOfAKind */6 :
        return "Three of a kind";
    case /* FourOfAKind */7 :
        return "Four of a kind";
    case /* FullHouse */8 :
        return "Full house";
    case /* SmallStraight */9 :
        return "Small straight";
    case /* LargeStraight */10 :
        return "Large straight";
    case /* Yahtzee */11 :
        return "Yahtzee";
    case /* YahtzeeBonus */12 :
        return "Yahtzee bonus";
    case /* Chance */13 :
        return "Chance";
    
  }
}

function getNumbersTotal(numbers) {
  return Belt_Map.reduce(numbers, 0, (function (memo, param, v) {
                return memo + v | 0;
              }));
}

var cmp = Caml_obj.caml_compare;

var NumbersCompare = Belt_Id.MakeComparable({
      cmp: cmp
    });

function rollToString(roll) {
  switch (roll) {
    case /* Ones */0 :
        return "Ones";
    case /* Twos */1 :
        return "Twos";
    case /* Threes */2 :
        return "Threes";
    case /* Fours */3 :
        return "Fours";
    case /* Fives */4 :
        return "Fives";
    case /* Sixes */5 :
        return "Sixes";
    case /* ThreeOfAKind */6 :
        return "ThreeOfAKind";
    case /* FourOfAKind */7 :
        return "FourOfAKind";
    case /* FullHouse */8 :
        return "FullHouse";
    case /* SmallStraight */9 :
        return "SmallStraight";
    case /* LargeStraight */10 :
        return "LargeStraight";
    case /* Yahtzee */11 :
        return "Yahtzee";
    case /* YahtzeeBonus */12 :
        return "YahtzeeBonus";
    case /* Chance */13 :
        return "Chance";
    
  }
}

function rollFromString(roll) {
  switch (roll) {
    case "Chance" :
        return /* Chance */13;
    case "Fives" :
        return /* Fives */4;
    case "FourOfAKind" :
        return /* FourOfAKind */7;
    case "Fours" :
        return /* Fours */3;
    case "FullHouse" :
        return /* FullHouse */8;
    case "LargeStraight" :
        return /* LargeStraight */10;
    case "Ones" :
        return /* Ones */0;
    case "Sixes" :
        return /* Sixes */5;
    case "SmallStraight" :
        return /* SmallStraight */9;
    case "ThreeOfAKind" :
        return /* ThreeOfAKind */6;
    case "Threes" :
        return /* Threes */2;
    case "Twos" :
        return /* Twos */1;
    case "Yahtzee" :
        return /* Yahtzee */11;
    case "YahtzeeBonus" :
        return /* YahtzeeBonus */12;
    default:
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "Score.re",
              87,
              38
            ]
          ];
  }
}

function getNextNumbers(value, number, score) {
  if (value !== undefined) {
    return Belt_Map.set(score.numbers, number, value);
  } else {
    return Belt_Map.remove(score.numbers, number);
  }
}

function getNumbersBonus(numbers) {
  var numbersTotal = getNumbersTotal(numbers);
  if (numbersTotal >= 63) {
    return 35;
  } else {
    return 0;
  }
}

function getNumberTrackingValue(numbers) {
  var match = Belt_Map.reduce(numbers, /* tuple */[
        0,
        0
      ], (function (memo, number, value) {
          var match;
          switch (number) {
            case /* Ones */0 :
                match = /* tuple */[
                  3,
                  value
                ];
                break;
            case /* Twos */1 :
                match = /* tuple */[
                  6,
                  value
                ];
                break;
            case /* Threes */2 :
                match = /* tuple */[
                  9,
                  value
                ];
                break;
            case /* Fours */3 :
                match = /* tuple */[
                  12,
                  value
                ];
                break;
            case /* Fives */4 :
                match = /* tuple */[
                  15,
                  value
                ];
                break;
            case /* Sixes */5 :
                match = /* tuple */[
                  18,
                  value
                ];
                break;
            
          }
          return /* tuple */[
                  memo[0] + match[0] | 0,
                  memo[1] + match[1] | 0
                ];
        }));
  return match[1] - match[0] | 0;
}

function getIsTrackingMessage(score) {
  var noNumberScore = score.numbersTotal === 0;
  var trackingValue = getNumberTrackingValue(score.numbers);
  if (noNumberScore) {
    return "";
  } else if (trackingValue === 0) {
    return "Yes";
  } else if (trackingValue < 0) {
    return "No (" + (String(Caml_int32.imul(trackingValue, -1)) + " points under)");
  } else {
    return "Yes (" + (String(trackingValue) + " points over)");
  }
}

function getInitialScore(param) {
  return {
          numbers: Belt_Map.make(NumbersCompare),
          numbersTotal: 0,
          numbersBonus: 0,
          threeOfAKind: undefined,
          fourOfAKind: undefined,
          fullHouse: undefined,
          smallStraight: undefined,
          largeStraight: undefined,
          yahtzee: undefined,
          yahtzeeBonus: undefined,
          chance: undefined,
          total: 0
        };
}

function scoreWithTotal(score) {
  var s = score.threeOfAKind;
  var s$1 = score.fourOfAKind;
  var s$2 = score.fullHouse;
  var s$3 = score.smallStraight;
  var s$4 = score.largeStraight;
  var s$5 = score.yahtzee;
  var s$6 = score.yahtzeeBonus;
  var s$7 = score.chance;
  var total = ((((((((score.numbersTotal + score.numbersBonus | 0) + (
                  s !== undefined ? s : 0
                ) | 0) + (
                s$1 !== undefined ? s$1 : 0
              ) | 0) + (
              s$2 !== undefined ? s$2 : 0
            ) | 0) + (
            s$3 !== undefined ? s$3 : 0
          ) | 0) + (
          s$4 !== undefined ? s$4 : 0
        ) | 0) + (
        s$5 !== undefined ? s$5 : 0
      ) | 0) + (
      s$6 !== undefined ? s$6 : 0
    ) | 0) + (
    s$7 !== undefined ? s$7 : 0
  ) | 0;
  return {
          numbers: score.numbers,
          numbersTotal: score.numbersTotal,
          numbersBonus: score.numbersBonus,
          threeOfAKind: score.threeOfAKind,
          fourOfAKind: score.fourOfAKind,
          fullHouse: score.fullHouse,
          smallStraight: score.smallStraight,
          largeStraight: score.largeStraight,
          yahtzee: score.yahtzee,
          yahtzeeBonus: score.yahtzeeBonus,
          chance: score.chance,
          total: total
        };
}

function getNextPlayerScoreOnNumberChange(score, number, value) {
  var newNumbers = getNextNumbers(value, number, score);
  return scoreWithTotal({
              numbers: newNumbers,
              numbersTotal: getNumbersTotal(newNumbers),
              numbersBonus: getNumbersBonus(newNumbers),
              threeOfAKind: score.threeOfAKind,
              fourOfAKind: score.fourOfAKind,
              fullHouse: score.fullHouse,
              smallStraight: score.smallStraight,
              largeStraight: score.largeStraight,
              yahtzee: score.yahtzee,
              yahtzeeBonus: score.yahtzeeBonus,
              chance: score.chance,
              total: score.total
            });
}

function getNextPlayerScoreOnChange(score, roll, value) {
  switch (roll) {
    case /* Ones */0 :
        return getNextPlayerScoreOnNumberChange(score, /* Ones */0, value);
    case /* Twos */1 :
        return getNextPlayerScoreOnNumberChange(score, /* Twos */1, value);
    case /* Threes */2 :
        return getNextPlayerScoreOnNumberChange(score, /* Threes */2, value);
    case /* Fours */3 :
        return getNextPlayerScoreOnNumberChange(score, /* Fours */3, value);
    case /* Fives */4 :
        return getNextPlayerScoreOnNumberChange(score, /* Fives */4, value);
    case /* Sixes */5 :
        return getNextPlayerScoreOnNumberChange(score, /* Sixes */5, value);
    case /* ThreeOfAKind */6 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: value,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* FourOfAKind */7 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: value,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* FullHouse */8 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: value,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* SmallStraight */9 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: value,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* LargeStraight */10 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: value,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* Yahtzee */11 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: value,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: score.chance,
                    total: score.total
                  });
    case /* YahtzeeBonus */12 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: value,
                    chance: score.chance,
                    total: score.total
                  });
    case /* Chance */13 :
        return scoreWithTotal({
                    numbers: score.numbers,
                    numbersTotal: score.numbersTotal,
                    numbersBonus: score.numbersBonus,
                    threeOfAKind: score.threeOfAKind,
                    fourOfAKind: score.fourOfAKind,
                    fullHouse: score.fullHouse,
                    smallStraight: score.smallStraight,
                    largeStraight: score.largeStraight,
                    yahtzee: score.yahtzee,
                    yahtzeeBonus: score.yahtzeeBonus,
                    chance: value,
                    total: score.total
                  });
    
  }
}

function getRollData(score, roll) {
  switch (roll) {
    case /* Ones */0 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Ones */0),
                "5",
                1.0
              ];
    case /* Twos */1 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Twos */1),
                "10",
                2.0
              ];
    case /* Threes */2 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Threes */2),
                "15",
                3.0
              ];
    case /* Fours */3 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Fours */3),
                "20",
                4.0
              ];
    case /* Fives */4 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Fives */4),
                "25",
                5.0
              ];
    case /* Sixes */5 :
        return /* tuple */[
                Belt_Map.get(score.numbers, /* Sixes */5),
                "30",
                6.0
              ];
    case /* ThreeOfAKind */6 :
        return /* tuple */[
                score.threeOfAKind,
                "30",
                1.0
              ];
    case /* FourOfAKind */7 :
        return /* tuple */[
                score.fourOfAKind,
                "30",
                1.0
              ];
    case /* FullHouse */8 :
        return /* tuple */[
                score.fullHouse,
                "25",
                25.0
              ];
    case /* SmallStraight */9 :
        return /* tuple */[
                score.smallStraight,
                "30",
                30.0
              ];
    case /* LargeStraight */10 :
        return /* tuple */[
                score.largeStraight,
                "40",
                40.0
              ];
    case /* Yahtzee */11 :
        return /* tuple */[
                score.yahtzee,
                "50",
                50.0
              ];
    case /* YahtzeeBonus */12 :
        return /* tuple */[
                score.yahtzeeBonus,
                "",
                100.0
              ];
    case /* Chance */13 :
        return /* tuple */[
                score.chance,
                "30",
                1.0
              ];
    
  }
}

exports.getRollLabel = getRollLabel;
exports.getNumbersTotal = getNumbersTotal;
exports.NumbersCompare = NumbersCompare;
exports.rollToString = rollToString;
exports.rollFromString = rollFromString;
exports.getNextNumbers = getNextNumbers;
exports.getNumbersBonus = getNumbersBonus;
exports.getNumberTrackingValue = getNumberTrackingValue;
exports.getIsTrackingMessage = getIsTrackingMessage;
exports.getInitialScore = getInitialScore;
exports.scoreWithTotal = scoreWithTotal;
exports.getNextPlayerScoreOnNumberChange = getNextPlayerScoreOnNumberChange;
exports.getNextPlayerScoreOnChange = getNextPlayerScoreOnChange;
exports.getRollData = getRollData;
/* NumbersCompare Not a pure module */
