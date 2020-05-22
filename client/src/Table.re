[%mui.withStyles
  "StyleOverrides"({
    width: ReactDOMRe.Style.make(~width="initial", ()),
  })
];


[@react.component]
let make = (~children=?) => {
  let classes = StyleOverrides.useStyles();
  <MaterialUi.Table size=`Small classes=[Root(classes.width)]>
    children
  </MaterialUi.Table>
};
