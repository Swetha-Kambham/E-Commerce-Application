import React, { useMemo, useState } from 'react';
import { resource } from 'modules/resources';
import { useParams } from 'react-router-dom';
import useAuthContext from 'modules/auth';
import { Roles } from 'modules/common/enums';
import { makeStyles } from '@material-ui/core';
import { ProductStatus, FlexView } from 'modules/common/components';
import { ProductTabs } from './ProductTabs';
import { EditProduct } from './EditProduct';
import { EditStock } from './EditStock';
import { useProductDetails } from './hooks';

const useStyles = makeStyles((theme) => ({
  productStatus: {
    marginLeft: 'auto'
  }
}));

const { productCommon: resourceLabel } = resource;

const tabs = {
  product: {
    renderer: EditProduct,
    value: 'product',
    label: resourceLabel.product
  },
  stocks: {
    renderer: EditStock,
    value: 'stocks',
    label: resourceLabel.stocks
  }
};

export const Product = () => {
  const classes = useStyles();
  const { me } = useAuthContext();
  const { sellerId, editable } = useMemo(
    () =>
      me && me.role === Roles.seller
        ? {
            editable: me && me.role === Roles.seller,
            sellerId: me.id
          }
        : { editable: false, sellerId: null },
    [me]
  );
  const { productId: id } = useParams();
  const { loading, product, refetchProduct } = useProductDetails({
    productId: id
  });
  const [productId, setProductId] = useState(id);
  const [tabValue, setTabValue] = useState(tabs.product.value);
  const Component = tabs[tabValue].renderer;

  if (loading) return null;

  return (
    <>
      <FlexView>
        <ProductTabs tabs={tabs} setTabValue={setTabValue} value={tabValue} />
        <ProductStatus
          className={classes.productStatus}
          product={product}
          editable
        />
      </FlexView>
      <Component
        sellerId={sellerId}
        productId={productId}
        editable={editable}
        loading={loading}
        product={product}
        setProductId={setProductId}
        setTabValue={setTabValue}
        refetchProduct={refetchProduct}
      />
    </>
  );
};
