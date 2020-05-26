module Players = {
  let encode = (player: Player.player) => {
    let encoded = Json.Encode.(object_([("name", string(player.name))]));
    Json.stringify(encoded);
  };
};

module ScoreUpdates = {
  type t = {
    playerName: string,
    roll: string,
    score: option(int),
  };

  let encode = update => {
    let encoded =
      Json.Encode.(
        object_([
          ("playerName", string(update.playerName)),
          ("roll", string(update.roll)),
          (
            "score",
            switch (update.score) {
            | Some(num) => int(num)
            | None => null
            },
          ),
        ])
      );
    Json.stringify(encoded);
  };
};
