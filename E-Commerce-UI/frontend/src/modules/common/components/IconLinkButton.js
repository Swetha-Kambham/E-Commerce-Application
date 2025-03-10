import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const IconLinkButton = ({ to, icon, ...rest }) => {
  return (
    <>
      <Link to={to} {...rest}>
        {icon}
      </Link>
    </>
  );
};

IconLinkButton.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.element
};
