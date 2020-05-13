type state = {players: array(Player.t)};

type action =
  | UpdateNumberScore(int, Score.numbers, int);

module Styles = {
  open Css;

  let grid = columns =>
    style([
      display(grid),
      gridTemplateColumns([
        px(200),
        `repeat((`num(columns), `minContent)),
      ]),
    ]);
};

[@react.component]
let make = () => {
  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | UpdateNumberScore(playerIndex, number, value) =>
          let playersClone = Array.copy(state.players);
          let player = playersClone[playerIndex];
          let numbers =
            Belt.Map.set(player.score.upperScore.numbers, number, value);
          let numbersTotal =
            Belt.Map.reduce(numbers, 0, (memo, _, v) => {memo + v});
          let numbersBonus = numbersTotal >= 63 ? 35 : 0;

          player.score.upperScore = {
            numbers,
            numbersTotal,
            numbersBonus,
            total: numbersTotal + numbersBonus,
          };

          playersClone[playerIndex] = player;
          {players: playersClone};
        },
      {players: [|Player.getInitialPlayer(), Player.getInitialPlayer()|]},
    );

  <div>
    <h1> {React.string("Yahtzee!")} </h1>
    <div className={Styles.grid(Array.length(state.players))}>
      <div>
        <h3> {React.string("Aces")} </h3>
        <h3> {React.string("Twos")} </h3>
        <h3> {React.string("Threes")} </h3>
        <h3> {React.string("Fours")} </h3>
        <h3> {React.string("Fives")} </h3>
        <h3> {React.string("Sixes")} </h3>
        <h3> {React.string("Bonus")} </h3>
        <h3> {React.string("Total")} </h3>
      </div>
      {ReasonReact.array(
         Belt.Array.mapWithIndex(state.players, (playerIndex, player) => {
           <div>
             {ReasonReact.array(
                Belt.Array.mapWithIndex(Score.numbersArray, (i, number) => {
                  <TopNumber
                    value={
                      switch (
                        Belt.Map.get(player.score.upperScore.numbers, number)
                      ) {
                      | Some(int) => int
                      | None => 0
                      }
                    }
                    multiplier={i + 1}
                    onChange={num =>
                      dispatch(UpdateNumberScore(playerIndex, number, num))
                    }
                  />
                }),
              )}
             <p>
               {React.string(
                  string_of_int(player.score.upperScore.numbersBonus),
                )}
             </p>
             <p>
               {React.string(string_of_int(player.score.upperScore.total))}
             </p>
           </div>
         }),
       )}
    </div>
  </div>;
};
