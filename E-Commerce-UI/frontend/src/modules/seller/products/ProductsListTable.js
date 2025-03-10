import React, { useCallback, useMemo } from 'react';
import { resource } from 'modules/resources';
import {
  makeStyles,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  StringFormatter2,
  NameFormatter,
  TagFormatter,
  ProductStatusFormatter
} from 'modules/common/components/formatters';
import { useDialogState } from 'modules/common/hooks/useDialogState';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { EditDialog } from 'modules/common/components/EditDialog';
import {
  useProducts,
  usePutProduct,
  useFormOnBasicDetailsChange,
  useProductBasicDetailsFormState
} from 'modules/productCommon/hooks';
import { ProductBasicDetailsEdit } from 'modules/productCommon/ProductBasicDetails';
import { useIsScreenDown } from 'modules/common';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const useColumnStyles = makeStyles((theme) => ({
  tags: {
    maxWidth: theme.spacing(40)
  }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  addButton: {
    marginLeft: theme.spacing(2)
  },
  noDataMessage: {
    marginLeft: theme.spacing(3),
    fontStyle: 'italic'
  },
  circularProgressContainer: {
    width: '100%'
  },
  circularProgress: {
    marginLeft: '45%'
  }
}));

const {
  seller: { product }
} = resource;

const useColumns = ({ onRowClick, classes, isMobile }) =>
  [
    {
      id: 'name',
      label: product.name,
      renderer: NameFormatter,
      custom: { onClick: onRowClick },
      visible: true
    },
    {
      id: 'commonName',
      label: product.commonName,
      renderer: StringFormatter,
      visible: true
    },
    {
      id: 'tags',
      label: product.tags,
      renderer: TagFormatter,
      className: classes.tags,
      visible: !isMobile
    },
    {
      id: 'locationTags',
      label: product.locationTags,
      renderer: TagFormatter,
      className: classes.tags,
      visible: !isMobile
    },
    {
      id: 'category',
      label: product.category,
      renderer: StringFormatter2,
      visible: true
    },
    {
      id: 'status',
      label: 'Status',
      renderer: ProductStatusFormatter,
      visible: true
    }
  ].filter((c) => c.visible);

export const ProductsListTable = ({ sellerId, path }) => {
  const isMobile = useIsScreenDown('sm');
  const tableClasses = useTableStyles();
  const columnClasses = useColumnStyles();
  const classes = useStyles();
  const { putProduct } = usePutProduct();
  const history = useHistory();

  const {
    isDialogOpen,
    closeDialog: closeEditDialog,
    openDialog: openEditDialog
  } = useDialogState(false);

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
    validateForm,
    resetForm
  } = useProductBasicDetailsFormState({
    sellerId,
    putProduct,
    history,
    path,
    closeEditDialog,
    isAddMode: true
  });

  const loader = useMemo(
    () => (
      <div className={classes.circularProgressContainer}>
        <CircularProgress size={20} className={classes.circularProgress} />
      </div>
    ),
    [classes.circularProgressContainer, classes.circularProgress]
  );

  const formOnChange = useFormOnBasicDetailsChange({ setFieldValue });

  const { loading, products, loadMore, hasMore } = useProducts({ sellerId });

  const onRowClick = useCallback(
    (id) => {
      history.push(`${path}/${id}?edit=${true}`);
    },
    [history, path]
  );

  const columns = useColumns({ onRowClick, classes: columnClasses, isMobile });

  if (loading) return null;

  return (
    <div className={classes.root}>
      {!products || !products.length ? (
        <Typography className={classes.noDataMessage}>
          No Products has been added.
        </Typography>
      ) : null}
      <Button className={classes.addButton} onClick={openEditDialog}>
        + Add New
      </Button>
      {products && products.length > 0 ? (
        <ListTable
          classes={tableClasses}
          records={products}
          isLoading={loading}
          columns={columns}
          hasMore={hasMore}
          next={loadMore}
          loader={loader}
        />
      ) : null}
      {isDialogOpen ? (
        <EditDialog
          open={isDialogOpen}
          closeEditDialog={closeEditDialog}
          EditContent={ProductBasicDetailsEdit}
          values={values}
          fullScreen={isMobile}
          formOnChange={formOnChange}
          onSaveClick={handleSubmit}
          title="Add Product"
          errors={errors}
          validateForm={validateForm}
          resetForm={resetForm}
        />
      ) : null}
    </div>
  );
};

ProductsListTable.propTypes = {
  sellerId: PropTypes.string,
  path: PropTypes.string
};
