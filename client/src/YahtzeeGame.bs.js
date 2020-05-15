'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Score$Yahtzee = require("./Score.bs.js");
var Player$Yahtzee = require("./Player.bs.js");
var Styles$Yahtzee = require("./Styles.bs.js");
var NumberInput$Yahtzee = require("./NumberInput.bs.js");
var AddPlayerForm$Yahtzee = require("./AddPlayerForm.bs.js");

function updateScore(state, player, roll, value) {
  var score = Belt_Map.get(state.players, player);
  if (score === undefined) {
    return state;
  }
  var nextPlayerScore = Score$Yahtzee.getNextPlayerScoreOnChange(score, roll, value);
  return {
          players: Belt_Map.set(state.players, player, nextPlayerScore)
        };
}

function reducer(state, action) {
  if (action.tag) {
    return updateScore(state, action[0], action[1], action[2]);
  } else {
    return {
            players: Belt_Map.set(state.players, Player$Yahtzee.getInitialPlayer(action[0]), Score$Yahtzee.getInitialScore(undefined))
          };
  }
}

function YahtzeeGame(Props) {
  var initialState = {
    players: Belt_Map.make(Player$Yahtzee.PlayersCompare)
  };
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  var players = Belt_Map.toArray(state.players);
  var getComponentForRoll = function (roll, player, score) {
    var match = Score$Yahtzee.getRollData(score, roll);
    return React.createElement(NumberInput$Yahtzee.make, {
                value: match[0],
                onChange: (function (value) {
                    return Curry._1(dispatch, /* UpdateScore */Block.__(1, [
                                  player,
                                  roll,
                                  value
                                ]));
                  }),
                max: match[1],
                step: match[2]
              });
  };
  return React.createElement("div", undefined, React.createElement("h1", undefined, "Yahtzee!"), React.createElement(AddPlayerForm$Yahtzee.make, {
                  onSubmit: (function (playerName) {
                      return Curry._1(dispatch, /* AddPlayer */Block.__(0, [playerName]));
                    })
                }), React.createElement("div", {
                  className: Styles$Yahtzee.grid(Belt_Map.size(state.players))
                }, React.createElement("p", undefined, "Upper Section"), Belt_Array.map(players, (function (param) {
                        return React.createElement("p", undefined, param[0].name);
                      })), React.createElement("p", undefined, "Ones"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Ones */0, param[0], param[1]);
                      })), React.createElement("p", undefined, "Twos"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Twos */1, param[0], param[1]);
                      })), React.createElement("p", undefined, "Threes"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Threes */2, param[0], param[1]);
                      })), React.createElement("p", undefined, "Fours"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Fours */3, param[0], param[1]);
                      })), React.createElement("p", undefined, "Fives"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Fives */4, param[0], param[1]);
                      })), React.createElement("p", undefined, "Sixes"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Sixes */5, param[0], param[1]);
                      })), React.createElement("p", undefined, "Total"), Belt_Array.map(players, (function (param) {
                        return React.createElement("p", undefined, String(param[1].numbersTotal));
                      })), React.createElement("p", undefined, "Tracking?"), Belt_Array.map(players, (function (param) {
                        var tracking = Score$Yahtzee.getNumberTracking(param[1]);
                        var message = tracking < 0 ? "You aren't on track to get your bonus! You need " + (String(Caml_int32.imul(tracking, -1)) + " more points.") : "You are on track to get your bonus!" + (
                            tracking > 0 ? " You have " + (String(tracking) + " spare points.") : ""
                          );
                        return React.createElement("p", undefined, message);
                      })), React.createElement("p", undefined, "Bonus"), Belt_Array.map(players, (function (param) {
                        return React.createElement("p", undefined, String(param[1].numbersBonus));
                      })), React.createElement("p", undefined, "Three of a kind"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* ThreeOfAKind */6, param[0], param[1]);
                      })), React.createElement("p", undefined, "Four of a kind"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* FourOfAKind */7, param[0], param[1]);
                      })), React.createElement("p", undefined, "Full house"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* FullHouse */8, param[0], param[1]);
                      })), React.createElement("p", undefined, "Small straight"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* SmallStraight */9, param[0], param[1]);
                      })), React.createElement("p", undefined, "Large straight"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* LargeStraight */10, param[0], param[1]);
                      })), React.createElement("p", undefined, "Yahtzee"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Yahtzee */11, param[0], param[1]);
                      })), React.createElement("p", undefined, "Yahtzee Bonus"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* YahtzeeBonus */12, param[0], param[1]);
                      })), React.createElement("p", undefined, "Chance"), Belt_Array.map(players, (function (param) {
                        return getComponentForRoll(/* Chance */13, param[0], param[1]);
                      })), React.createElement("p", undefined, "Total"), Belt_Array.map(players, (function (param) {
                        return React.createElement("p", undefined, String(param[1].total));
                      }))));
}

var make = YahtzeeGame;

exports.updateScore = updateScore;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
