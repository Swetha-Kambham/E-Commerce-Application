import React, { useCallback, useState } from 'react';
import {
  Paper,
  CardMedia,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core';
import { usePageOfOrderItems } from 'modules/user/hooks';
import useAuthContext from 'modules/auth';
import { FlexView } from 'modules/common/components';
import {
  useDialogState,
  useGetInvoiceForOrderItem
} from 'modules/common/hooks';
import { orderItemStatus } from 'modules/common/enums/orderItemStatus';
import { useMarkOrderItemAsCancelled } from '../hooks';
import { OrderCancelConfirmationDialog } from './OrderCancelConfirmationDialog';
import { OrderListSkeleton } from './OrderListSkeleton';
import { NoOrderItems } from './NoOrderItems';
import { PendingOrders } from './PendingOrders';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  flexView: {
    marginTop: theme.spacing(2)
  },
  image: {
    maxWidth: theme.spacing(20),
    height: theme.spacing(15)
  },
  action: {
    display: 'grid',
    marginLeft: 'auto'
  },
  button: {
    justifyContent: 'left',
    textTransform: 'none'
  }
}));

export const OrderList = () => {
  const classes = useStyles();
  const [inProgress, setInProgress] = useState(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { isDialogOpen, openDialog, closeDialog } = useDialogState();
  const { markOrderItemAsCancelled } = useMarkOrderItemAsCancelled();
  const { me, role } = useAuthContext();
  const { orderItems, pendingOrderItems, loading } = usePageOfOrderItems({
    userId: me.id,
    role
  });

  const { getBase64String } = useGetInvoiceForOrderItem();

  const onCancelConfirm = useCallback(
    async (orderId, orderItemId, reasonForCancel) => {
      setInProgress(true);
      const res = await markOrderItemAsCancelled({
        orderId,
        orderItemId,
        reasonForCancel
      });
      if (res) {
        setInProgress(false);
        closeDialog();
        return;
      }
      setTimeout(() => {
        setInProgress(false);
        closeDialog();
      }, 15000);
    },
    [closeDialog, markOrderItemAsCancelled]
  );

  const onCancelClick = useCallback(
    (orderId, orderItemId) => () => {
      setSelectedOrderItemId(orderItemId);
      setSelectedOrderId(orderId);
      openDialog();
    },
    [openDialog]
  );

  if (loading) return <OrderListSkeleton />;

  if (!orderItems || !orderItems.length) return <NoOrderItems />;

  return (
    <div>
      <PendingOrders pendingOrderItems={pendingOrderItems} />
      {orderItems.map((orderItem) => {
        const test = async () => {
          const base64 = await getBase64String({
            orderId: orderItem.orderId,
            orderItemId: orderItem.id
          });

          const a = document.createElement('a');
          a.href = base64;
          a.download = `Invoice_${orderItem.orderId}.pdf`;
          a.click();
          a.remove();
        };

        return (
          <Paper key={orderItem.id} className={classes.paper}>
            <Typography variant="body1">{orderItem.orderItemStatus}</Typography>
            <FlexView className={classes.flexView}>
              <CardMedia
                className={classes.image}
                id={orderItem.id}
                component="img"
                alt="View Not Available"
                image={
                  orderItem.images &&
                  orderItem.images[0] &&
                  orderItem.images[0].url
                }
              />
              <div className={classes.action}>
                <Button
                  className={classes.button}
                  variant="text"
                  color="primary"
                >
                  View Details
                </Button>
                {orderItem.orderItemStatus === orderItemStatus.DELIVERED ? (
                  <Button
                    className={classes.button}
                    variant="text"
                    color="default"
                    onClick={test}
                  >
                    Download invoice
                  </Button>
                ) : null}
                {orderItem.orderItemStatus !== orderItemStatus.DELIVERED &&
                orderItem.orderItemStatus !== orderItemStatus.CANCELLED ? (
                  <Button
                    className={classes.button}
                    variant="text"
                    color="secondary"
                    onClick={onCancelClick(orderItem.orderId, orderItem.id)}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            </FlexView>
          </Paper>
        );
      })}
      {isDialogOpen ? (
        <OrderCancelConfirmationDialog
          open={isDialogOpen}
          onClose={closeDialog}
          onConfirmClick={onCancelConfirm}
          orderItemId={selectedOrderItemId}
          orderId={selectedOrderId}
          inProgress={inProgress}
        />
      ) : null}
    </div>
  );
};
