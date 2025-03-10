import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { useDialogState } from 'modules/common/hooks/useDialogState';
import { HeaderTools } from './HeaderTools';
import { HeaderTabs } from './HeaderTabs';
import { SideDrawer2 } from '../SideDrawer2';
import { DrawerMenu } from './DrawerMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative'
  },
  container: {
    padding: theme.spacing(2),
    display: 'flex'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export const HeaderComponent = () => {
  const classes = useStyles();
  const { isDialogOpen, openDialog, closeDialog } = useDialogState();

  return (
    <>
      <Paper square className={classes.root}>
        <HeaderTools onDrawerToggleButtonClick={openDialog} />
        <HeaderTabs />
      </Paper>
      {isDialogOpen ? (
        <SideDrawer2 open={isDialogOpen} onClose={closeDialog}>
          <DrawerMenu onClose={closeDialog} />
        </SideDrawer2>
      ) : null}
    </>
  );
};

HeaderComponent.propTypes = {};
