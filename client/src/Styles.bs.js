'use strict';

var Css = require("bs-css-emotion/src/Css.js");
var Curry = require("bs-platform/lib/js/curry.js");

Curry._2(Css.$$global, "body", /* :: */[
      Css.fontFamily(/* `custom */[
            1066567601,
            "Roboto, sans-serif"
          ]),
      /* [] */0
    ]);

var scoreCard = Curry._1(Css.style, /* :: */[
      Css.marginTop(Css.px(72)),
      /* [] */0
    ]);

var header = Curry._1(Css.style, /* :: */[
      Css.display(Css.grid),
      /* :: */[
        Css.gridTemplateColumns(/* :: */[
              /* `fr */[
                22860,
                1.0
              ],
              /* :: */[
                /* auto */-1065951377,
                /* :: */[
                  /* auto */-1065951377,
                  /* [] */0
                ]
              ]
            ]),
        /* :: */[
          Css.gridGap(Css.px(8)),
          /* :: */[
            Css.width(/* `percent */[
                  -119887163,
                  100.0
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

var addPlayerForm = Curry._1(Css.style, /* :: */[
      Css.marginLeft(/* auto */-1065951377),
      /* :: */[
        Css.display(Css.grid),
        /* :: */[
          Css.gridTemplateColumns(/* :: */[
                /* auto */-1065951377,
                /* :: */[
                  /* auto */-1065951377,
                  /* [] */0
                ]
              ]),
          /* :: */[
            Css.gridGap(Css.px(8)),
            /* [] */0
          ]
        ]
      ]
    ]);

exports.scoreCard = scoreCard;
exports.header = header;
exports.addPlayerForm = addPlayerForm;
/*  Not a pure module */
