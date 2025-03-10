import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';

export const RadioButtonGroup = ({
  options,
  ariaLabel,
  name,
  selectedValue,
  label
}) => {
  const [value, setValue] = React.useState(selectedValue.value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={ariaLabel}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
            disabled={opt.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioButtonGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  ariaLabel: PropTypes.string,
  selectedValue: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string
};
