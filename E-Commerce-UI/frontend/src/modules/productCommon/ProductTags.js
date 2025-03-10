import React, { useState, useCallback, useMemo } from 'react';
import {
  Paper,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
  Chip,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import { useDialogState, EditDialog, NoDataMessage } from 'modules/common';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 'none'
    }
  },
  sectionTop: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  editButton: {
    marginLeft: 'auto',
    textTransform: 'none'
  },
  addButton: {
    marginLeft: theme.spacing(-2),
    marginTop: theme.spacing(2)
  },
  addTag: {
    paddingTop: `${theme.spacing(1.5)}px !important`
  }
}));

const { productCommon: resourceLabel } = resource;

export const ProductTags = ({
  editable,
  isMobile,
  values: { tags: tgs, id: productId },
  heading,
  tagLabel,
  updateProductTag
}) => {
  const classes = useStyles();
  const [tags, setTags] = useState(tgs || []);
  const {
    isDialogOpen,
    openDialog: openEditDialog,
    closeDialog: closeEditDialog
  } = useDialogState(false);

  const onTagAdd = useCallback(
    (tag) => {
      if (!tag || tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
        return;

      setTags([...tags, tag]);
    },
    [tags]
  );
  const onTagRemove = useCallback(
    (tag) => {
      setTags(tags.filter((t) => t !== tag));
    },
    [tags]
  );

  const values = useMemo(() => ({ tags }), [tags]);
  const formOnChange = useMemo(() => ({ onTagAdd, onTagRemove }), [
    onTagAdd,
    onTagRemove
  ]);

  const resetForm = useCallback(() => {
    setTags(tgs || []);
  }, [tgs]);

  const onSaveClick = useCallback(async () => {
    const result = await updateProductTag({ productId, tags });

    const { data } = result || {};
    if (data && (data.updateProductTag || data.updateProductLocationTag)) {
      closeEditDialog();
    }
  }, [updateProductTag, productId, tags, closeEditDialog]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.sectionTop}>
          <Typography className={classes.heading} variant="h5">
            {heading}
          </Typography>
          {editable && tags && tags.length ? (
            <Button
              onClick={openEditDialog}
              color="primary"
              variant="text"
              className={classes.editButton}
            >
              Edit
            </Button>
          ) : null}
        </div>
        {tags && tags.length ? null : <NoDataMessage message="No Tags added" />}
        <Grid item xs={12}>
          {tags.map((t) => (
            <Chip key={t} label={t} />
          ))}
        </Grid>
        {tags && tags.length ? null : (
          <Button
            onClick={openEditDialog}
            color="primary"
            variant="text"
            className={classes.addButton}
          >
            Add
          </Button>
        )}
      </Paper>
      {isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={ProductTagsEdit}
          values={values}
          formOnChange={formOnChange}
          fullScreen={isMobile}
          resetForm={resetForm}
          title={heading}
          tagLabel={tagLabel}
          onSaveClick={onSaveClick}
        />
      ) : null}
    </div>
  );
};

ProductTags.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  updateProductTag: PropTypes.func,
  heading: PropTypes.string,
  tagLabel: PropTypes.string,
  isMobile: PropTypes.bool,
  editable: PropTypes.bool
};

export const ProductTagsEdit = ({ values, formOnChange, tagLabel }) => {
  const classes = useStyles();
  const { tags } = values;
  const { onTagAdd, onTagRemove } = formOnChange;
  const [tag, setTag] = useState('');

  const onTagValueChange = useCallback((e) => {
    setTag(e.target.value);
  }, []);

  const onAddClick = useCallback(() => {
    setTag('');
    onTagAdd(tag);
  }, [onTagAdd, tag]);

  const onDeleteTag = useCallback(
    (value) => () => {
      onTagRemove(value);
    },
    [onTagRemove]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9} sm={9} md={11}>
          <TextField
            label={tagLabel}
            fullWidth
            onChange={onTagValueChange}
            value={tag}
            margin="dense"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} md={1} className={classes.addTag}>
          <Tooltip title={resourceLabel.add}>
            <IconButton
              color="secondary"
              variant="contained"
              onClick={onAddClick}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {tags.map((t) => (
          <Chip key={t} label={t} onDelete={onDeleteTag(t)} />
        ))}
      </Grid>
    </>
  );
};

ProductTagsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  tagLabel: PropTypes.string
};
