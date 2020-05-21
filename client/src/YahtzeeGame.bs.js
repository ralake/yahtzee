'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Score$Yahtzee = require("./Score.bs.js");
var Player$Yahtzee = require("./Player.bs.js");
var MaterialUi_Table = require("@jsiebern/bs-material-ui/src/MaterialUi_Table.bs.js");
var Core = require("@material-ui/core");
var MaterialUi_TableRow = require("@jsiebern/bs-material-ui/src/MaterialUi_TableRow.bs.js");
var MaterialUi_TableBody = require("@jsiebern/bs-material-ui/src/MaterialUi_TableBody.bs.js");
var MaterialUi_TableCell = require("@jsiebern/bs-material-ui/src/MaterialUi_TableCell.bs.js");
var MaterialUi_TableHead = require("@jsiebern/bs-material-ui/src/MaterialUi_TableHead.bs.js");
var MaterialUi_TextField = require("@jsiebern/bs-material-ui/src/MaterialUi_TextField.bs.js");
var AddPlayerForm$Yahtzee = require("./AddPlayerForm.bs.js");
var MaterialUi_TableContainer = require("@jsiebern/bs-material-ui/src/MaterialUi_TableContainer.bs.js");

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
  var players = Belt_Map.toArray(match[0].players);
  var getComponentForRoll = function (roll, player, score) {
    var match = Score$Yahtzee.getRollData(score, roll);
    var step = match[2];
    var value = match[0];
    return React.createElement(Core.TextField, MaterialUi_TextField.makeProps(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
                    max: match[1],
                    step: step
                  }, undefined, undefined, undefined, undefined, undefined, undefined, (function (e) {
                      var value = e.target.value;
                      var val_ = value === "" || Caml_int32.mod_(Caml_format.caml_int_of_string(value), step | 0) !== 0 ? undefined : Caml_format.caml_int_of_string(value);
                      return Curry._1(dispatch, /* UpdateScore */Block.__(1, [
                                    player,
                                    roll,
                                    val_
                                  ]));
                    }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "number", value !== undefined ? /* `Int */[
                      3654863,
                      value
                    ] : /* `String */[
                      -976970511,
                      ""
                    ], undefined, undefined, undefined, undefined, undefined, undefined));
  };
  return React.createElement("div", undefined, React.createElement("h1", undefined, "Yahtzee!"), React.createElement(AddPlayerForm$Yahtzee.make, {
                  onSubmit: (function (playerName) {
                      return Curry._1(dispatch, /* AddPlayer */Block.__(0, [playerName]));
                    })
                }), players.length !== 0 ? React.createElement(Core.TableContainer, MaterialUi_TableContainer.makeProps(Caml_option.some(React.createElement(Core.Table, MaterialUi_Table.makeProps(Caml_option.some(null), undefined, undefined, undefined, /* Small */311976103, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableHead, MaterialUi_TableHead.makeProps(Caml_option.some(React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Upper section", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                                      return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(param[0].name), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                                    })))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), React.createElement(Core.TableBody, MaterialUi_TableBody.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Ones", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Ones */0, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Twos", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Twos */1, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Threes", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Threes */2, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Fours", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Fours */3, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Fives", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Fives */4, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Sixes", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Sixes */5, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Total", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(String(param[1].numbersTotal)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Tracking?", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(Score$Yahtzee.getIsTrackingMessage(param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Bonus", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(String(param[1].numbersBonus)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Three of a kind", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* ThreeOfAKind */6, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Four of a kind", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* FourOfAKind */7, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Full house", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* FullHouse */8, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Small straight", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* SmallStraight */9, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Large straight", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* LargeStraight */10, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Yahtzee", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Yahtzee */11, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Yahtzee bonus", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* YahtzeeBonus */12, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Chance", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(getComponentForRoll(/* Chance */13, param[0], param[1])), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, "Total", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), Belt_Array.map(players, (function (param) {
                                              return React.createElement(Core.TableCell, MaterialUi_TableCell.makeProps(undefined, Caml_option.some(String(param[1].total)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));
                                            })))))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)) : null);
}

var make = YahtzeeGame;

exports.updateScore = updateScore;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
