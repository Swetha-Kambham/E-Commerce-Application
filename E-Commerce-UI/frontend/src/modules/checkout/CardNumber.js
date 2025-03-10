import React, { useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  input: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.4),
    fontSize: '0.875rem',
    backgroundColor: '#ffffff'
  },
  inputRoot: {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    background: theme.palette.common.white
  },
  labelRoot: {
    ...theme.typography.body2,
    margin: theme.spacing(-1.3, 0, 0, 3.5)
  },
  shrink: {
    margin: 'unset',
    fontSize: '1rem'
  },
  countryCode: {
    paddingRight: theme.spacing(0.5),
    color: theme.palette.text.secondary
  },
  errorRoot: {},
  error: {
    color: '#ffa39b !important'
  }
}));

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      format="#### #### #### #### ####"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export const CardNumber = ({
  id = 'card-number',
  onChange,
  onBlur,
  value,
  label,
  fullWidth,
  endIcon,
  shrink,
  classes: classesOverrides,
  variant,
  placeholder
}) => {
  const classes = useStyles({ classes: classesOverrides });

  const InputLabelProps = useMemo(
    () => ({
      classes: {
        root: classes.labelRoot,
        shrink: classes.shrink,
        focused: classes.focused
      },
      shrink
    }),
    [classes.focused, classes.labelRoot, classes.shrink, shrink]
  );

  const InputProps = useMemo(
    () => ({
      classes: { root: classes.inputRoot, input: classes.input },
      inputComponent: NumberFormatCustom,
      endAdornment: endIcon
    }),
    [classes.input, classes.inputRoot, endIcon]
  );

  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      name="Card Number"
      variant={variant}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      placeholder={placeholder}
    />
  );
};

CardNumber.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  endIcon: PropTypes.element,
  shrink: PropTypes.bool,
  classes: PropTypes.object,
  onBlur: PropTypes.func,
  variant: PropTypes.oneOf(['outlined', 'standard', 'filled']),
  placeholder: PropTypes.string
};
