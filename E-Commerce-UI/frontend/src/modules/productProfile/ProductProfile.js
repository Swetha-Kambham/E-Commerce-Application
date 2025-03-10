import React from 'react';
import { HeaderComponent, FooterComponent } from 'modules/common';
import PropTypes from 'prop-types';
import { ProductProfileRoute } from './ProductProfileRoute';

export const ProductProfile = ({ productUnit }) => {
  return (
    <>
      <HeaderComponent />
      <ProductProfileRoute />
      <FooterComponent />
    </>
  );
};

ProductProfile.propTypes = {
  productUnit: PropTypes.object
};
