type numbers =
  | Ones
  | Twos
  | Threes
  | Fours
  | Fives
  | Sixes;

module NumbersCompare =
  Belt.Id.MakeComparable({
    type t = numbers;
    let cmp = (a, b) => compare(a, b);
  });

type upperScore = {
  numbers: Belt.Map.t(NumbersCompare.t, int, NumbersCompare.identity),
  numbersTotal: int,
  numbersBonus: int,
  total: int,
};

type t = {mutable upperScore};

let getInitialScore = () => {
  {
    upperScore: {
      numbers: Belt.Map.make(~id=(module NumbersCompare)),
      numbersTotal: 0,
      numbersBonus: 0,
      total: 0,
    },
  };
};

let numbersArray = [|Ones, Twos, Threes, Fours, Fives, Sixes|];

let updateNumberScore = () => {
  1;
};
