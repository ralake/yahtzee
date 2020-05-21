open Css;

global("body", [fontFamily(`custom("Roboto, sans-serif"))]);

let grid = columns =>
  style([
    display(grid),
    gridTemplateColumns([px(200), `repeat((`num(columns), `minContent))]),
  ]);
