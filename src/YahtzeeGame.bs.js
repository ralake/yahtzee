'use strict';

var Css = require("bs-css-emotion/src/Css.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Score$ReasonReactExamples = require("./Score.bs.js");
var Player$ReasonReactExamples = require("./Player.bs.js");
var TopNumber$ReasonReactExamples = require("./TopNumber.bs.js");

function grid(columns) {
  return Curry._1(Css.style, /* :: */[
              Css.display(Css.grid),
              /* :: */[
                Css.gridTemplateColumns(/* :: */[
                      Css.px(200),
                      /* :: */[
                        /* `repeat */[
                          108828507,
                          /* tuple */[
                            /* `num */[
                              5496390,
                              columns
                            ],
                            /* minContent */-550577721
                          ]
                        ],
                        /* [] */0
                      ]
                    ]),
                /* [] */0
              ]
            ]);
}

var Styles = {
  grid: grid
};

function YahtzeeGame(Props) {
  var match = React.useReducer((function (state, action) {
          var playerIndex = action[0];
          var playersClone = $$Array.copy(state.players);
          var player = Caml_array.caml_array_get(playersClone, playerIndex);
          var numbers = Belt_Map.set(player.score.upperScore.numbers, action[1], action[2]);
          var numbersTotal = Belt_Map.reduce(numbers, 0, (function (memo, param, v) {
                  return memo + v | 0;
                }));
          var numbersBonus = numbersTotal >= 63 ? 35 : 0;
          player.score.upperScore = {
            numbers: numbers,
            numbersTotal: numbersTotal,
            numbersBonus: numbersBonus,
            total: numbersTotal + numbersBonus | 0
          };
          Caml_array.caml_array_set(playersClone, playerIndex, player);
          return {
                  players: playersClone
                };
        }), {
        players: [
          Player$ReasonReactExamples.getInitialPlayer(undefined),
          Player$ReasonReactExamples.getInitialPlayer(undefined)
        ]
      });
  var dispatch = match[1];
  var state = match[0];
  return React.createElement("div", undefined, React.createElement("h1", undefined, "Yahtzee!"), React.createElement("div", {
                  className: grid(state.players.length)
                }, React.createElement("div", undefined, React.createElement("h3", undefined, "Aces"), React.createElement("h3", undefined, "Twos"), React.createElement("h3", undefined, "Threes"), React.createElement("h3", undefined, "Fours"), React.createElement("h3", undefined, "Fives"), React.createElement("h3", undefined, "Sixes"), React.createElement("h3", undefined, "Bonus"), React.createElement("h3", undefined, "Total")), Belt_Array.mapWithIndex(state.players, (function (playerIndex, player) {
                        return React.createElement("div", undefined, Belt_Array.mapWithIndex(Score$ReasonReactExamples.numbersArray, (function (i, number) {
                                          var $$int = Belt_Map.get(player.score.upperScore.numbers, number);
                                          return React.createElement(TopNumber$ReasonReactExamples.make, {
                                                      value: $$int !== undefined ? $$int : 0,
                                                      multiplier: i + 1 | 0,
                                                      onChange: (function (num) {
                                                          return Curry._1(dispatch, /* UpdateNumberScore */[
                                                                      playerIndex,
                                                                      number,
                                                                      num
                                                                    ]);
                                                        })
                                                    });
                                        })), React.createElement("p", undefined, String(player.score.upperScore.numbersBonus)), React.createElement("p", undefined, String(player.score.upperScore.total)));
                      }))));
}

var make = YahtzeeGame;

exports.Styles = Styles;
exports.make = make;
/* Css Not a pure module */
