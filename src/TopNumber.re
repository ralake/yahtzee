[@react.component]
let make = (~value, ~multiplier, ~onChange) => {
  <input
    type_="number"
    value={string_of_int(value === 0 ? value : value / multiplier)}
    min="0"
    max="6"
    onChange={event => {
      let value = event->ReactEvent.Form.target##value;
      onChange(int_of_string(value) * multiplier);
    }}
  />;
};
