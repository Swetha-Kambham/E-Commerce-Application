import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinkButton } from '../LinkButton';
import { FlexView } from '../FlexView';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  container: {
    display: 'inline-flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  button: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonLabel: {
    whiteSpace: 'nowrap'
  }
}));

export const HeaderTabs = () => {
  const classes = useStyles();

  const buttonClasses = useMemo(
    () => ({ root: classes.button, label: classes.buttonLabel }),
    [classes.button, classes.buttonLabel]
  );

  return (
    <FlexView className={classes.root}>
      <div className={classes.container}>
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="NEW IN"
          to={`/explore?category=${1}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="CLOTHING & ACCESSORIES"
          to={`/explore?category=${2}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="ART & STATIONERY"
          to={`/explore?category=${3}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="ORNAMENTS"
          to={`/explore?category=${4}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="FESTIVALS & WEDDING"
          to={`/explore?category=${5}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="HOME DECOR"
          to={`/explore?category=${6}`}
        />
        <LinkButton
          classes={buttonClasses}
          variant="text"
          color="primary"
          tabIndex={0}
          label="EATABLES"
          to={`/explore?category=${7}`}
        />
      </div>
    </FlexView>
  );
};
