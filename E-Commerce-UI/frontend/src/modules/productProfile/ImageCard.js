import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useImageCardHook } from './hooks';
import { ResizableView } from './ResizableView';
import { ImageView } from './ImageView';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    cursor: 'ne-resize',
    position: 'relative'
  },
  zoom: {
    maxWidth: 'unset',
    width: '100%',
    height: '100%'
  }
}));

export const ImageCard = ({ productUnit, isMobile }) => {
  const classes = useStyles();
  const {
    onLeftArrowClick,
    onRightArrowClick,
    currentImageIndex,
    hasMoreLeftIndex,
    hasMoreRightIndex,
    setCurrentImageIndex,
    fullSize,
    onZoomIn,
    onZoomOut
  } = useImageCardHook({ images: productUnit.images });

  return (
    <ResizableView isMobile={isMobile} open={fullSize} onClose={onZoomOut}>
      <Card className={classes.root} key="normalView">
        <ImageView
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          currentImageIndex={currentImageIndex}
          hasMoreLeftIndex={hasMoreLeftIndex}
          hasMoreRightIndex={hasMoreRightIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onZoomIn={onZoomIn}
          images={productUnit.images}
        />
      </Card>
      <div className={classes.zoom} key="zoomView">
        <ImageView
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          currentImageIndex={currentImageIndex}
          hasMoreLeftIndex={hasMoreLeftIndex}
          hasMoreRightIndex={hasMoreRightIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onZoomIn={onZoomIn}
          images={productUnit.images}
          onZoomOut={onZoomOut}
          zoomView
        />
      </div>
    </ResizableView>
  );
};

ImageCard.propTypes = {
  productUnit: PropTypes.objectOf(PropTypes.any),
  isMobile: PropTypes.bool
};
