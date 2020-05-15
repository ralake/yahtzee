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
    <NumberInput
      value
      max
      step
      onChange={value => dispatch(UpdateScore(player, roll, value))}
    />;
  };

  <div>
    <h1> {React.string("Yahtzee!")} </h1>
    <AddPlayerForm
      onSubmit={playerName => dispatch(AddPlayer(playerName))}
    />
    <div className={Styles.grid(Belt.Map.size(state.players))}>
      <p> {React.string("Upper Section")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, _)) =>
           <p> {React.string(player.name)} </p>
         ),
       )}
      <p> {React.string("Ones")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Ones, player, score)
         ),
       )}
      <p> {React.string("Twos")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Twos, player, score)
         ),
       )}
      <p> {React.string("Threes")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Threes, player, score)
         ),
       )}
      <p> {React.string("Fours")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Fours, player, score)
         ),
       )}
      <p> {React.string("Fives")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Fives, player, score)
         ),
       )}
      <p> {React.string("Sixes")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Sixes, player, score)
         ),
       )}
      <p> {React.string("Total")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((_, score)) =>
           <p> {React.string(string_of_int(score.numbersTotal))} </p>
         ),
       )}
      <p> {React.string("Tracking?")} </p>
      {ReasonReact.array(
         Belt.Array.map(
           players,
           ((_, score)) => {
             let tracking = Score.getNumberTracking(score);
             let message =
               tracking < 0
                 ? "You aren't on track to get your bonus! You need "
                   ++ string_of_int(tracking * (-1))
                   ++ " more points."
                 : "You are on track to get your bonus!"
                   ++ (
                     tracking > 0
                       ? " You have "
                         ++ string_of_int(tracking)
                         ++ " spare points."
                       : ""
                   );

             <p> {React.string(message)} </p>;
           },
         ),
       )}
      <p> {React.string("Bonus")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((_, score)) =>
           <p> {React.string(string_of_int(score.numbersBonus))} </p>
         ),
       )}
      <p> {React.string("Three of a kind")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(ThreeOfAKind, player, score)
         ),
       )}
      <p> {React.string("Four of a kind")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(FourOfAKind, player, score)
         ),
       )}
      <p> {React.string("Full house")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(FullHouse, player, score)
         ),
       )}
      <p> {React.string("Small straight")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(SmallStraight, player, score)
         ),
       )}
      <p> {React.string("Large straight")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(LargeStraight, player, score)
         ),
       )}
      <p> {React.string("Yahtzee")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Yahtzee, player, score)
         ),
       )}
      <p> {React.string("Yahtzee Bonus")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(YahtzeeBonus, player, score)
         ),
       )}
      <p> {React.string("Chance")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((player, score)) =>
           getComponentForRoll(Chance, player, score)
         ),
       )}
      <p> {React.string("Total")} </p>
      {ReasonReact.array(
         Belt.Array.map(players, ((_, score)) =>
           <p> {ReasonReact.string(string_of_int(score.total))} </p>
         ),
       )}
    </div>
  </div>;
};
