import React, { useState, useCallback } from 'react';
import { resource } from 'modules/resources';
import { makeStyles, Button } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  BooleanFormatter,
  NameFormatter
} from 'modules/common/components/formatters';
import { NoDataMessage } from 'modules/common/components/NoDataMessage';
import { useCategories } from './hooks';
import { EditCategory } from './EditCategory';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const useStyles = makeStyles((theme) => ({
  addNewButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  noDataContainer: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
}));

const useColumnStyles = makeStyles((theme) => ({
  name: {
    '&:hover': { backgroundColor: '#3f51b50a' }
  }
}));

const {
  admin: { category: resourceLabel }
} = resource;

const useColumns = ({ classes, onRowClick }) => [
  {
    id: 'name',
    label: resourceLabel.name,
    renderer: NameFormatter,
    className: classes.name,
    custom: {
      onClick: onRowClick
    }
  },
  {
    id: 'description',
    label: resourceLabel.description,
    renderer: StringFormatter
  },
  { id: 'parentId', label: resourceLabel.parent, renderer: StringFormatter },
  { id: 'enabled', label: resourceLabel.enabled, renderer: BooleanFormatter }
];

export const Categories = () => {
  const tableClasses = useTableStyles();
  const columnClasses = useColumnStyles();
  const classes = useStyles();
  const { loading, categories } = useCategories();

  const [categoryId, setCategoryId] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const onRowClick = useCallback((id) => {
    setIsEditDrawerOpen(true);
    setCategoryId(id);
  }, []);
  const onAddClick = useCallback(() => {
    setCategoryId(null);
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
      {categories.length === 0 ? (
        <div className={classes.noDataContainer}>
          <NoDataMessage message="No Categories found" />
        </div>
      ) : (
        <ListTable
          classes={tableClasses}
          records={categories}
          isLoading={loading}
          columns={columns}
        />
      )}
      {isEditDrawerOpen ? (
        <EditCategory
          open={isEditDrawerOpen}
          onClose={onClose}
          isAaddMode={!categoryId}
          id={categoryId}
        />
      ) : null}
    </>
  );
};
