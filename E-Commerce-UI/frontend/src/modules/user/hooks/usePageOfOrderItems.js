import { useQuery, gql } from '@apollo/client';
import get from 'lodash.get';
import { orderItemStatus } from 'modules/common/enums/orderItemStatus';
import { orderBy } from 'lodash';

export const ORDERITEMS = gql`
  query pageOfOrderItems(
    $page: Int!
    $pageSize: Int!
    $userId: String
    $sellerId: String
    $role: Role!
    $filters: OrderFilter
    $includeImages: Boolean!
  ) {
    pageOfOrderItems(
      page: $page
      pageSize: $pageSize
      userId: $userId
      sellerId: $sellerId
      role: $role
      filters: $filters
    ) {
      id
      orderId
      orderDate
      productName
      seller {
        id
        name
        storeName
      }
      user {
        id
        emailAddress
        name
      }
      totalPrice
      currencyId
      orderItemStatus
      images @include(if: $includeImages) {
        key
        url
      }
    }
  }
`;

const getOrderItems = (orderItems) => {
  const orders = (orderItems || []).filter(
    (item) => item.orderItemStatus !== orderItemStatus.PENDING
  );
  return orderBy(orders, [(item) => new Date(item.orderDate)], ['desc']);
};

const getPendingOrderItems = (orderItems) => {
  const pendingOrders = (orderItems || []).filter(
    (item) => item.orderItemStatus === orderItemStatus.PENDING
  );

  return pendingOrders.reduce(
    (retVal, curr) => ({
      [curr.orderId]: retVal.orderId ? [...retVal.orderId, curr] : [curr]
    }),
    {}
  );
};

export const usePageOfOrderItems = ({
  page = 1,
  pageSize = 20,
  userId,
  sellerId,
  role,
  filters = {}
}) => {
  const { loading, data } = useQuery(ORDERITEMS, {
    variables: {
      page,
      pageSize,
      userId,
      sellerId,
      role,
      filters,
      includeImages: false
    },
    skip: !role,
    fetchPolicy: 'cache-and-network'
  });

  const orderItems = get(data, 'pageOfOrderItems', []);

  return {
    loading,
    orderItems: getOrderItems(orderItems),
    pendingOrderItems: getPendingOrderItems(orderItems)
  };
};
