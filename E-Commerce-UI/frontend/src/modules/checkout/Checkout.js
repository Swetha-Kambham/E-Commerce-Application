import React from 'react';
import { HeaderComponent, FooterComponent } from 'modules/common';
import { CheckoutBase } from './CheckoutBase';

export const Checkout = () => {
  return (
    <>
      <HeaderComponent /> <CheckoutBase /> <FooterComponent />
    </>
  );
};
