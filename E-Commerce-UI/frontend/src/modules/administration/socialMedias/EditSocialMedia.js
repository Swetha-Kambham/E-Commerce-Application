import React, { useState, useCallback } from 'react';
import {
  Drawer,
  IconButton,
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { resource } from 'modules/resources';
import { SocialMediaDetails } from './SocialMediaDetails';
import {
  useGetSocialMedia,
  useFormState,
  usePutSocialMedia,
  useDeleteSocialMedia
} from './hooks';

const useDrawerStyles = makeStyles((theme) => ({
  paper: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

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
  },
  edit: {
    marginLeft: 'auto'
  },
  delete: {
    marginLeft: 'auto'
  }
}));

const {
  admin: { socialMedia: resourceLabel }
} = resource;

export const EditSocialMedia = ({ onClose, open, isAaddMode, id }) => {
  const classes = useStyles();
  const { putSocialMedia } = usePutSocialMedia();
  const drawerClasses = useDrawerStyles();
  const [editable, setEditable] = useState(isAaddMode);
  const onEditClick = useCallback(() => {
    setEditable(true);
  }, []);
  const { deleteSocialMediaAccount } = useDeleteSocialMedia();

  const { socialMedia, loading } = useGetSocialMedia({ id });
  const formik = useFormState({ socialMedia, putSocialMedia, id, onClose });
  const { values, setFieldValue, handleSubmit, handleReset } = formik;
  const onDelete = useCallback(() => {
    deleteSocialMediaAccount({ id });
    onClose();
  }, [deleteSocialMediaAccount, id, onClose]);

  const closeEditMode = useCallback(() => {
    setEditable(false);
    handleReset();
  }, [handleReset]);

  if (loading) return null;

  return (
    <Drawer classes={drawerClasses} anchor="right" open={open}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          {!editable ? (
            <IconButton className={classes.edit} onClick={onEditClick}>
              <EditIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <SocialMediaDetails
        editable={editable}
        values={values}
        setFieldValue={setFieldValue}
      />
      {editable ? (
        <Grid className={classes.footer}>
          <Button color="secondary" onClick={closeEditMode}>
            {resourceLabel.cancel}
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            {resourceLabel.save}
          </Button>
          {!isAaddMode ? (
            <Button
              className={classes.delete}
              color="secondary"
              onClick={onDelete}
            >
              {resourceLabel.delete}
            </Button>
          ) : null}
        </Grid>
      ) : null}
    </Drawer>
  );
};

EditSocialMedia.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  isAaddMode: PropTypes.bool,
  id: PropTypes.string
};
