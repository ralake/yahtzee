module Players = {
  let decodePlayer = (json): Player.player => {
    Json.Decode.{name: json |> field("name", string)};
  };

  let decode = json => {
    decodePlayer(Json.parseOrRaise(json));
  };
};

module ScoreUpdates = {
  let decodeScoreUpdate = (json): Encode.ScoreUpdates.t => {
    Json.Decode.{
      playerName: json |> field("playerName", string),
      roll: json |> field("roll", string),
      score: json |> optional(field("score", int)),
    };
  };

  let decode = json => {
    decodeScoreUpdate(Json.parseOrRaise(json));
  };
};
