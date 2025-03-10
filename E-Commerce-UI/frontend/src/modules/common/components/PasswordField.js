import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useMemo, useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  input: {
    paddingTop: theme.spacing(1.3),
    paddingBottom: theme.spacing(1.3),
    fontSize: '0.875rem',
    backgroundColor: theme.palette.common.white
  },
  inputRoot: {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    background: theme.palette.common.white
  },
  labelRoot: {
    ...theme.typography.body2,
    margin: theme.spacing(-1.3, 0, 0, 0)
  },
  shrink: {
    margin: 'unset',
    fontSize: '1rem'
  },
  errorRoot: {},
  error: {
    color: '#ffa39b !important'
  }
}));

export const PasswordField = ({
  label,
  value,
  onChange,
  maxlength = 16,
  error,
  helperText,
  placeholder,
  classes: classesOverrides,
  ...rest
}) => {
  const classes = useStyles({ classes: classesOverrides });
  const [visible, setVisible] = useState(false);

  const onVisibilityChange = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const passwordInputProps = useMemo(
    () => ({
      classes: { root: classes.inputRoot, input: classes.input },
      inputProps: {
        type: visible ? 'text' : 'password',
        maxlength
      },
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={onVisibilityChange} edge="end">
            {visible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }),
    [classes.inputRoot, classes.input, visible, maxlength, onVisibilityChange]
  );

  const InputLabelProps = useMemo(
    () => ({
      classes: {
        root: classes.labelRoot,
        shrink: classes.shrink,
        focused: classes.focused
      }
    }),
    [classes.focused, classes.labelRoot, classes.shrink]
  );

  const FormHelperTextProps = useMemo(
    () => ({
      classes: { root: classes.errorRoot, error: classes.error }
    }),
    [classes.error, classes.errorRoot]
  );

  return (
    <>
      <TextField
        className={classes.root}
        InputProps={passwordInputProps}
        value={value}
        onChange={onChange}
        InputLabelProps={InputLabelProps}
        label={label}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        FormHelperTextProps={FormHelperTextProps}
        error={error}
        helperText={helperText}
        {...rest}
      />
    </>
  );
};

PasswordField.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxlength: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object
};
