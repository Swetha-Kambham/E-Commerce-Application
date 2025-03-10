import React, { useCallback, useState, useMemo } from 'react';
import { Accordion, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    '&:before': {
      backgroundColor: 'unset'
    }
  },
  container: {
    display: 'flex',
    '&:hover': {
      backgroundColor: '#999999'
    },
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(2)
  },
  expandIcon: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  label: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  expand: {
    color: '#000000'
  }
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: theme.spacing(1),
    borderColor: '#010101',
    backgroundColor: '#ffffff',
    maxHeight: theme.spacing(5),
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  label: {
    justifyContent: 'left',
    fontSize: '0.875rem',
    textTransform: 'none',
    fontWeight: 600
  },
  endIcon: {
    marginLeft: 'auto',
    color: '#000000'
  }
}));

export const ExpansionPanel = ({
  defaultExpanded,
  label,
  children,
  expansionPanelClasses
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const onExpandColapseClick = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const icon = useMemo(
    () =>
      expanded ? (
        <ExpandLessIcon className={classes.expand} />
      ) : (
        <ExpandMoreIcon className={classes.expand} />
      ),
    [expanded, classes.expand]
  );

  return (
    <Accordion
      className={clsx(
        classes.root,
        expansionPanelClasses && expansionPanelClasses.root
      )}
      expanded={expanded}
      defaultExpanded={defaultExpanded}
    >
      <Button
        fullWidth
        classes={useButtonStyles()}
        onClick={onExpandColapseClick}
        endIcon={icon}
      >
        {label}
      </Button>

      {expanded ? children : null}
    </Accordion>
  );
};

ExpansionPanel.propTypes = {
  defaultExpanded: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  expansionPanelClasses: PropTypes.objectOf(PropTypes.any)
};
