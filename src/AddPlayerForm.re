[%mui.withStyles
  "StyleOverrides"({color: ReactDOMRe.Style.make(~color="#ffffff", ())})
];

[@react.component]
let make = (~onSubmit) => {
  let classes = StyleOverrides.useStyles();
  let (value, setValue) = React.useState(() => "");

  <div className=Styles.addPlayerForm>
    <MaterialUi.TextField
      color=`Secondary
      classes=[Root(classes.color)]
      value={`String(value)}
      onChange={e => setValue(e->ReactEvent.Form.target##value)}
    />
    <MaterialUi.Button
      color=`Inherit
      variant=`Outlined
      disabled={value === ""}
      onClick={_ => {
        onSubmit(value);
        setValue(_ => "");
      }}>
      {React.string("Add player")}
    </MaterialUi.Button>
  </div>;
};
