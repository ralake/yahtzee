[@react.component]
let make = (~value, ~onChange) => {
  <input
    type_="text"
    value
    onChange={e => onChange(e->ReactEvent.Form.target##value)}
  />;
};
