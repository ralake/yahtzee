open Css;

global("body", [fontFamily(`custom("Roboto, sans-serif"))]);

let scoreCard = style([marginTop(px(72))]);

let header =
  style([
    display(grid),
    gridTemplateColumns([`fr(1.0), `auto, `auto]),
    gridGap(px(8)),
    width(`percent(100.0)),
  ]);

let addPlayerForm =
  style([
    marginLeft(`auto),
    display(grid),
    gridTemplateColumns([`auto, `auto]),
    gridGap(px(8)),
  ]);
