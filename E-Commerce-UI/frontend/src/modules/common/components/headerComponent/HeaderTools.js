import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import useAuthContext from 'modules/auth';
import { Roles } from 'modules/common/enums';
import { useHistory } from 'react-router-dom';
import { useIsMobile } from 'modules/common/hooks';
import { v4 } from 'uuid';
import { LinkButton } from '../LinkButton';
import { Search } from '../Search';
import { SignedInMenu } from './SignedInMenu';
import { FlexView } from '../FlexView';
import { CrafthillsLogo } from '../CrafthillsLogo';
import { IconLinkButton } from '../IconLinkButton';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(15)
    }
  },
  button: {
    marginLeft: theme.spacing(0.5),
    textTransform: 'none'
  },
  container: {
    display: 'flex',
    float: 'right',
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  homeContainer: {
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  searchContainer: {
    width: theme.spacing(80),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(-5),
    [theme.breakpoints.between('sm', 1000)]: { width: theme.spacing(60) },
    [theme.breakpoints.between(1000, 'md')]: { width: theme.spacing(70) },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(-1.5)
    }
  }
}));

const shoppingCart = <ShoppingCart />;

export const HeaderTools = ({ onDrawerToggleButtonClick }) => {
  const { isMobile } = useIsMobile();
  const history = useHistory();
  const [value, setValue] = useState('');
  const { me, role } = useAuthContext();
  const classes = useStyles();
  const [id] = useState(v4());

  const onSearchTextChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const onSearchClick = useCallback(() => {
    if (value) {
      history.push(`/explore?text=${value}`);
    }
  }, [history, value]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <div className={classes.homeContainer}>
          <IconLinkButton
            to="/"
            icon={<CrafthillsLogo id={id} className={classes.logo} />}
          />
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.container}>
          {isMobile ? null : (
            <>
              {me && me.id && role === Roles.user ? (
                <SignedInMenu />
              ) : (
                <LinkButton
                  to="/login"
                  className={classes.button}
                  size="small"
                  label="Login / Sign Up"
                />
              )}
              <Divider variant="fullWidth" />
            </>
          )}
          <LinkButton
            to="/me/cart"
            className={classes.button}
            size="small"
            endIcon={shoppingCart}
            label="Cart"
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <FlexView>
          <div className={classes.searchContainer}>
            <Search
              onMenuClick={onDrawerToggleButtonClick}
              onTextChange={onSearchTextChange}
              onSearchClick={onSearchClick}
            />
          </div>
        </FlexView>
      </Grid>
    </Grid>
  );
};

HeaderTools.propTypes = {
  onDrawerToggleButtonClick: PropTypes.func
};
