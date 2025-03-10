import React, { useCallback, useState, useMemo } from 'react';
import {
  Button,
  Menu,
  ListItemText,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useLogout } from 'modules/common/hooks/useLogout';
import { LinkMenuItem } from 'modules/common/components/LinkMenuItem';

const useStyles = makeStyles((theme) => ({ me: { textTransform: 'none' } }));

const StyledMenu = React.forwardRef(function myFunction(props, ref) {
  return (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      {...props}
    />
  );
});

export const SignedInMenu = () => {
  const classes = useStyles();
  const { logout } = useLogout();

  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = useCallback((event) => {
    setExpanded(true);
    setAnchorEl(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setExpanded(false);
    setAnchorEl(null);
  }, []);

  const icon = useMemo(
    () => (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />),
    [expanded]
  );

  return (
    <div>
      <Button className={classes.me} onClick={onClick} endIcon={icon}>
        Me
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <LinkMenuItem onClick={onClose} to="/me">
          <ListItemText primary="My Account" />
        </LinkMenuItem>
        <LinkMenuItem onClick={onClose} to="/me/orders">
          <ListItemText primary="Orders" />
        </LinkMenuItem>
        <MenuItem onClick={onClose}>
          <ListItemText onClick={logout} primary="Sign Out" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
