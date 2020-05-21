type state = {players: Player.players};

type action =
  | AddPlayer(string)
  | UpdateScore(Player.player, Score.rolls, option(int));

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
  };

[@react.component]
let make = () => {
  let initialState = {
    players: Belt.Map.make(~id=(module Player.PlayersCompare)),
  };
  let (state, dispatch) = React.useReducer(reducer, initialState);

  let players = Belt.Map.toArray(state.players);

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

  <div>
    <MaterialUi.AppBar>
      <MaterialUi.Toolbar>
        <MaterialUi.Typography variant=`H6>
          {ReasonReact.string("Yahtzee!")}
        </MaterialUi.Typography>
        <AddPlayerForm
          onSubmit={playerName => dispatch(AddPlayer(playerName))}
        />
      </MaterialUi.Toolbar>
    </MaterialUi.AppBar>

    {Belt.Array.size(players) > 0
       ? <MaterialUi.TableContainer>
           <MaterialUi.Table size=`Small>
             <MaterialUi.TableHead>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Upper section")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, _)) =>
                      <MaterialUi.TableCell>
                        {React.string(player.name)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
             </MaterialUi.TableHead>
             <MaterialUi.TableBody>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Ones")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Ones, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Twos")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Twos, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Threes")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Threes, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Fours")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Fours, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Fives")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Fives, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Sixes")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Sixes, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Total")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((_, score)) =>
                      <MaterialUi.TableCell>
                        {React.string(string_of_int(score.numbersTotal))}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Tracking?")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((_, score)) =>
                      <MaterialUi.TableCell>
                        {React.string(Score.getIsTrackingMessage(score))}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Bonus")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((_, score)) =>
                      <MaterialUi.TableCell>
                        {React.string(string_of_int(score.numbersBonus))}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Three of a kind")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(ThreeOfAKind, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Four of a kind")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(FourOfAKind, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Full house")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(FullHouse, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Small straight")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(SmallStraight, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Large straight")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(LargeStraight, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Yahtzee")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Yahtzee, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Yahtzee bonus")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(YahtzeeBonus, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Chance")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((player, score)) =>
                      <MaterialUi.TableCell>
                        {getComponentForRoll(Chance, player, score)}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
               <MaterialUi.TableRow>
                 <MaterialUi.TableCell>
                   {ReasonReact.string("Total")}
                 </MaterialUi.TableCell>
                 {ReasonReact.array(
                    Belt.Array.map(players, ((_, score)) =>
                      <MaterialUi.TableCell>
                        {ReasonReact.string(string_of_int(score.total))}
                      </MaterialUi.TableCell>
                    ),
                  )}
               </MaterialUi.TableRow>
             </MaterialUi.TableBody>
           </MaterialUi.Table>
         </MaterialUi.TableContainer>
       : ReasonReact.null}
  </div>;
};
