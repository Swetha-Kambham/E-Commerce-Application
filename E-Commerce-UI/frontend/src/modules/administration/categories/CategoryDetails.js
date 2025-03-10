import React from 'react';
import {
  makeStyles,
  TextField,
  Grid,
  Checkbox,
  InputLabel
} from '@material-ui/core';
import { CategoryDropdown } from 'modules/common/components';
import PropTypes from 'prop-types';
import { resource } from 'modules/resources';
import { useFormOnChange } from './hooks';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'unset'
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#e8e8e2',
    padding: theme.spacing(1)
  }
}));

const {
  admin: { category: resourceLabel }
} = resource;

export const CategoryDetails = ({
  editable,
  values,
  setFieldValue,
  isAaddMode
}) => {
  const classes = useStyles();
  const { onNameChange, onDescriptionChange, onEnabledChange, onParentChange } =
    useFormOnChange({
      setFieldValue
    });
  const { name, description, parent, hierarchy, hierarchyName, enabled } =
    values;

  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="name"
          fullWidth
          required
          label={resourceLabel.name}
          value={name}
          onChange={onNameChange}
          InputProps={{
            readOnly: !editable
          }}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="description"
          fullWidth
          required
          label={resourceLabel.description}
          value={description}
          onChange={onDescriptionChange}
          InputProps={{
            readOnly: !editable
          }}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <CategoryDropdown
          label={resourceLabel.parent}
          onChange={onParentChange}
          displayEmpty
          selectedId={parent.id || ''}
          disabled={!isAaddMode}
          noneOption
        />
      </Grid>
      {hierarchy && (
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="hierarchy"
            label={resourceLabel.hierarchy}
            fullWidth
            value={hierarchy}
            InputProps={{
              readOnly: true
            }}
            variant="filled"
          />
        </Grid>
      )}
      {hierarchyName && (
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            id="hierarchyName"
            label={resourceLabel.hierarchyName}
            fullWidth
            value={hierarchyName}
            InputProps={{
              readOnly: true
            }}
            variant="filled"
          />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={6}>
        <InputLabel shrink>{resourceLabel.enabled}</InputLabel>
        <Checkbox
          id="enabled"
          checked={enabled}
          onChange={editable ? onEnabledChange : null}
          color="primary"
        />
      </Grid>
    </Grid>
  );
};

CategoryDetails.propTypes = {
  editable: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.any),
  setFieldValue: PropTypes.func,
  isAaddMode: PropTypes.bool
};
