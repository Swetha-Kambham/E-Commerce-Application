import React from 'react';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { orderStatus } from 'modules/common/enums';
import { useOrderPreview } from './hooks';
import { CheckoutTabs } from './CheckoutTabs';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: window.innerHeight - 320
  }
}));

const getOrderPreviewInput = (draftId) =>
  draftId && `${draftId}`.startsWith('OD') ? { orderId: draftId } : { draftId };

const useQuery = ({ search }) => {
  return new URLSearchParams(search);
};

export const CheckoutBase = () => {
  const classes = useStyles();
  const { draftId } = useParams();
  const { search } = useLocation();
  const query = useQuery({ search });

  const tab = query.get('tab');

  const { preview, loading } = useOrderPreview(getOrderPreviewInput(draftId));

  if (
    !loading &&
    preview &&
    preview.status !== orderStatus.draft &&
    preview.status !== orderStatus.pending
  )
    return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <CheckoutTabs preview={preview} loading={loading} tab={tab} />
    </div>
  );
};
