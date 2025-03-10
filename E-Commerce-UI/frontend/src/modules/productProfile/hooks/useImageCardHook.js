import { useCallback, useState, useMemo } from 'react';

export const useImageCardHook = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullSize, setFullSize] = useState(false);
  const totalImages = images && images.length ? images.length : 0;

  const onLeftArrowClick = useCallback(
    (event) => {
      if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
      event && event.stopPropagation();
    },
    [currentImageIndex]
  );

  const onRightArrowClick = useCallback(
    (event) => {
      if (currentImageIndex < totalImages - 1)
        setCurrentImageIndex(currentImageIndex + 1);

      event && event.stopPropagation();
    },
    [currentImageIndex, totalImages]
  );

  const hasMoreLeftIndex = useMemo(
    () => totalImages > 1 && currentImageIndex > 0,
    [currentImageIndex, totalImages]
  );

  const hasMoreRightIndex = useMemo(
    () => totalImages > 1 && currentImageIndex < totalImages - 1,
    [currentImageIndex, totalImages]
  );

  const onZoomIn = useCallback((event) => {
    if (event && event.type === 'keydown' && event.keyCode !== 13) return;
    setFullSize(true);
  }, []);

  const onZoomOut = useCallback((event) => {
    setFullSize(false);

    event && event.stopPropagation();
  }, []);

  return {
    onLeftArrowClick,
    currentImageIndex,
    onRightArrowClick,
    hasMoreLeftIndex,
    hasMoreRightIndex,
    setCurrentImageIndex,
    fullSize,
    onZoomIn,
    onZoomOut
  };
};
