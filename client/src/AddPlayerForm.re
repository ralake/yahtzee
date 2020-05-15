[@react.component]
let make = (~onSubmit) => {
  let (value, setValue) = React.useState(() => "");

  <div>
    <TextInput value onChange={v => setValue(v)} />
    <button disabled={value === ""} onClick={_ => onSubmit(value)}>
      {React.string("Add player")}
    </button>
  </div>;
};
