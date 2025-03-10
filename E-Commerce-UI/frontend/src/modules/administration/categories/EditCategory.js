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
import { CategoryDetails } from './CategoryDetails';
import {
  useGetCategory,
  useFormState,
  usePutCategory,
  useDeleteCategory
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
  admin: { category: resourceLabel }
} = resource;

export const EditCategory = ({ onClose, open, isAaddMode, id }) => {
  const classes = useStyles();
  const { putCategory } = usePutCategory();
  const drawerClasses = useDrawerStyles();
  const [editable, setEditable] = useState(isAaddMode);
  const onEditClick = useCallback(() => {
    setEditable(true);
  }, []);
  const { deleteCategory } = useDeleteCategory();

  const { category, loading } = useGetCategory({ id });
  const formik = useFormState({ category, putCategory, id, onClose });
  const { values, setFieldValue, handleSubmit, handleReset } = formik;
  const onDelete = useCallback(() => {
    deleteCategory({ id });
    onClose();
  }, [deleteCategory, id, onClose]);

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
      <CategoryDetails
        editable={editable}
        values={values}
        setFieldValue={setFieldValue}
        isAaddMode={isAaddMode}
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

EditCategory.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  isAaddMode: PropTypes.bool,
  id: PropTypes.string
};
