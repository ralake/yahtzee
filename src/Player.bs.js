'use strict';

var Score$ReasonReactExamples = require("./Score.bs.js");

function getInitialPlayer(param) {
  return {
          score: Score$ReasonReactExamples.getInitialScore(undefined),
          name: "New player"
        };
}

exports.getInitialPlayer = getInitialPlayer;
/* Score-ReasonReactExamples Not a pure module */
