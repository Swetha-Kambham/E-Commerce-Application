import React, { useCallback, useMemo } from 'react';
import {
  Grid,
  makeStyles,
  Button,
  Tooltip,
  IconButton,
  Divider
} from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Money, Quantity, Dropdown2 } from 'modules/common';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  removeSpecIcon: {
    padding: theme.spacing(1.5, 0.5, 1.5, 0.5)
  },
  addSpecIcon: { padding: theme.spacing(1.5, 0.5, 1.5, 0.5) },
  addRemoveSpecContainer: { display: 'flex' },
  addSKU: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  amountAdornment: { marginRight: theme.spacing(0.5) },
  removeUnit: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(-1.4)
    }
  }
}));

const { productCommon: resourceLabel } = resource;

export const StockKeepingUnitDetailsEdit = ({
  values,
  formOnChange,
  productOptions,
  isMobile
}) => {
  const classes = useStyles();
  const amountClasses = useMemo(
    () => ({ positionStart: classes.amountAdornment }),
    [classes.amountAdornment]
  );

  const {
    onAddSKU,
    onPricePerUnitChange,
    onSellingPricePerUnitChange,
    onQuantityChange,
    onSpecKeyChange,
    onProductSpecValueChange,
    onRemoveUnit,
    onAddSpec,
    onRemoveSpec
  } = formOnChange;

  const { skus } = values;
  const options = useMemo(
    () => productOptions.map((o) => ({ id: o.id, name: o.optionName })),
    [productOptions]
  );

  const productOptionValues = useCallback(
    (optionId) => {
      const selectedOption = productOptions.find((o) => o.id === optionId);

      if (!selectedOption) return [];

      return selectedOption.values.map((v) => ({
        id: v.id,
        name: v.value
      }));
    },
    [productOptions]
  );

  const handlePricePerUnitChange = useCallback(
    (index) => (value) => {
      onPricePerUnitChange(index, value);
    },
    [onPricePerUnitChange]
  );

  const handleSellingPricePerUnitChange = useCallback(
    (index) => (value) => {
      onSellingPricePerUnitChange(index, value);
    },
    [onSellingPricePerUnitChange]
  );

  const handleQuantityChange = useCallback(
    (index) => (value) => {
      onQuantityChange(index, value);
    },
    [onQuantityChange]
  );

  const handleProductSpecNameChange = useCallback(
    (index, i) => (value) => {
      onSpecKeyChange(index, i, value);
    },
    [onSpecKeyChange]
  );

  const handleProductSpecValueChange = useCallback(
    (index, i) => (value) => {
      onProductSpecValueChange(index, i, value);
    },
    [onProductSpecValueChange]
  );

  const handleRemoveUnit = useCallback(
    (index) => (e) => {
      onRemoveUnit(index);
    },
    [onRemoveUnit]
  );

  const handleAddSpec = useCallback(
    (index) => (e) => {
      onAddSpec(index);
    },
    [onAddSpec]
  );

  const handleRemoveSpec = useCallback(
    (index, specIndex) => (e) => {
      onRemoveSpec(index, specIndex);
    },
    [onRemoveSpec]
  );

  return (
    <>
      <Grid container spacing={1}>
        {skus.map((sku, index) => (
          <React.Fragment key={sku.skuId}>
            {!isMobile ? (
              <Grid item xs={2} md={1}>
                <Tooltip title={resourceLabel.removeUnit}>
                  <IconButton
                    onClick={handleRemoveUnit(index)}
                    color="secondary"
                    variant="contained"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}
            <Grid item xs={3} md={2}>
              <Quantity
                label={resourceLabel.quantity}
                quantity={sku.quantity}
                onChange={handleQuantityChange(index)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <Money
                adornmentClasses={amountClasses}
                label={resourceLabel.pricePerUnit}
                amount={sku.pricePerUnit}
                currencySymbol={sku.currencySymbol}
                onChange={handlePricePerUnitChange(index)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <Money
                adornmentClasses={amountClasses}
                label={resourceLabel.sellingPricePerUnit}
                amount={sku.sellingPricePerUnit}
                currencySymbol={sku.currencySymbol}
                onChange={handleSellingPricePerUnitChange(index)}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            {isMobile ? (
              <Grid item xs={1} md={1}>
                <Tooltip title={resourceLabel.removeUnit}>
                  <IconButton
                    className={classes.removeUnit}
                    onClick={handleRemoveUnit(index)}
                    color="secondary"
                    variant="contained"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            ) : null}
            {sku.variant.map((spec, i) => (
              <React.Fragment key={spec.id}>
                {!isMobile && i > 0 ? <Grid item xs={5} md={7} /> : null}
                <Grid item xs={5} md={2}>
                  <Dropdown2
                    id="product-option"
                    noneOption={i === 0}
                    variant="outlined"
                    margin="dense"
                    displayEmpty
                    label={resourceLabel.option}
                    options={options}
                    selectedId={spec.optionId}
                    onChange={handleProductSpecNameChange(index, i)}
                  />
                </Grid>
                <Grid item xs={5} md={2}>
                  <Dropdown2
                    id="product-option"
                    noneOption={i === 0}
                    variant="outlined"
                    margin="dense"
                    displayEmpty
                    options={productOptionValues(spec.optionId)}
                    selectedId={spec.valueId}
                    label={resourceLabel.value}
                    onChange={handleProductSpecValueChange(index, i)}
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <div className={classes.addRemoveSpecContainer}>
                    {i === 0 ? null : (
                      <Tooltip title={resourceLabel.removeSpec}>
                        <IconButton
                          className={classes.removeSpecIcon}
                          onClick={handleRemoveSpec(index, i)}
                          color="secondary"
                          variant="contained"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {i === sku.variant.length - 1 ? (
                      <Tooltip title={resourceLabel.addSpecs}>
                        <IconButton
                          className={classes.addSpecIcon}
                          onClick={handleAddSpec(index)}
                          color="secondary"
                          variant="contained"
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </div>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Button
        className={classes.addSKU}
        color="secondary"
        variant="contained"
        onClick={onAddSKU}
      >
        {resourceLabel.addUnit}
      </Button>
    </>
  );
};

StockKeepingUnitDetailsEdit.propTypes = {
  values: PropTypes.objectOf(PropTypes.any),
  formOnChange: PropTypes.objectOf(PropTypes.any),
  productOptions: PropTypes.arrayOf(PropTypes.any),
  isMobile: PropTypes.bool
};
