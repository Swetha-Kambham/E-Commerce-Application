import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  makeStyles,
  Button,
  Typography,
  IconButton,
  FormHelperText
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CircularProgressWithLabel, FlexView } from 'modules/common';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '3px dashed #42c3ac',
    transition: 'all 0.5s cubic-bezier(0,0.5,0.5,1)',
    cursor: 'pointer',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    position: 'relative',
    backgroundColor: '#e7eaea'
  },
  closeButton: {
    position: 'absolute',
    top: '2%',
    right: '1%',
    backgroundColor: '#ffffff',
    opacity: '80%',
    '&:hover': {
      backgroundColor: '#ffffff',
      opacity: '100%'
    }
  },
  activeDrag: {
    backgroundColor: '#dddddd'
  },
  uploadIcon: {
    fontSize: '4rem',
    margin: 'auto'
  },
  dropImageLabel: {
    margin: 'auto'
  },
  selectImageButton: {
    margin: 'auto',
    maxWidth: theme.spacing(25)
  },
  progressContainer: {
    margin: 'auto'
  }
}));

export const ImageSection = ({ editable, image, setFieldValue }) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles && acceptedFiles.length) {
        setFieldValue('image.error', null);
        setFieldValue('image.file', acceptedFiles[0]);
        setFieldValue('image.url', URL.createObjectURL(acceptedFiles[0]));
      }
      if (rejectedFiles && rejectedFiles.length) {
        setFieldValue('image.error', rejectedFiles[0].errors[0].message);
      }
    },
    [setFieldValue]
  );

  const handleRemoveClick = useCallback(() => {
    setFieldValue('image', {});
  }, [setFieldValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    minSize: 1024 * 200,
    accept: 'image/jpeg'
  });

  return (
    <>
      {image.inProgress && image.percentage ? (
        <FlexView>
          <div className={classes.progressContainer}>
            <CircularProgressWithLabel value={image.percentage} />
          </div>
        </FlexView>
      ) : null}
      <div
        {...getRootProps({
          className: clsx(classes.root, isDragActive && classes.activeDrag)
        })}
      >
        {!editable || image.url ? (
          <>
            {editable ? (
              <IconButton
                className={classes.closeButton}
                onClick={handleRemoveClick}
              >
                <CloseIcon size="small" />
              </IconButton>
            ) : null}
            <img src={image.url} alt="Not Available" />
          </>
        ) : (
          <>
            <input {...getInputProps()} />
            <CloudUploadIcon
              className={classes.uploadIcon}
              color="action"
              fontSize="large"
            />
            {image?.file?.name ? (
              <Typography>{image.file.name}</Typography>
            ) : null}
            <Typography className={classes.dropImageLabel}>
              Drop your image here
            </Typography>
            <Button className={classes.selectImageButton} variant="contained">
              Select Image
            </Button>
          </>
        )}
      </div>
      {image && image.error ? (
        <FormHelperText error className={classes.helperText}>
          {image.error}
        </FormHelperText>
      ) : null}
    </>
  );
};

ImageSection.propTypes = {
  editable: PropTypes.bool,
  setFieldValue: PropTypes.func,
  image: PropTypes.object
};
