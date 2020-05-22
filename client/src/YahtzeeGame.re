type state = {players: Player.players};

type action =
  | AddPlayer(string)
  | UpdateScore(Player.player, Score.rolls, option(int))
  | ClearScores
  | ClearPlayers;

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

let reducer = (state, action) =>
  switch (action) {
  | AddPlayer(name) => {
      players:
        Belt.Map.set(
          state.players,
          Player.getInitialPlayer(name),
          Score.getInitialScore(),
        ),
    }
  | UpdateScore(player, roll, value) =>
    updateScore(state, player, roll, value)
  | ClearScores => {
      players: Belt.Map.map(state.players, _ => Score.getInitialScore()),
    }
  | ClearPlayers => {
      players: Belt.Map.make(~id=(module Player.PlayersCompare)),
    }
  };

let theme =
  MaterialUi_Theme.create(
    MaterialUi_ThemeOptions.(
      make(
        ~palette=
          PaletteOptions.make(
            ~primary=Primary.make(~main="#009688", ()),
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

  let getComponentForRoll = (roll, player, score) => {
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
        dispatch(UpdateScore(player, roll, val_));
      }}
    />;
  };

  <MaterialUi_ThemeProvider theme>
    <MaterialUi.AppBar>
      <MaterialUi.Toolbar>
        <div className=Styles.header>
          <MaterialUi.Typography variant=`H6>
            {ReasonReact.string("Yahtzee!")}
          </MaterialUi.Typography>
          {hasPlayers
             ? <MaterialUi.ButtonGroup color=`Inherit>
                 <MaterialUi.Button onClick={_ => dispatch(ClearScores)}>
                   {ReasonReact.string("Clear scores")}
                 </MaterialUi.Button>
                 <MaterialUi.Button onClick={_ => dispatch(ClearPlayers)}>
                   {ReasonReact.string("Clear players")}
                 </MaterialUi.Button>
               </MaterialUi.ButtonGroup>
             : ReasonReact.null}
          <AddPlayerForm
            onSubmit={playerName => dispatch(AddPlayer(playerName))}
          />
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
                   <Cell> {ReasonReact.string("Ones")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Ones, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Twos")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Twos, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Threes")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Threes, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Fours")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Fours, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Fives")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Fives, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Sixes")} </Cell>
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
                   <Cell> {ReasonReact.string("Three of a kind")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(ThreeOfAKind, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Four of a kind")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(FourOfAKind, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Full house")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(FullHouse, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Small straight")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(SmallStraight, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Large straight")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(LargeStraight, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Yahtzee")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(Yahtzee, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Yahtzee bonus")} </Cell>
                   {ReasonReact.array(
                      Belt.Array.map(players, ((player, score)) =>
                        <Cell>
                          {getComponentForRoll(YahtzeeBonus, player, score)}
                        </Cell>
                      ),
                    )}
                 </MaterialUi.TableRow>
                 <MaterialUi.TableRow>
                   <Cell> {ReasonReact.string("Chance")} </Cell>
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
