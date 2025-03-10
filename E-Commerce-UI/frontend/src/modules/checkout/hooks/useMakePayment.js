import { gql, useApolloClient } from '@apollo/client';
import get from 'lodash.get';
import { useCallback } from 'react';
import axios from 'axios';
import { cashfreeOrderStatus } from 'modules/common/enums';
import { paymentOptions } from './paymentOptions';

const SIGNATURE = gql`
  query paymentToken(
    $draftId: String!
    $returnUrl: String
    $paymentMethods: String
  ) {
    paymentToken(
      draftId: $draftId
      returnUrl: $returnUrl
      paymentMethods: $paymentMethods
    ) {
      orderId
      cashFreeOrderId
      orderToken
      orderStatus
    }
  }
`;

const makePayment = (data) =>
  new Promise((resolve, reject) => {
    axios
      .request({
        method: 'post',
        url: 'https://sandbox.cashfree.com/pg/orders/pay',
        data
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        return reject(
          new Error(
            err?.response?.data?.message ||
              'Error occured while payment request. Please try again'
          )
        );
      });
  });

const isValidPaymentSourceData = ({ paymentOption, paymentSourceData }) => {
  const validator = {
    [paymentOptions.card]: (data) =>
      data &&
      data.card_holder_name &&
      /^[0-9]{3}$/.test(data.card_cvv) &&
      /^[0-9]{10,22}$/.test(data.card_number) &&
      /^(0[1-9]|1[0-2])$/.test(data.card_expiry_mm) &&
      /^[2-3][0-9]$/.test(data.card_expiry_yy),
    [paymentOptions.netBanking]: (data) => data && data.netbanking_bank_code,
    [paymentOptions.app]: (data) => data && data.channel && data.phone,
    [paymentOptions.upi]: (data) => data && data.channel && data.upi_id
  };

  if (validator[paymentOption]) {
    return validator[paymentOption](paymentSourceData);
  }
  return true;
};

export const useMakePayment = ({
  preview,
  paymentOption,
  paymentSourceData,
  markOrderAsPending,
  history,
  setError,
  setUserActionReqired
}) => {
  const client = useApolloClient();

  const handlePayment = useCallback(async () => {
    if (
      !isValidPaymentSourceData({
        paymentOption,
        paymentSourceData
      })
    ) {
      setError({ [paymentOption]: { error: true, message: null } });
      return;
    }

    if (paymentOption === paymentOptions.cod) {
      const result = await markOrderAsPending({
        draftId: preview.draftId,
        isPayOnDeliveryOrder: true
      });

      if (result) {
        history.push(
          `/order/confirmation?payOnDelivery=true&orderId=${preview.draftId}`
        );
      }
    } else {
      const { data } = await client.query({
        query: SIGNATURE,
        fetchPolicy: 'network-only',
        variables: {
          draftId: preview.draftId,
          returnUrl:
            'https://crafthills.com/order/confirmation?orderId={order_id}&orderToken={order_token}'
        }
      });

      const paymentToken = get(data, 'paymentToken', null);

      try {
        if (
          paymentToken &&
          paymentToken.orderStatus === cashfreeOrderStatus.active
        ) {
          const result = await markOrderAsPending({
            draftId: preview.draftId,
            isPayOnDeliveryOrder: true
          });
          if (result) {
            const paymentResponse = await makePayment({
              order_token: paymentToken.orderToken,
              payment_method: {
                [paymentOption]: paymentSourceData
              }
            });
            if (
              paymentResponse &&
              paymentResponse.action &&
              paymentResponse.action === 'link' &&
              paymentResponse.data &&
              paymentResponse.data.url
            ) {
              window.open(paymentResponse.data.url, '_self');
            } else if (
              paymentResponse &&
              paymentResponse.action &&
              paymentResponse.action === 'custom'
            ) {
              setUserActionReqired(
                true,
                'Please open app and make the payment'
              );
            }
          }
        }
      } catch (ex) {
        setError({
          [paymentOption]: { error: true, message: ex.message }
        });
      }
    }
  }, [
    client,
    history,
    markOrderAsPending,
    paymentOption,
    paymentSourceData,
    preview.draftId,
    setError,
    setUserActionReqired
  ]);

  return { handlePayment };
};
