'use strict';

var Css = require("bs-css-emotion/src/Css.js");
var Curry = require("bs-platform/lib/js/curry.js");

function grid(columns) {
  return Curry._1(Css.style, /* :: */[
              Css.display(Css.grid),
              /* :: */[
                Css.gridTemplateColumns(/* :: */[
                      Css.px(200),
                      /* :: */[
                        /* `repeat */[
                          108828507,
                          /* tuple */[
                            /* `num */[
                              5496390,
                              columns
                            ],
                            /* minContent */-550577721
                          ]
                        ],
                        /* [] */0
                      ]
                    ]),
                /* [] */0
              ]
            ]);
}

exports.grid = grid;
/* Css Not a pure module */
