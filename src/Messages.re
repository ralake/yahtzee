type clientToServer =
  | AddNewPlayer(string)
  | ClearScores(bool)
  | ClearPlayers(bool)
  | UpdateRollScore(string);

type serverToClient =
  | ReceiveNewPlayer(string)
  | ReceiveClearScores(bool)
  | ReceiveClearPlayers(bool)
  | ReceiveUpdatedRollScore(string);
