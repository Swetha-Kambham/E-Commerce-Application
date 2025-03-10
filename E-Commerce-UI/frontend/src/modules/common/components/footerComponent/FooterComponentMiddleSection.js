import React, { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { LinkButton } from 'modules/common/components/LinkButton';
import { v4 } from 'uuid';
import { CrafthillsLogo } from '../CrafthillsLogo';
import { IconLinkButton } from '../IconLinkButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    padding: theme.spacing(2)
  },
  primaryContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  secondaryContainer: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  buttonsContainer: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    display: 'inline-flex'
  },
  logo: {
    width: theme.spacing(10)
  }
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    fontSize: '0.75rem',
    color: '#ffffff',
    textTransform: 'none',
    float: 'left',
    minWidth: 'unset',
    textAlign: 'left'
  }
}));

const useAboutUsStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    fontSize: '0.75rem',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2)
  }
}));

const useSellWithUsUsStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    fontSize: '0.75rem',
    color: '#ffffff',
    textTransform: 'uppercase',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  label: {
    textAlign: 'left'
  }
}));

export const FooterComponentMiddleSection = () => {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();
  const sellWithUsUsClasses = useSellWithUsUsStyles();
  const [id] = useState(v4());

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={classes.buttonsContainer}>
            <IconLinkButton
              to="/"
              className={classes.logo}
              icon={<CrafthillsLogo id={id} color="white" />}
            />
          </div>
          <div className={classes.buttonsContainer}>
            <LinkButton
              to="/terms-of-use"
              size="small"
              color="primary"
              classes={buttonClasses}
              label="Terms of use"
            />
          </div>
          <div className={classes.buttonsContainer}>
            <LinkButton
              to="/privacy-policy"
              size="small"
              color="primary"
              classes={buttonClasses}
              label="Privacy policy"
            />
          </div>
          <div className={classes.primaryContainer}>
            <LinkButton
              to="/about-us"
              size="small"
              color="primary"
              classes={useAboutUsStyles()}
              label="ABOUT US"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <LinkButton
            to="/seller"
            size="small"
            color="primary"
            classes={sellWithUsUsClasses}
            label="SELL WITH US"
          />
        </Grid>
      </Grid>
    </div>
  );
};
