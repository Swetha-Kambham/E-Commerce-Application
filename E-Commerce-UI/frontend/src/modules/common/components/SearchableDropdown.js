import React, { useMemo, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputRoot: {
    borderRadius: theme.spacing(2),
    height: theme.spacing(5),
    paddingTop: 'unset !important',
    paddingBottom: 'unset !important',
    ...theme.typography.body2
  },
  labelRoot: {
    ...theme.typography.body2,
    fontWeight: 600,
    marginTop: theme.spacing(-1)
  },
  labelRootShrink: {
    marginTop: 'unset'
  }
}));

export const SearchableDropdown = ({
  id,
  options,
  label,
  variant,
  loading,
  onChange,
  onBlur,
  selectedId,
  classes: classesOverride,
  textFieldProps,
  fullWidth,
  ...rest
}) => {
  const classes = useStyles({ classes: classesOverride });
  const defaultProps = useMemo(
    () => ({
      options,
      getOptionLabel: (option) => option.name || option.label
    }),
    [options]
  );

  const handleChange = useCallback(
    (event, newValue) => {
      onChange(newValue || {});
    },
    [onChange]
  );

  const value = useMemo(
    () => options.find((o) => o.id === selectedId) || null,
    [options, selectedId]
  );

  const inputLabelProps = useMemo(
    () => ({
      classes: { root: classes.labelRoot, shrink: classes.labelRootShrink }
    }),
    [classes.labelRoot, classes.labelRootShrink]
  );

  const autocompleteClasses = useMemo(
    () => ({ root: classes.root, inputRoot: classes.inputRoot }),
    [classes.inputRoot, classes.root]
  );

  return (
    <Autocomplete
      {...defaultProps}
      id={id || 'searchable-dropdown'}
      value={value}
      loading={loading}
      classes={autocompleteClasses}
      onChange={handleChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          label={label}
          margin="normal"
          InputLabelProps={inputLabelProps}
          {...textFieldProps}
        />
      )}
      {...rest}
    />
  );
};

SearchableDropdown.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  variant: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
  classes: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  selectedId: PropTypes.string,
  textFieldProps: PropTypes.object,
  fullWidth: PropTypes.bool
};

export default SearchableDropdown;
