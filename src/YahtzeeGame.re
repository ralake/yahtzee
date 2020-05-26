type state = {players: Player.players};

type action =
  | AddNewPlayer(Player.player)
  | UpdateScore(Player.player, Score.rolls, option(int))
  | ClearScores
  | ClearPlayers;

type scoreUpdate = {
  player: Player.player,
  roll: Score.rolls,
  score: option(int),
};

let encodeScoreUpdate = update =>
  Json.Encode.(
    object_([
      ("player", string(Encode.Players.encode(update.player))),
      ("roll", string(Score.rollToString(update.roll))),
      (
        "score",
        switch (update.score) {
        | Some(num) => int(num)
        | None => null
        },
      ),
    ])
  );

let encodeUpdate = (player, roll, score) => {
  Json.stringify(encodeScoreUpdate({player, roll, score}));
};

let updateScore = (state, player, roll: Score.rolls, value) => {
  let score = Belt.Map.get(state.players, player);

  switch (score) {
  | Some(score) =>
    let nextPlayerScore =
      Score.getNextPlayerScoreOnChange(score, roll, value);
    {players: Belt.Map.set(state.players, player, nextPlayerScore)};
  | None => state
  };
};

module Client = BsSocket.Client.Make(Messages);
let socket = Client.create();

let reducer = (state, action) =>
  switch (action) {
  | UpdateScore(player, roll, value) =>
    updateScore(state, player, roll, value)
  | ClearScores => {
      players: Belt.Map.map(state.players, _ => Score.getInitialScore()),
    }
  | ClearPlayers => {
      players: Belt.Map.make(~id=(module Player.PlayersCompare)),
    }
  | AddNewPlayer(player) => {
      players: Belt.Map.set(state.players, player, Score.getInitialScore()),
    }
  };

let theme =
  MaterialUi_Theme.create(
    MaterialUi_ThemeOptions.(
      make(
        ~palette=
          PaletteOptions.make(
            ~primary=Primary.make(~main="#009688", ()),
            ~secondary=Secondary.make(~main="#ffffff", ()),
            (),
          ),
        (),
      )
    ),
  );

[@react.component]
let make = () => {
  let initialState = {
    players: Belt.Map.make(~id=(module Player.PlayersCompare)),
  };
  let (state, dispatch) = React.useReducer(reducer, initialState);
  let players = Belt.Map.toArray(state.players);
  let hasPlayers = Belt.Array.size(players) > 0;

  let getComponentForRoll = (roll, player: Player.player, score) => {
    let (value, max, step) = Score.getRollData(score, roll);
    <MaterialUi.TextField
      value={
        switch (value) {
        | Some(int) => `Int(int)
        | None => `String("")
        }
      }
      type_="number"
      inputProps={"max": max, "step": step}
      onChange={e => {
        let value = e->ReactEvent.Form.target##value;
        let val_ =
          value === "" || int_of_string(value) mod int_of_float(step) != 0
            ? None : Some(int_of_string(value));
        Client.emit(
          socket,
          UpdateRollScore(
            Encode.ScoreUpdates.encode({
              playerName: player.name,
              roll: Score.rollToString(roll),
              score: val_,
            }),
          ),
        );
      }}
    />;
  };

  React.useEffect0(() => {
    Client.on(socket, m =>
      switch (m) {
      | ReceiveNewPlayer(player) =>
        dispatch(AddNewPlayer(Decode.Players.decode(player)))
      | ReceiveClearScores(_) => dispatch(ClearScores)
      | ReceiveClearPlayers(_) => dispatch(ClearPlayers)
      | ReceiveUpdatedRollScore(update) =>
        let decodedUpdate = Decode.ScoreUpdates.decode(update);
        dispatch(
          UpdateScore(
            Player.getInitialPlayer(decodedUpdate.playerName),
            Score.rollFromString(decodedUpdate.roll),
            decodedUpdate.score,
          ),
        );
      }
    );
    Some(() => ());
  });

  <MaterialUi_ThemeProvider theme>
    <MaterialUi.AppBar>
      <MaterialUi.Toolbar>
        <div className=Styles.header>
          <MaterialUi.Typography variant=`H6>
            {ReasonReact.string("Yahtzee!")}
          </MaterialUi.Typography>
          <AddPlayerForm
            onSubmit={playerName =>
              Client.emit(
                socket,
                AddNewPlayer(
                  Encode.Players.encode(Player.getInitialPlayer(playerName)),
                ),
              )
            }
          />
          <MaterialUi.ButtonGroup color=`Inherit>
            <MaterialUi.Button
              disabled={!hasPlayers}
              onClick={_ => Client.emit(socket, ClearScores(true))}>
              {ReasonReact.string("Clear scores")}
            </MaterialUi.Button>
            <MaterialUi.Button
              disabled={!hasPlayers}
              onClick={_ => Client.emit(socket, ClearPlayers(true))}>
              {ReasonReact.string("Clear players")}
            </MaterialUi.Button>
          </MaterialUi.ButtonGroup>
        </div>
      </MaterialUi.Toolbar>
    </MaterialUi.AppBar>
    {hasPlayers
       ? <div className=Styles.scoreCard>
           <MaterialUi.TableContainer>
             <Table>
               <MaterialUi.TableHead>
                 <MaterialUi.TableRow>
                   <Cell />
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, _)) =>
                        <Cell> {React.string(player.name)} </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
               </MaterialUi.TableHead>
               <MaterialUi.TableBody>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Ones))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Ones, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Twos))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Twos, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Threes))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Threes, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Fours))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Fours, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Fives))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Fives, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Sixes))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Sixes, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Total")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((_, score)) =>
                        <Cell>
                          {React.string(string_of_int(score.numbersTotal))}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Tracking?")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((_, score)) =>
                        <Cell>
                          {React.string(Score.getIsTrackingMessage(score))}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Bonus")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((_, score)) =>
                        <Cell>
                          {React.string(string_of_int(score.numbersBonus))}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(ThreeOfAKind))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(ThreeOfAKind, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(FourOfAKind))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(FourOfAKind, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(FullHouse))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(FullHouse, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(SmallStraight))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(SmallStraight, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(LargeStraight))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(LargeStraight, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Yahtzee))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Yahtzee, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(YahtzeeBonus))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(YahtzeeBonus, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell>
                     {ReasonReact.string(Score.getRollLabel(Chance))}
                   </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Chance, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Total")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((_, score)) =>
                        <Cell>
                          {ReasonReact.string(string_of_int(score.total))}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
               </MaterialUi.TableBody>
             </Table>
           </MaterialUi.TableContainer>
         </div>
       : ReasonReact.null}
  </MaterialUi_ThemeProvider>;
};
