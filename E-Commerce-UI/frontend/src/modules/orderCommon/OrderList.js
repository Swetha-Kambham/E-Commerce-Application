import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { ListTable } from 'modules/common/components/listTable';
import { StringFormatter } from 'modules/common/components/formatters';

const useTableStyles = makeStyles((theme) => ({
  headerCell: {},
  tableCell: {}
}));

const useColumns = ({ classes, onRowClick }) => [
  {
    id: 'orderId',
    label: 'Order Id',
    renderer: StringFormatter
  },
  {
    id: 'productName',
    label: 'Product Name',
    renderer: StringFormatter
  },
  {
    id: 'orderItemStatus',
    label: 'Status',
    renderer: StringFormatter
  },
  {
    id: 'totalPrice',
    label: 'Total Price',
    renderer: StringFormatter
  }
];

export const OrderList = ({ loading, orderItems }) => {
  const tableClasses = useTableStyles();
  const columns = useColumns({});

  return (
    <div>
      <ListTable
        classes={tableClasses}
        records={orderItems}
        isLoading={loading}
        columns={columns}
      />
    </div>
  );
};

OrderList.propTypes = {
  loading: PropTypes.bool,
  orderItems: PropTypes.array
};
