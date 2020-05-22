[@react.component]
let make = (~onSubmit) => {
  let (value, setValue) = React.useState(() => "");

  <div className=Styles.addPlayerForm>
    <MaterialUi.TextField
      value={`String(value)}
      onChange={e => setValue(e->ReactEvent.Form.target##value)}
    />
    <MaterialUi.Button
      disabled={value === ""}
      variant=`Contained
      onClick={_ => {
        onSubmit(value);
        setValue(_ => "");
      }}>
      {React.string("Add player")}
    </MaterialUi.Button>
  </div>;
};
