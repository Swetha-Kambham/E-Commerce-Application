import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, CardMedia } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AvailableImageList } from './AvailableImageList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '85%',
    cursor: 'inherit'
  },
  leftButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(0%, -50%)',
    backgroundColor: '#ffffff',
    opacity: '80%',
    '&:hover': {
      backgroundColor: '#ffffff',
      opacity: '100%'
    }
  },
  righButton: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(0%, -50%)',
    backgroundColor: '#ffffff',
    opacity: '80%',
    '&:hover': {
      backgroundColor: '#ffffff',
      opacity: '100%'
    }
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
  favoriteButton: {
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
  imageList: {
    width: '100%',
    cursor: 'auto',
    position: 'relative',
    bottom: 0
  },
  redColor: {
    color: 'red'
  }
}));

export const ImageView = ({
  hasMoreLeftIndex,
  hasMoreRightIndex,
  onLeftArrowClick,
  onRightArrowClick,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  onZoomIn,
  onZoomOut,
  zoomView
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {hasMoreLeftIndex ? (
        <IconButton className={classes.leftButton} onClick={onLeftArrowClick}>
          <ChevronLeftIcon size="small" />
        </IconButton>
      ) : null}
      <CardMedia
        component="img"
        alt="Not available"
        tabIndex={0}
        className={classes.image}
        image={
          images && images[currentImageIndex] && images[currentImageIndex].url
        }
        onClick={onZoomIn}
        onKeyDown={onZoomIn}
      />
      {hasMoreRightIndex ? (
        <IconButton className={classes.righButton} onClick={onRightArrowClick}>
          <ChevronRightIcon size="small" />
        </IconButton>
      ) : null}
      {zoomView ? (
        <IconButton className={classes.closeButton} onClick={onZoomOut}>
          <CloseIcon size="small" />
        </IconButton>
      ) : (
        <IconButton
          className={clsx(classes.favoriteButton, false && classes.redColor)}
        >
          <FavoriteIcon size="medium" />
        </IconButton>
      )}
      <div className={classes.imageList}>
        <AvailableImageList
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </div>
    </div>
  );
};

ImageView.propTypes = {
  hasMoreLeftIndex: PropTypes.bool,
  hasMoreRightIndex: PropTypes.bool,
  onLeftArrowClick: PropTypes.func,
  onRightArrowClick: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.any),
  currentImageIndex: PropTypes.number,
  setCurrentImageIndex: PropTypes.func,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  zoomView: PropTypes.bool
};
