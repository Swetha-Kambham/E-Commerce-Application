import React from 'react';
import { Typography, Breadcrumbs, makeStyles } from '@material-ui/core';
import { resource } from 'modules/resources';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: theme.spacing(10),
    backgroundColor: '#e8e8e2',
    display: 'flex'
  },
  breadcrumbs: {
    marginLeft: theme.spacing(2),
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

const { admin: resourceLabel } = resource;

export const AdminHeader = () => {
  const location = useLocation();
  const paths = location.pathname.split('/');

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
        {paths.map((path, index) => {
          const to = paths.slice(0, index + 1).join('/');

          if (!path) return null;
          if (index === paths.length - 1)
            return (
              <Typography color="textPrimary">
                {resourceLabel[path] || path}
              </Typography>
            );

          return (
            <Link key={path} to={to}>
              {resourceLabel[path] || path}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

AdminHeader.propTypes = {};
