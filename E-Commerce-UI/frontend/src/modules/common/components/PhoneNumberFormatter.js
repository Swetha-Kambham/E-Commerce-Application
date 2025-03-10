import React from 'react';
import PropTypes from 'prop-types';
import { CountryCodes } from '../enums/CountryCodes';

export const PhoneNumberFormatter = ({ value, className }) => {
  const { countryCode = CountryCodes.INDIA, phoneNumber } = value || {};

  if (!countryCode || !phoneNumber)
    return <span className={className}>&ndash;</span>;
  return <span className={className}>{`${countryCode} ${phoneNumber}`}</span>;
};

PhoneNumberFormatter.propTypes = {
  value: PropTypes.object,
  className: PropTypes.any
};
