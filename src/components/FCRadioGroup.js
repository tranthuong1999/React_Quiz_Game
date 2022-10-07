import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const FCRadioGroup = (props) => {
  const { radioList, value, handleChangeValue, disabled } = props;
  return (
    <RadioGroup
      name="row-radio-buttons-group"
      value={value}
      onChange={handleChangeValue}
    >
      {radioList.map((radio, key) => (
        <FormControlLabel
          key={key}
          value={radio}
          control={<Radio />}
          label={radio}
          disabled={disabled}
        />
      ))}
    </RadioGroup>
  );
};
