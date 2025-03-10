import React, { useMemo, useCallback } from 'react';
import {
  TextField,
  IconButton,
  makeStyles,
  InputLabel
} from '@material-ui/core';
import { FlexView } from 'modules/common/components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  quantityField: {
    width: theme.spacing(8),
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  quantityFieldInputRoot: {
    paddingLeft: 'unset',
    paddingRight: 'unset',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'center'
  },
  container: {
    display: 'flex'
  }
}));

export const QuantityEditor = ({
  label,
  quantity,
  onValueChange,
  disabledIncrement = false,
  disabledDecrement = false,
  minQuantity = 1,
  maxQuantity = 10
}) => {
  const classes = useStyles();

  const InputProps = useMemo(
    () => ({
      readOnly: true,
      classes: { input: classes.quantityFieldInputRoot }
    }),
    [classes.quantityFieldInputRoot]
  );

  const onChange = useCallback(
    (delta) => async () => {
      const value = parseInt(quantity);
      if (value + delta >= minQuantity && value + delta <= maxQuantity) {
        onValueChange(value + delta);
      }
    },
    [maxQuantity, minQuantity, onValueChange, quantity]
  );

  return (
    <>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <FlexView>
        <div className={classes.container}>
          <TextField
            className={classes.quantityField}
            variant="outlined"
            value={quantity}
            InputProps={InputProps}
          />
          <IconButton
            disabled={
              disabledDecrement || parseInt(minQuantity) === parseInt(quantity)
            }
            onClick={onChange(-1)}
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            disabled={
              disabledIncrement || parseInt(maxQuantity) === parseInt(quantity)
            }
            onClick={onChange(1)}
          >
            <AddIcon />
          </IconButton>
        </div>
      </FlexView>
    </>
  );
};

QuantityEditor.propTypes = {
  label: PropTypes.string,
  quantity: PropTypes.number,
  onValueChange: PropTypes.func,
  disabledIncrement: PropTypes.bool,
  disabledDecrement: PropTypes.bool,
  minQuantity: PropTypes.number,
  maxQuantity: PropTypes.number
};
