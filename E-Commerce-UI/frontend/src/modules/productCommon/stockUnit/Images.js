import React, { useCallback } from 'react';
import {
  Grid,
  makeStyles,
  Button,
  FormHelperText,
  LinearProgress,
  Typography,
  CardMedia
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
  },
  image: {
    height: theme.spacing(30),
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(15)
    }
  }
}));

export const Images = ({
  images,
  skuId,
  onAddImageClick,
  onRemoveImageClick,
  onClearImageClick,
  onFileChange,
  editable,
  error,
  helperText
}) => {
  const classes = useStyles();

  const handleAddImageClick = useCallback(() => {
    onAddImageClick(skuId);
  }, [onAddImageClick, skuId]);

  return (
    <>
      <Grid item xs={12}>
        <Typography>
          {editable ? 'Images (Upload atleast two clear images)' : 'Images'}
        </Typography>
      </Grid>
      {images.map((image, index) => (
        <Grid key={image.id} item xs={6}>
          {editable ? (
            <UploadAndViewImage
              index={index}
              onFileChange={onFileChange(index)}
              onRemove={onRemoveImageClick(index)}
              onClear={onClearImageClick(index)}
              image={image}
              showRemoveButton={index >= 2 || Boolean(image.url)}
            />
          ) : (
            <CardMedia
              alt="Not available"
              tabIndex={0}
              className={classes.image}
              image={image.url}
            />
          )}
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
      {error ? (
        <FormHelperText error className={classes.helperText}>
          {helperText}
        </FormHelperText>
      ) : null}
      {editable ? (
        <Grid item xs={12}>
          <Button
            className={classes.addOptions}
            color="secondary"
            variant="contained"
            onClick={handleAddImageClick}
          >
            + Add More Images
          </Button>
        </Grid>
      ) : null}
    </>
  );
};

Images.propTypes = {
  images: PropTypes.array,
  onAddImageClick: PropTypes.func,
  onRemoveImageClick: PropTypes.func,
  onClearImageClick: PropTypes.func,
  onFileChange: PropTypes.func,
  editable: PropTypes.bool,
  skuId: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string
};
