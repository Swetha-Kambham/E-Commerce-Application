import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Button, Typography, IconButton } from '@material-ui/core';
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
  id,
  index,
  onFileChange,
  onRemove,
  file
}) => {
  const classes = useStyles();

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (onFileChange) onFileChange(index, acceptedFiles[0], rejectedFiles[0]);
    },
    [onFileChange, index]
  );

  const handleRemoveClick = useCallback(() => {
    if (onRemove) onRemove(index);
  }, [onRemove, index]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
    minSize: 1024 * 200,
    accept: 'image/jpeg'
  });

  const preview = file ? URL.createObjectURL(file) : null;

  return (
    <div
      {...getRootProps({
        className: clsx(classes.root, isDragActive && classes.activeDrag)
      })}
    >
      {preview ? (
        <>
          <IconButton
            className={classes.closeButton}
            onClick={handleRemoveClick}
          >
            <CloseIcon size="small" />
          </IconButton>
          <img src={preview} alt="Not Available" />
        </>
      ) : (
        <>
          <input {...getInputProps()} />
          <CloudUploadIcon
            className={classes.uploadIcon}
            color="action"
            fontSize="large"
          />
          {file && file.name ? <Typography>{file.name}</Typography> : null}
          <Typography className={classes.dropImageLabel}>
            Drop your image here
          </Typography>
          <Button className={classes.selectImageButton} variant="contained">
            Select Image
          </Button>
        </>
      )}
    </div>
  );
};

UploadAndViewImage.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  onFileChange: PropTypes.func,
  onRemove: PropTypes.func,
  file: PropTypes.objectOf(PropTypes.any)
};
