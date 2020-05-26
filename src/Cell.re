[%mui.withStyles
  "StyleOverrides"({
    lineHeight: ReactDOMRe.Style.make(~lineHeight="33px", ()),
  })
];

[@react.component]
let make = (~children=?) => {
  let classes = StyleOverrides.useStyles();
  <MaterialUi.TableCell classes=[Root(classes.lineHeight)]>
    children
  </MaterialUi.TableCell>;
};
