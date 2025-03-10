import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Menu, MenuItem, IconButton } from '@material-ui/core';
import { resource } from 'modules/resources';
import { DrawerToggleButton } from 'modules/common';
import PersonIcon from '@material-ui/icons/Person';
import { LinkTab } from 'modules/common/components';
import { CrafthillsLogo } from 'modules/common/components/CrafthillsLogo';
import { IconLinkButton } from 'modules/common/components/IconLinkButton';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ADC8C4',
    backgroundImage: 'linear-gradient(to top, white, transparent)'
  },
  logo: {
    width: theme.spacing(20)
  },
  tabContainer: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonContainer: {
    padding: theme.spacing(2),
    display: 'flex'
  },
  signOut: {
    marginLeft: 'auto',
    width: theme.spacing(10)
  },
  togglebutton: {
    width: theme.spacing(10),
    marginTop: theme.spacing(1)
  }
}));

const useTabStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    color: 'black'
  }
}));

const {
  seller: { header: resourceLabel }
} = resource;

export const Header = ({
  isMobile,
  handleTabChange,
  homeButtonClick,
  tabs,
  value,
  openDialog,
  closeDialog,
  isDialogOpen,
  logout
}) => {
  const classes = useStyles();

  const handleToggleButtonClick = useCallback(() => {
    if (isDialogOpen) closeDialog();
    else openDialog();
  }, [closeDialog, isDialogOpen, openDialog]);

  return (
    <AppBar className={classes.root} position="static">
      <div className={classes.buttonContainer}>
        {isMobile ? (
          <DrawerToggleButton
            onClick={handleToggleButtonClick}
            className={classes.togglebutton}
          />
        ) : null}
        <IconLinkButton
          to="/"
          icon={<CrafthillsLogo className={classes.logo} />}
        />
        {!isMobile ? (
          <SignOutMenu classes={classes} onSignOutClick={logout} />
        ) : null}
      </div>
      {!isMobile ? (
        <HeaderInternal
          tabs={tabs}
          classes={classes}
          handleTabChange={handleTabChange}
          value={value}
        />
      ) : null}
    </AppBar>
  );
};

Header.propTypes = {
  isMobile: PropTypes.bool,
  handleTabChange: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  homeButtonClick: PropTypes.func,
  value: PropTypes.string,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
  isDialogOpen: PropTypes.bool,
  logout: PropTypes.func
};

const HeaderInternal = ({ tabs, classes, handleTabChange, value }) => {
  const tabClasses = useTabStyles();

  return (
    <div className={classes.tabContainer}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="off"
        aria-label="seller-header"
      >
        <LinkTab
          tabIndex={0}
          classes={tabClasses}
          label={tabs.dashboard.label}
          value={tabs.dashboard.value}
          href="/seller"
          disabled={tabs.dashboard.disabled}
        />
        <LinkTab
          classes={tabClasses}
          tabIndex={0}
          label={tabs.profile.label}
          value={tabs.profile.value}
          href="/seller/profile"
          disabled={tabs.profile.disabled}
        />
        <LinkTab
          classes={tabClasses}
          tabIndex={0}
          label={tabs.products.label}
          value={tabs.products.value}
          href="/seller/products"
          disabled={tabs.products.disabled}
        />
        <LinkTab
          tabIndex={0}
          classes={tabClasses}
          label={tabs.orders.label}
          value={tabs.orders.value}
          href="/seller/orders"
          disabled={tabs.orders.disabled}
        />
        <LinkTab
          classes={tabClasses}
          tabIndex={0}
          label={tabs.reviews.label}
          value={tabs.reviews.value}
          href="/seller/reviews"
          disabled={tabs.reviews.disabled}
        />
      </Tabs>
    </div>
  );
};

HeaderInternal.propTypes = {
  handleTabChange: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any)
};

export const SignOutMenu = ({ onSignOutClick, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = useCallback(() => {
    onSignOutClick();
    handleClose();
  }, [onSignOutClick, handleClose]);

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        className={classes.signOut}
        onClick={handleClick}
      >
        <PersonIcon fontSize="medium" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="sign-out" onClick={handleSignOut}>
          {resourceLabel.signOut}
        </MenuItem>
      </Menu>
    </>
  );
};

SignOutMenu.propTypes = {
  onSignOutClick: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.any)
};
