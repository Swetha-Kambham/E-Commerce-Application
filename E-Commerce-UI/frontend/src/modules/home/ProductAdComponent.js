import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Radio, CardActionArea, CardMedia } from '@material-ui/core';
import { usePageOfProductView } from 'modules/common/hooks/usePageOfProductView';
import { ProductAdComponentSkeleton } from './ProductAdComponentSkeleton';

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative' },
  radioButtonOuterContainer: {
    fontSize: '1rem',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  radioButtonInnerContainer: {
    margin: 'auto'
  },
  leftButton: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  rightButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
}));

const colors = {
  0: 'primary',
  1: 'default',
  2: 'secondary'
};

export const ProductAdComponent = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { productViews: views, loading } = usePageOfProductView(1, 20, {
    isEnabled: true,
    priorityStartRange: 0,
    priorityEndRange: 21
  });

  const productViews = useMemo(
    () => (views || []).filter((v) => v.images && v.images.length),
    [views]
  );
  const timeoutRef = useRef(null);

  const handleLeftOrRightClick = useCallback(
    (delta) => (event) => {
      setSelectedIndex(
        (selectedIndex + delta + productViews.length) % productViews.length
      );
      event && event.stopPropagation();
      if (timeoutRef && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [productViews.length, selectedIndex]
  );

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (productViews && productViews.length)
        setSelectedIndex((selectedIndex + 1) % productViews.length);
    }, 5000);
  }, [productViews, selectedIndex]);

  if (loading) return <ProductAdComponentSkeleton />;

  if (!productViews || !productViews.length) return null;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div>
          <CardMedia
            id={productViews[selectedIndex] && productViews[selectedIndex].id}
            component="img"
            alt="View Not Available"
            height="500"
            image={
              productViews[selectedIndex] &&
              productViews[selectedIndex].images &&
              productViews[selectedIndex].images[0] &&
              productViews[selectedIndex].images[0].url
            }
          />
          <div className={classes.radioButtonOuterContainer}>
            <div className={classes.radioButtonInnerContainer}>
              {productViews.map((view, index) => {
                return (
                  <Radio
                    key={view.id}
                    color={colors[index % 3]}
                    onChange={handleLeftOrRightClick(index - selectedIndex)}
                    size="small"
                    checked={selectedIndex === index}
                    name="radio-button-demo"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};
