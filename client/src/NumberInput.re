[@react.component]
let make = (~value, ~onChange, ~max, ~step) => {
  let handleChange = e => {
    let value = e->ReactEvent.Form.target##value;
    let val_ =
      value === "" || int_of_string(value) mod int_of_float(step) != 0
        ? None : Some(int_of_string(value));
    onChange(val_);
  };

  let value_ =
    switch (value) {
    | Some(v) => string_of_int(v)
    | None => ""
    };

  <input type_="number" value=value_ min="0" max step onChange=handleChange />;
};
