'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");

function encode(player) {
  return Json.stringify(Json_encode.object_(/* :: */[
                  /* tuple */[
                    "name",
                    player.name
                  ],
                  /* [] */0
                ]));
}

var Players = {
  encode: encode
};

function encode$1(update) {
  var num = update.score;
  return Json.stringify(Json_encode.object_(/* :: */[
                  /* tuple */[
                    "playerName",
                    update.playerName
                  ],
                  /* :: */[
                    /* tuple */[
                      "roll",
                      update.roll
                    ],
                    /* :: */[
                      /* tuple */[
                        "score",
                        num !== undefined ? num : null
                      ],
                      /* [] */0
                    ]
                  ]
                ]));
}

var ScoreUpdates = {
  encode: encode$1
};

exports.Players = Players;
exports.ScoreUpdates = ScoreUpdates;
/* No side effect */
