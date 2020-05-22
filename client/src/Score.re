type rolls =
  | Ones
  | Twos
  | Threes
  | Fours
  | Fives
  | Sixes
  | ThreeOfAKind
  | FourOfAKind
  | FullHouse
  | SmallStraight
  | LargeStraight
  | Yahtzee
  | YahtzeeBonus
  | Chance;

type numbers =
  | Ones
  | Twos
  | Threes
  | Fours
  | Fives
  | Sixes;

let getRollLabel = (roll: rolls) => {
  switch (roll) {
  | Ones => "Ones"
  | Twos => "Tows"
  | Threes => "Thress"
  | Fours => "Fours"
  | Fives => "Fives"
  | Sixes => "Sixes"
  | ThreeOfAKind => "Three of a kind"
  | FourOfAKind => "Four of a kind"
  | FullHouse => "Full house"
  | SmallStraight => "Small straight"
  | LargeStraight => "Large straight"
  | Yahtzee => "Yahtzee"
  | YahtzeeBonus => "Yahtzee bonus"
  | Chance => "Chance"
  };
};

let getNumbersTotal = numbers =>
  Belt.Map.reduce(numbers, 0, (memo, _, v) => {memo + v});

module NumbersCompare =
  Belt.Id.MakeComparable({
    type t = numbers;
    let cmp = (a, b) => compare(a, b);
  });

type t = {
  numbers: Belt.Map.t(NumbersCompare.t, int, NumbersCompare.identity),
  numbersTotal: int,
  numbersBonus: int,
  threeOfAKind: option(int),
  fourOfAKind: option(int),
  fullHouse: option(int),
  smallStraight: option(int),
  largeStraight: option(int),
  yahtzee: option(int),
  yahtzeeBonus: option(int),
  chance: option(int),
  total: int,
};

let getNextNumbers = (value, number, score: t) => {
  switch (value) {
  | Some(num) => Belt.Map.set(score.numbers, number, num)
  | None => Belt.Map.remove(score.numbers, number)
  };
};

let getNumbersBonus = numbers => {
  let numbersTotal = getNumbersTotal(numbers);
  numbersTotal >= 63 ? 35 : 0;
};

let getNumberTrackingValue = numbers => {
  let (expected, actual) =
    Belt.Map.reduce(
      numbers,
      (0, 0),
      (memo, number, value) => {
        let (e, a) = memo;
        let (nextExpected, nextActual) =
          switch (number) {
          | Ones => (3, value)
          | Twos => (6, value)
          | Threes => (9, value)
          | Fours => (12, value)
          | Fives => (15, value)
          | Sixes => (18, value)
          };
        (e + nextExpected, a + nextActual);
      },
    );

  actual - expected;
};

let getIsTrackingMessage = score => {
  let noNumberScore = score.numbersTotal === 0;
  let trackingValue = getNumberTrackingValue(score.numbers);
  let message =
    if (noNumberScore) {
      "";
    } else if (trackingValue === 0) {
      "Yes";
    } else if (trackingValue < 0) {
      "No (" ++ string_of_int(trackingValue * (-1)) ++ " points under)";
    } else {
      "Yes (" ++ string_of_int(trackingValue) ++ " points over)";
    };
  message;
};

let getInitialScore = () => {
  {
    numbers: Belt.Map.make(~id=(module NumbersCompare)),
    numbersTotal: 0,
    numbersBonus: 0,
    threeOfAKind: None,
    fourOfAKind: None,
    fullHouse: None,
    smallStraight: None,
    largeStraight: None,
    yahtzee: None,
    yahtzeeBonus: None,
    chance: None,
    total: 0,
  };
};

let scoreWithTotal = score => {
  let getZerodScore = s =>
    switch (s) {
    | Some(num) => num
    | None => 0
    };

  let total =
    score.numbersTotal
    + score.numbersBonus
    + getZerodScore(score.threeOfAKind)
    + getZerodScore(score.fourOfAKind)
    + getZerodScore(score.fullHouse)
    + getZerodScore(score.smallStraight)
    + getZerodScore(score.largeStraight)
    + getZerodScore(score.yahtzee)
    + getZerodScore(score.yahtzeeBonus)
    + getZerodScore(score.chance);

  {...score, total};
};

let getNextPlayerScoreOnNumberChange = (score, number, value) => {
  let newNumbers = getNextNumbers(value, number, score);
  scoreWithTotal({
    ...score,
    numbers: newNumbers,
    numbersTotal: getNumbersTotal(newNumbers),
    numbersBonus: getNumbersBonus(newNumbers),
  });
};

let getNextPlayerScoreOnChange = (score, roll: rolls, value) => {
  switch (roll) {
  | Ones => getNextPlayerScoreOnNumberChange(score, Ones, value)
  | Twos => getNextPlayerScoreOnNumberChange(score, Twos, value)
  | Threes => getNextPlayerScoreOnNumberChange(score, Threes, value)
  | Fours => getNextPlayerScoreOnNumberChange(score, Fours, value)
  | Fives => getNextPlayerScoreOnNumberChange(score, Fives, value)
  | Sixes => getNextPlayerScoreOnNumberChange(score, Sixes, value)
  | ThreeOfAKind => scoreWithTotal({...score, threeOfAKind: value})
  | FourOfAKind => scoreWithTotal({...score, fourOfAKind: value})
  | FullHouse => scoreWithTotal({...score, fullHouse: value})
  | SmallStraight => scoreWithTotal({...score, smallStraight: value})
  | LargeStraight => scoreWithTotal({...score, largeStraight: value})
  | Yahtzee => scoreWithTotal({...score, yahtzee: value})
  | YahtzeeBonus => scoreWithTotal({...score, yahtzeeBonus: value})
  | Chance => scoreWithTotal({...score, chance: value})
  };
};

let getRollData = (score, roll: rolls) => {
  switch (roll) {
  | Ones => (Belt.Map.get(score.numbers, Ones), "5", 1.0)
  | Twos => (Belt.Map.get(score.numbers, Twos), "10", 2.0)
  | Threes => (Belt.Map.get(score.numbers, Threes), "15", 3.0)
  | Fours => (Belt.Map.get(score.numbers, Fours), "20", 4.0)
  | Fives => (Belt.Map.get(score.numbers, Fives), "25", 5.0)
  | Sixes => (Belt.Map.get(score.numbers, Sixes), "30", 6.0)
  | ThreeOfAKind => (score.threeOfAKind, "30", 1.0)
  | FourOfAKind => (score.fourOfAKind, "30", 1.0)
  | FullHouse => (score.fullHouse, "25", 25.0)
  | SmallStraight => (score.smallStraight, "30", 30.0)
  | LargeStraight => (score.largeStraight, "40", 40.0)
  | Yahtzee => (score.yahtzee, "50", 50.0)
  | YahtzeeBonus => (score.yahtzeeBonus, "", 100.0)
  | Chance => (score.chance, "30", 1.0)
  };
};
