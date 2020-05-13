type t = {
  score: Score.t,
  name: string,
};

let getInitialPlayer = () => {
  name: "New player",
  score: Score.getInitialScore(),
};
