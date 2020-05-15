type player = {name: string};

module PlayersCompare =
  Belt.Id.MakeComparable({
    type t = player;
    let cmp = (a, b) => compare(a.name, b.name);
  });

type players = Belt.Map.t(player, Score.t, PlayersCompare.identity);

let getInitialPlayer = n => {name: n};
