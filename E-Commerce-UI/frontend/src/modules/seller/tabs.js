import { resource } from 'modules/resources';
import { useMemo, useState, useEffect } from 'react';
import { Orders } from './orders';
import { Profile } from './profile';
import { ProductReviews } from './productReviews';
import { SellerProducts } from './products';
import { Dashboard } from './dashboard';

const {
  seller: { header: resourceLabel }
} = resource;

export const tabs = {
  dashboard: {
    id: 'dashboard',
    renderer: Dashboard,
    value: '',
    label: resourceLabel.dashboard,
    disabled: true
  },
  profile: {
    id: 'profile',
    renderer: Profile,
    value: 'profile',
    label: resourceLabel.profile
  },
  products: {
    id: 'products',
    renderer: SellerProducts,
    value: 'products',
    label: resourceLabel.products
  },
  orders: {
    id: 'orders',
    renderer: Orders,
    value: 'orders',
    label: resourceLabel.orders
  },
  reviews: {
    id: 'reviews',
    renderer: ProductReviews,
    value: 'reviews',
    label: resourceLabel.reviews,
    disabled: true
  }
};

export const useTabValue = ({ path }) => {
  const [tabValue, setTabValue] = useState(tabs.dashboard.value);

  const currentTab = useMemo(() => {
    switch (true) {
      case /^\/seller\/?$/.test(path):
        return tabs.dashboard.value;

      case /\/seller\/profile\/?/.test(path):
        return tabs.profile.value;

      case /\/seller\/products\/?/.test(path):
        return tabs.products.value;

      case /\/seller\/orders\/?/.test(path):
        return tabs.orders.value;

      case /\/seller\/reviews\/?/.test(path):
        return tabs.reviews.value;

      default:
        return null;
    }
  }, [path]);

  useEffect(() => {
    if (currentTab) {
      setTabValue(currentTab);
    }
  }, [currentTab]);

  return { tabValue, setTabValue };
};
