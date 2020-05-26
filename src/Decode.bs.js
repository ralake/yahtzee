'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodePlayer(json) {
  return {
          name: Json_decode.field("name", Json_decode.string, json)
        };
}

function decode(json) {
  return decodePlayer(Json.parseOrRaise(json));
}

var Players = {
  decodePlayer: decodePlayer,
  decode: decode
};

function decodeScoreUpdate(json) {
  return {
          playerName: Json_decode.field("playerName", Json_decode.string, json),
          roll: Json_decode.field("roll", Json_decode.string, json),
          score: Json_decode.optional((function (param) {
                  return Json_decode.field("score", Json_decode.$$int, param);
                }), json)
        };
}

function decode$1(json) {
  return decodeScoreUpdate(Json.parseOrRaise(json));
}

var ScoreUpdates = {
  decodeScoreUpdate: decodeScoreUpdate,
  decode: decode$1
};

exports.Players = Players;
exports.ScoreUpdates = ScoreUpdates;
/* No side effect */
