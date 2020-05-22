'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Cell$Yahtzee = require("./Cell.bs.js");
var Score$Yahtzee = require("./Score.bs.js");
var Table$Yahtzee = require("./Table.bs.js");
var Player$Yahtzee = require("./Player.bs.js");
var Styles$Yahtzee = require("./Styles.bs.js");
var Core = require("@material-ui/core");
var MaterialUi_AppBar = require("@jsiebern/bs-material-ui/src/MaterialUi_AppBar.bs.js");
var MaterialUi_Button = require("@jsiebern/bs-material-ui/src/MaterialUi_Button.bs.js");
var MaterialUi_Toolbar = require("@jsiebern/bs-material-ui/src/MaterialUi_Toolbar.bs.js");
var MaterialUi_TableRow = require("@jsiebern/bs-material-ui/src/MaterialUi_TableRow.bs.js");
var MaterialUi_TableBody = require("@jsiebern/bs-material-ui/src/MaterialUi_TableBody.bs.js");
var MaterialUi_TableHead = require("@jsiebern/bs-material-ui/src/MaterialUi_TableHead.bs.js");
var MaterialUi_TextField = require("@jsiebern/bs-material-ui/src/MaterialUi_TextField.bs.js");
var AddPlayerForm$Yahtzee = require("./AddPlayerForm.bs.js");
var MaterialUi_Typography = require("@jsiebern/bs-material-ui/src/MaterialUi_Typography.bs.js");
var MaterialUi_ButtonGroup = require("@jsiebern/bs-material-ui/src/MaterialUi_ButtonGroup.bs.js");
var MaterialUi_ThemeOptions = require("@jsiebern/bs-material-ui/src/MaterialUi_ThemeOptions.bs.js");
var Styles = require("@material-ui/core/styles");
var MaterialUi_ThemeProvider = require("@jsiebern/bs-material-ui/src/MaterialUi_ThemeProvider.bs.js");
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
  if (typeof action === "number") {
    if (action === /* ClearScores */0) {
      return {
              players: Belt_Map.map(state.players, (function (param) {
                      return Score$Yahtzee.getInitialScore(undefined);
                    }))
            };
    } else {
      return {
              players: Belt_Map.make(Player$Yahtzee.PlayersCompare)
            };
    }
  } else if (action.tag) {
    return updateScore(state, action[0], action[1], action[2]);
  } else {
    return {
            players: Belt_Map.set(state.players, Player$Yahtzee.getInitialPlayer(action[0]), Score$Yahtzee.getInitialScore(undefined))
          };
  }
}

var theme = Styles.createMuiTheme(MaterialUi_ThemeOptions.make(undefined, undefined, undefined, undefined, Caml_option.some(MaterialUi_ThemeOptions.PaletteOptions.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(MaterialUi_ThemeOptions.Primary.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "#009688", undefined)), Caml_option.some(MaterialUi_ThemeOptions.Secondary.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "#ffffff", undefined)), undefined, undefined, undefined, undefined, undefined, undefined)), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined));

function YahtzeeGame(Props) {
  var initialState = {
    players: Belt_Map.make(Player$Yahtzee.PlayersCompare)
  };
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var players = Belt_Map.toArray(match[0].players);
  var hasPlayers = players.length !== 0;
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
  return React.createElement(MaterialUi_ThemeProvider.make, {
              children: null,
              theme: theme
            }, React.createElement(Core.AppBar, MaterialUi_AppBar.makeProps(undefined, undefined, undefined, undefined, Caml_option.some(React.createElement(Core.Toolbar, MaterialUi_Toolbar.makeProps(Caml_option.some(React.createElement("div", {
                                          className: Styles$Yahtzee.header
                                        }, React.createElement(Core.Typography, MaterialUi_Typography.makeProps(undefined, "Yahtzee!", undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* H6 */16110, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), React.createElement(AddPlayerForm$Yahtzee.make, {
                                              onSubmit: (function (playerName) {
                                                  return Curry._1(dispatch, /* AddPlayer */Block.__(0, [playerName]));
                                                })
                                            }), React.createElement(Core.ButtonGroup, MaterialUi_ButtonGroup.makeProps(Caml_option.some(null), undefined, /* Inherit */-72987685, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.Button, MaterialUi_Button.makeProps(undefined, undefined, undefined, undefined, (function (param) {
                                                        return Curry._1(dispatch, /* ClearScores */0);
                                                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Clear scores", undefined, undefined, undefined, !hasPlayers, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), React.createElement(Core.Button, MaterialUi_Button.makeProps(undefined, undefined, undefined, undefined, (function (param) {
                                                        return Curry._1(dispatch, /* ClearPlayers */1);
                                                      }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Clear players", undefined, undefined, undefined, !hasPlayers, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined))))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), hasPlayers ? React.createElement("div", {
                    className: Styles$Yahtzee.scoreCard
                  }, React.createElement(Core.TableContainer, MaterialUi_TableContainer.makeProps(Caml_option.some(React.createElement(Table$Yahtzee.make, {
                                    children: null
                                  }, React.createElement(Core.TableHead, MaterialUi_TableHead.makeProps(Caml_option.some(React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, { }), Belt_Array.map(players, (function (param) {
                                                          return React.createElement(Cell$Yahtzee.make, {
                                                                      children: param[0].name
                                                                    });
                                                        })))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)), React.createElement(Core.TableBody, MaterialUi_TableBody.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Ones */0)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Ones */0, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Twos */1)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Twos */1, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Threes */2)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Threes */2, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Fours */3)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Fours */3, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Fives */4)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Fives */4, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Sixes */5)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Sixes */5, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: "Total"
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: String(param[1].numbersTotal)
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: "Tracking?"
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: Score$Yahtzee.getIsTrackingMessage(param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: "Bonus"
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: String(param[1].numbersBonus)
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* ThreeOfAKind */6)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* ThreeOfAKind */6, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* FourOfAKind */7)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* FourOfAKind */7, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* FullHouse */8)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* FullHouse */8, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* SmallStraight */9)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* SmallStraight */9, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* LargeStraight */10)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* LargeStraight */10, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Yahtzee */11)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Yahtzee */11, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* YahtzeeBonus */12)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* YahtzeeBonus */12, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: Score$Yahtzee.getRollLabel(/* Chance */13)
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: getComponentForRoll(/* Chance */13, param[0], param[1])
                                                            });
                                                }))), React.createElement(Core.TableRow, MaterialUi_TableRow.makeProps(Caml_option.some(null), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined), React.createElement(Cell$Yahtzee.make, {
                                                children: "Total"
                                              }), Belt_Array.map(players, (function (param) {
                                                  return React.createElement(Cell$Yahtzee.make, {
                                                              children: String(param[1].total)
                                                            });
                                                })))))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined))) : null);
}

var make = YahtzeeGame;

exports.updateScore = updateScore;
exports.reducer = reducer;
exports.theme = theme;
exports.make = make;
/* theme Not a pure module */
