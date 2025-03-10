import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import { useFormikContext } from 'formik';
import { StringFormatter, LoadingButton } from 'modules/common/components';
import { get } from 'lodash';
import { useIsMobile } from 'modules/common/hooks';
import {
  DetailsFormatters,
  QuantityEditor,
  PriceFormatters,
  TotalPriceFormatters,
  DeleteItem,
  MobileOrderListRow,
  MobileOrderListTotal,
  CartTotalFormatters
} from './renderers';
import { NoItem } from './NoItem';
import { useCartCheckout } from '../hooks';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    padding: theme.spacing(4, 0, 2)
  },
  button: {
    margin: 'auto'
  }
}));

const useTableStyles = makeStyles((theme) => ({
  table: {
    '& thead tr th:first-child': {
      paddingLeft: theme.spacing(2)
    }
  },
  headerCell: {
    borderBottom: 'none',
    borderRight: 'none',
    paddingBottom: theme.spacing(2),
    fontSize: '0.875rem',
    fontWeight: 600
  },
  tableCell: {
    borderRight: 'none'
  },
  footerCell: {
    borderBottom: 'none',
    borderRight: 'none'
  }
}));

const useColumnStyles = makeStyles((theme) => ({
  quantity: {
    textAlign: 'center'
  },
  productDetails: {
    paddingLeft: theme.spacing(2)
  },
  total: {
    minWidth: theme.spacing(10)
  },
  price: {
    minWidth: theme.spacing(10)
  }
}));

const useColumns = ({ classes, setFieldValue }) => [
  {
    id: 'productDetails',
    label: 'Product Details',
    renderer: DetailsFormatters,
    className: classes.productDetails
  },
  {
    id: 'quantity',
    label: 'Quantity',
    className: classes.quantity,
    renderer: QuantityEditor,
    custom: { setFieldValue }
  },
  {
    id: 'price',
    label: 'Price',
    renderer: PriceFormatters,
    align: 'right',
    footerRendered: StringFormatter,
    className: classes.price
  },
  {
    id: 'total',
    label: 'Total',
    renderer: TotalPriceFormatters,
    footerRendered: CartTotalFormatters,
    align: 'right',
    className: classes.total
  },
  {
    id: 'delete',
    label: '',
    renderer: DeleteItem,
    align: 'right',
    custom: { setFieldValue }
  }
];

const useTotals = (records) => {
  if (!records || !records.length) {
    return null;
  }
  const total = records.reduce(
    (retVal, curr) =>
      retVal +
      parseFloat(get(curr, 'price.amount', 0)) *
        parseInt(get(curr, 'quantity', 1)),
    0
  );

  return {
    total: { amount: total, currency: records[0].currency },
    price: 'Cart Totals'
  };
};

export const CartListTable = () => {
  const { isMobile } = useIsMobile();
  const classes = useStyles();
  const tableClasses = useTableStyles();
  const columnClasses = useColumnStyles();

  const {
    values: { records },
    setFieldValue
  } = useFormikContext();

  const { handleCartCheckout, isCartCheckoutInProgress } = useCartCheckout({
    records
  });

  const columns = useColumns({ classes: columnClasses, setFieldValue });

  const totals = useTotals(records);

  if (records.length === 0) return <NoItem />;

  return (
    <>
      <ListTable
        classes={tableClasses}
        records={records}
        columns={columns}
        totals={totals}
        isMobile={isMobile}
        MobileRowComponent={MobileOrderListRow}
        MobileTotalComponent={MobileOrderListTotal}
      />
      <div className={classes.buttonContainer}>
        <LoadingButton
          onClick={handleCartCheckout}
          className={classes.button}
          variant="contained"
          color="primary"
          label="Proceed to Checkout"
          isSubmitting={isCartCheckoutInProgress}
          submitLabel="Please wait..."
          circularProgressSize={16}
        />
      </div>
    </>
  );
};
