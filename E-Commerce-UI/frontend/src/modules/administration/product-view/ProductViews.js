import React, { useState, useCallback } from 'react';
import { makeStyles, Button, Typography } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  BooleanFormatter,
  NameFormatter
} from 'modules/common/components/formatters';
import { usePageOfProductView } from 'modules/common';
import { EditProductView } from './EditProductView';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const useStyles = makeStyles((theme) => ({
  addNewButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}));

const useColumnStyles = makeStyles((theme) => ({
  name: {
    '&:hover': { backgroundColor: '#3f51b50a' }
  }
}));

const useColumns = ({ classes, onRowClick }) => [
  {
    id: 'name',
    label: 'Name',
    renderer: NameFormatter,
    className: classes.name,
    custom: {
      onClick: onRowClick
    }
  },
  { id: 'priority', label: 'Priority', renderer: StringFormatter },
  { id: 'enabled', label: 'Enabled', renderer: BooleanFormatter }
];

export const ProductViews = () => {
  const tableClasses = useTableStyles();
  const columnClasses = useColumnStyles();
  const classes = useStyles();
  const { loading, productViews } = usePageOfProductView();

  const [productViewId, setProductViewId] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const onRowClick = useCallback((id) => {
    setIsEditDrawerOpen(true);
    setProductViewId(id);
  }, []);
  const onAddClick = useCallback(() => {
    setProductViewId(null);
    setIsEditDrawerOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsEditDrawerOpen(false);
  }, []);

  const columns = useColumns({ classes: columnClasses, onRowClick, onClose });

  if (loading) return null;

  return (
    <>
      <Button
        className={classes.addNewButton}
        onClick={onAddClick}
        color="primary"
      >
        +Add New
      </Button>
      {productViews && productViews.length ? (
        <ListTable
          classes={tableClasses}
          records={productViews}
          isLoading={loading}
          columns={columns}
        />
      ) : (
        <Typography>No data available to show</Typography>
      )}
      {isEditDrawerOpen ? (
        <EditProductView
          open={isEditDrawerOpen}
          onClose={onClose}
          isAaddMode={!productViewId}
          id={productViewId}
        />
      ) : null}
    </>
  );
};
