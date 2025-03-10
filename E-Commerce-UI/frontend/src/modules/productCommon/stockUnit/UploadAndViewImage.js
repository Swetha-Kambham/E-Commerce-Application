import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  makeStyles,
  Button,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '3px dashed #42c3ac',
    transition: 'all 0.5s cubic-bezier(0,0.5,0.5,1)',
    cursor: 'pointer',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 2, 0, 2),
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
  }
}));

export const UploadAndViewImage = ({
  image,
  onFileChange,
  onRemove,
  onClear,
  showRemoveButton
}) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (onFileChange) onFileChange(acceptedFiles[0], rejectedFiles[0]);
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    minSize: 1024 * 200,
    accept: 'image/jpeg'
  });

  return (
    <div
      {...getRootProps({
        className: clsx(classes.root, isDragActive && classes.activeDrag)
      })}
    >
      {showRemoveButton ? (
        <Tooltip title={image.url ? 'Clear Image' : 'Remove'}>
          <IconButton
            className={classes.closeButton}
            onClick={image.url ? onClear : onRemove}
          >
            <CloseIcon size="small" />
          </IconButton>
        </Tooltip>
      ) : null}
      {image.url ? (
        <>
          <img src={image.url} alt="Not Available" />
          {image.file && image.file.name ? (
            <Typography variant="caption">{image.file.name}</Typography>
          ) : null}
        </>
      ) : (
        <>
          <input {...getInputProps()} />
          <CloudUploadIcon
            className={classes.uploadIcon}
            color="action"
            fontSize="large"
          />
          <Typography className={classes.dropImageLabel}>
            Drop your image here
          </Typography>
          <Button className={classes.selectImageButton} variant="contained">
            Choose Image
          </Button>
        </>
      )}
    </div>
  );
};

UploadAndViewImage.propTypes = {
  image: PropTypes.object,
  onFileChange: PropTypes.func,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  showRemoveButton: PropTypes.bool
};
