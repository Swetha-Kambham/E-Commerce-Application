import React, { useCallback } from 'react';
import {
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  LinearProgress
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { UploadAndViewImage } from './UploadAndViewImage';

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginLeft: theme.spacing(2)
  },
  progress: {
    margin: theme.spacing(2),
    height: theme.spacing(1.5)
  },
  addOptions: {
    marginTop: theme.spacing(2)
  }
}));

export const Images = ({ values, formOnChange, skuId }) => {
  const classes = useStyles();
  const { images } = values;
  const { onAddImageClick, onFileChange, onRemove } = formOnChange;

  const handleAddImageClick = useCallback(() => {
    onAddImageClick(skuId);
  }, [onAddImageClick, skuId]);

  const handleImageRemove = useCallback(
    (index) => () => {
      onRemove(index);
    },
    [onRemove]
  );

  return (
    <>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid key={image.id} item xs={12}>
            <UploadAndViewImage
              id={image.id}
              index={index}
              onFileChange={onFileChange}
              onRemove={handleImageRemove(index)}
              file={image.file}
            />
            {image.error ? (
              <FormHelperText error className={classes.helperText}>
                {image.error}
              </FormHelperText>
            ) : null}
            {image.inProgress ? (
              <LinearProgress
                className={classes.progress}
                color="primary"
                value={image.percentage}
                variant="determinate"
              />
            ) : null}
          </Grid>
        ))}
      </Grid>
      <Button
        className={classes.addOptions}
        color="secondary"
        variant="contained"
        onClick={handleAddImageClick}
      >
        Add Image
      </Button>
    </>
  );
};

Images.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  skuId: PropTypes.string
};
