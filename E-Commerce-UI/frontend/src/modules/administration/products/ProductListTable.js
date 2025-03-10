import React, { useCallback, useMemo } from 'react';
import { resource } from 'modules/resources';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ListTable } from 'modules/common/components/listTable';
import {
  StringFormatter,
  StringFormatter2,
  TagFormatter,
  NameFormatter,
  ProductStatusFormatter
} from 'modules/common/components/formatters';
import { useProducts } from 'modules/productCommon/hooks';

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
  circularProgressContainer: {
    width: '100%'
  },
  circularProgress: {
    marginLeft: '45%'
  }
}));

const {
  admin: { product }
} = resource;

const useColumns = ({ classes, onRowClick }) => [
  {
    id: 'name',
    label: product.name,
    renderer: NameFormatter,
    custom: { onClick: onRowClick }
  },
  { id: 'commonName', label: product.commonName, renderer: StringFormatter },
  {
    id: 'tags',
    label: product.tags,
    renderer: TagFormatter,
    className: classes.tags
  },
  {
    id: 'locationTags',
    label: product.locationTags,
    renderer: TagFormatter,
    className: classes.tags
  },
  { id: 'seller', label: product.seller, renderer: StringFormatter2 },
  { id: 'category', label: product.category, renderer: StringFormatter2 },
  { id: 'status', label: 'Status', renderer: ProductStatusFormatter }
];

export const ProductListTable = ({ path }) => {
  const tableClasses = useTableStyles();
  const classes = useStyles();
  const history = useHistory();
  const columnClasses = useColumnStyles();

  const onRowClick = useCallback(
    (id) => {
      history.push(`${path}/${id}/view`);
    },
    [history, path]
  );

  const loader = useMemo(
    () => (
      <div className={classes.circularProgressContainer}>
        <CircularProgress size={20} className={classes.circularProgress} />
      </div>
    ),
    [classes.circularProgressContainer, classes.circularProgress]
  );

  const columns = useColumns({ classes: columnClasses, onRowClick });

  const { loading, products, loadMore, hasMore } = useProducts({});

  if (loading) return null;

  if (products.length === 0) return <div>No Data</div>;

  return (
    <ListTable
      classes={tableClasses}
      records={products}
      isLoading={loading}
      columns={columns}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
    />
  );
};

ProductListTable.propTypes = {
  path: PropTypes.string
};
