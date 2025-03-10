import React, { useCallback } from 'react';
import { Paper, InputBase, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { useIsMobile } from '../hooks/useScreenSize';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  paper: {
    display: 'flex',
    padding: theme.spacing(0, 2, 0, 2),
    borderRadius: theme.spacing(2)
  },
  inputContainer: { width: '80%' },
  searchIcon: {
    float: 'right'
  }
}));

export const Search = ({
  classes: searchClasses,
  onMenuClick,
  onTextChange,
  onSearchClick,
  value
}) => {
  const { isMobile } = useIsMobile();
  const classes = useStyles({ classes: searchClasses });

  const onChange = useCallback(
    (event) => {
      const { value: val } = event.target;
      onTextChange(val);
    },
    [onTextChange]
  );

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onSearchClick();
      }
    },
    [onSearchClick]
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isMobile ? (
          <IconButton onClick={onMenuClick} aria-label="menu">
            <MenuIcon />
          </IconButton>
        ) : null}
        <InputBase
          onChange={onChange}
          onKeyPress={handleKeyPress}
          value={value}
          fullWidth
          placeholder="Search Products"
        />
        <IconButton
          onClick={onSearchClick}
          className={classes.searchIcon}
          aria-label="Search Products"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

Search.propTypes = {
  classes: PropTypes.object,
  onMenuClick: PropTypes.func,
  onTextChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  value: PropTypes.string
};
