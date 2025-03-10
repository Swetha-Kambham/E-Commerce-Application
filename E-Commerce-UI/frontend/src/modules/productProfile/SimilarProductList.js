import React from 'react';
import { Paper } from '@material-ui/core';
import { usePageOfProductUnits } from 'modules/infiniteProductGridView/hooks';

export const SimilarProductList = () => {
  const { productUnits, loading } = usePageOfProductUnits({ filters: {} });
  return <Paper></Paper>;
};
