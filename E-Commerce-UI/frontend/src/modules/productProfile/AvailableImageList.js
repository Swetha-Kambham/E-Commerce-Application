import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    overflowY: 'hidden'
  },
  cell: {
    cursor: 'pointer',
    margin: theme.spacing(0.5),
    '&:hover': {
      opacity: '70%'
    }
  },
  selected: {
    border: '1px solid blue'
  }
}));

export const AvailableImageList = ({
  images,
  setCurrentImageIndex,
  currentImageIndex
}) => {
  const classes = useStyles();

  const onCellClick = useCallback(
    (index, enter) => (event) => {
      if (enter && event && event.keyCode !== 13) return;

      setCurrentImageIndex(index);

      event && event.stopPropagation();
    },
    [setCurrentImageIndex]
  );

  return (
    <GridList className={classes.gridList} cols={2.5}>
      {(images || []).map((img, index) => (
        <GridListTile
          className={clsx(
            classes.cell,
            index === currentImageIndex && classes.selected
          )}
          onClick={onCellClick(index)}
          onKeyDown={onCellClick(index, true)}
          tabIndex={0}
          rows={0.3}
          cols={0.4}
          key={img.key}
        >
          <img src={img.url} alt="Not Available" />
        </GridListTile>
      ))}
    </GridList>
  );
};

AvailableImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any),
  setCurrentImageIndex: PropTypes.func,
  currentImageIndex: PropTypes.number
};
