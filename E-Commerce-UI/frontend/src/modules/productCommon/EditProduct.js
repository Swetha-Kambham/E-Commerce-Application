import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import { useIsScreenDown } from 'modules/common';
import { ProductBasicDetails } from './ProductBasicDetails';
import { ProductTags } from './ProductTags';
import { ProductDescription } from './ProductDescription';
import { ProductOptions } from './ProductOptions';
import { useUpdateProductField } from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  }
}));

const { productCommon: resourceLabel } = resource;

export const EditProduct = ({ productId, product, editable }) => {
  const classes = useStyles();
  const isMobile = useIsScreenDown('sm');
  const {
    updateProductDescription,
    updateProductTag,
    updateProductLocationTag
  } = useUpdateProductField();

  return (
    <div className={classes.root}>
      <ProductBasicDetails
        isMobile={isMobile}
        product={product}
        editable={editable}
      />
      <ProductDescription
        editable={editable}
        isMobile={isMobile}
        product={product}
        updateProductDescription={updateProductDescription}
      />
      <ProductTags
        editable={editable}
        isMobile={isMobile}
        values={product}
        heading={resourceLabel.tags}
        tagLabel={resourceLabel.tag}
        updateProductTag={updateProductTag}
      />
      <ProductTags
        editable={editable}
        isMobile={isMobile}
        values={useMemo(
          () => ({ ...product, tags: product && product.locationTags }),
          [product]
        )}
        heading={resourceLabel.locationTags}
        tagLabel={resourceLabel.locationTag}
        updateProductTag={updateProductLocationTag}
      />
      <ProductOptions
        editable={editable}
        isMobile={isMobile}
        productId={productId}
        product={product}
      />
    </div>
  );
};

EditProduct.propTypes = {
  productId: PropTypes.string,
  product: PropTypes.objectOf(PropTypes.any),
  editable: PropTypes.bool
};
