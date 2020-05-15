open Css;

let grid = columns =>
  style([
    display(grid),
    gridTemplateColumns([px(200), `repeat((`num(columns), `minContent))]),
  ]);
