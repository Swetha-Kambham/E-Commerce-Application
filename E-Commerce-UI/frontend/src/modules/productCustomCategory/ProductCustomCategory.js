import React from 'react';
import { usePageOfProductView } from 'modules/common/hooks/usePageOfProductView';
import { ProductListSummary } from './ProductListSummary';
import { ProductCustomCategorySkeleton } from './ProductCustomCategorySkeleton';

export const ProductCustomCategory = () => {
  const { productViews, loading } = usePageOfProductView(1, 20, {
    isEnabled: true,
    priorityStartRange: 20,
    hasProductUnits: true
  });

  if (loading) return <ProductCustomCategorySkeleton />;

  return (
    <>
      {(productViews || []).map((productView) => {
        return (
          <ProductListSummary
            key={productView.id}
            name={productView.name}
            productUnits={productView.productUnits}
          />
        );
      })}
    </>
  );
};
