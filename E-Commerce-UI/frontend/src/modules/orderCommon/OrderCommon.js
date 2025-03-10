import React from 'react';
import { usePageOfOrderItems } from 'modules/user/hooks/usePageOfOrderItems';
import { useAuthContext } from 'modules/auth/AuthContext';
import { Roles } from 'modules/common';
import { OrderList } from './OrderList';

export const OrderCommon = () => {
  const { role, me } = useAuthContext();
  const { loading, orderItems } = usePageOfOrderItems({
    role,
    sellerId: role === Roles.seller ? me.id : null,
    filters: {}
  });

  return (
    <div>
      <OrderList loading={loading} orderItems={orderItems} />
    </div>
  );
};
