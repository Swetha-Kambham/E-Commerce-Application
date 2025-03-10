import React, { useMemo } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

export const LoadingButton = ({
  label,
  submitLabel,
  isSubmitting,
  onClick,
  circularProgressSize,
  disabled,
  ...props
}) => {
  const startIcon = useMemo(() => {
    return isSubmitting ? (
      <CircularProgress size={circularProgressSize} />
    ) : null;
  }, [circularProgressSize, isSubmitting]);

  return (
    <Button
      {...props}
      onClick={onClick}
      startIcon={startIcon}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? submitLabel || 'Loading...' : label}
    </Button>
  );
};

LoadingButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  submitLabel: PropTypes.string,
  circularProgressSize: PropTypes.number,
  isSubmitting: PropTypes.bool,
  disabled: PropTypes.bool
};
