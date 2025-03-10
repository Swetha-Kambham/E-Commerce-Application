import React from 'react';
import { makeStyles } from '@material-ui/core';
import { NoDataMessage } from 'modules/common';
import PropTypes from 'prop-types';
import { resource } from 'modules/resources';
import {
  ListTable,
  NameFormatter,
  NumberFormatter
} from 'modules/common/components';
import { PriceFormatter } from './PriceFormatter';
import { ActionMenuFormatter } from './ActionMenuFormatter';

const useStyles = makeStyles((theme) => ({
  noDataMessageContainer: { padding: theme.spacing(2) }
}));

const useTableStyles = makeStyles((theme) => ({
  table: {
    '& tbody tr td:first-child': {
      width: theme.spacing(5)
    }
  },
  headerCell: {},
  tableCell: {}
}));

const useColumns = ({ onRowClick, onDeleteSKU, editable }) => [
  ...(editable
    ? [
        {
          id: 'action',
          label: '',
          renderer: ActionMenuFormatter,
          custom: { onDeleteClick: onDeleteSKU }
        }
      ]
    : []),
  {
    id: 'code',
    label: resourceLabel.code,
    renderer: NameFormatter,
    custom: { onClick: onRowClick }
  },
  {
    id: 'quantity',
    label: resourceLabel.quantity,
    renderer: NumberFormatter,
    custom: {}
  },
  {
    id: 'pricePerUnit',
    label: resourceLabel.pricePerUnit,
    renderer: PriceFormatter
  },
  {
    id: 'sellingPricePerUnit',
    label: resourceLabel.sellingPricePerUnit,
    renderer: PriceFormatter
  }
];

const { productCommon: resourceLabel } = resource;

export const ProductSKUTable = ({
  productSkus,
  onRowClick,
  onDeleteSKU,
  editable
}) => {
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const columns = useColumns({ onRowClick, onDeleteSKU, editable });

  return (
    <>
      {productSkus && productSkus.length ? (
        <ListTable
          classes={tableClasses}
          records={productSkus}
          columns={columns}
        />
      ) : (
        <div className={classes.noDataMessageContainer}>
          <NoDataMessage message="No any units are there" />
        </div>
      )}
    </>
  );
};

ProductSKUTable.propTypes = {
  productSkus: PropTypes.array,
  onRowClick: PropTypes.func,
  onDeleteSKU: PropTypes.func,
  editable: PropTypes.bool
};
