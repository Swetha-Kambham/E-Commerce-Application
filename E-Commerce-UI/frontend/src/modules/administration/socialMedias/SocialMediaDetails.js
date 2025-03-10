import React from 'react';
import {
  makeStyles,
  TextField,
  Grid,
  Checkbox,
  InputLabel
} from '@material-ui/core';
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
  admin: { socialMedia }
} = resource;

export const SocialMediaDetails = ({ editable, values, setFieldValue }) => {
  const classes = useStyles();
  const { onNameChange, onUrlChange, onEnabledChange } = useFormOnChange({
    setFieldValue
  });
  const { name, url, enabled } = values;

  return (
    <Grid container className={classes.container} spacing={1}>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          id="name"
          fullWidth
          required
          label={socialMedia.name}
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
          id="url"
          required
          label={socialMedia.url}
          fullWidth
          onChange={onUrlChange}
          value={url}
          InputProps={{
            readOnly: !editable
          }}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <InputLabel shrink>{socialMedia.enabled}</InputLabel>
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

SocialMediaDetails.propTypes = {
  editable: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.any),
  setFieldValue: PropTypes.func
};
