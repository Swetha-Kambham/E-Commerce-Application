import React, { useMemo } from 'react';
import {
  Grid,
  makeStyles,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { resource } from 'modules/resources';
import PropTypes from 'prop-types';
import { Money, Quantity } from 'modules/common/components';
import { Images } from './Images';
import { SpecificationsEdit, Specifications } from './Specifications';

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

const hasError = (errors, key) => Object.keys(errors)[0] === key;
const getError = (errors, key) =>
  Object.keys(errors)[0] === key ? errors[key] : null;

const { productCommon: resourceLabel } = resource;

export const StockKeepingUnitDetailsEdit2 = ({
  values,
  formOnChange,
  productOptions,
  isMobile,
  errors,
  isFullyEditable,
  editable
}) => {
  const classes = useStyles();
  const amountClasses = useMemo(
    () => ({ positionStart: classes.amountAdornment }),
    [classes.amountAdornment]
  );

  const {
    onCodeChange,
    onPricePerUnitChange,
    onSellingPricePerUnitChange,
    onQuantityChange,
    onAddSpecification,
    onRemoveSpecification,
    onSpecificationOptionChange,
    onSpecificationValueChange,
    onAddImageClick,
    onFileChange,
    onRemoveImageClick,
    onClearImageClick
  } = formOnChange;

  const options = useMemo(
    () =>
      (productOptions || []).map((option) => ({
        id: option.id,
        name: option.optionName
      })),
    [productOptions]
  );

  const valuesByOptionId = useMemo(
    () =>
      (productOptions || []).reduce(
        (retVal, curr) => ({
          ...retVal,
          [curr.id]: curr.values.map((value) => ({
            id: value.id,
            name: value.value
          }))
        }),
        {}
      ),
    [productOptions]
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          margin="dense"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: !(editable && isFullyEditable) }}
          fullWidth
          label="Code"
          error={hasError(errors, 'code')}
          helperText={getError(errors, 'code')}
          value={values.code}
          onChange={onCodeChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Quantity
          label={resourceLabel.quantity}
          InputProps={{ readOnly: !editable }}
          quantity={values.quantity}
          onChange={onQuantityChange}
          error={hasError(errors, 'quantity')}
          helperText={getError(errors, 'quantity')}
          margin="dense"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <Money
          adornmentClasses={amountClasses}
          label={resourceLabel.pricePerUnit}
          readOnly={!editable}
          amount={values.pricePerUnit}
          currencySymbol={values.currency.symbol}
          onChange={onPricePerUnitChange}
          error={hasError(errors, 'pricePerUnit')}
          helperText={getError(errors, 'pricePerUnit')}
          margin="dense"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <Money
          adornmentClasses={amountClasses}
          label={resourceLabel.sellingPricePerUnit}
          readOnly={!editable}
          amount={values.sellingPricePerUnit}
          currencySymbol={values.currency.symbol}
          onChange={onSellingPricePerUnitChange}
          error={hasError(errors, 'sellingPricePerUnit')}
          helperText={getError(errors, 'sellingPricePerUnit')}
          margin="dense"
          variant="outlined"
        />
      </Grid>
      {(values.specifications || []).length ? (
        <>
          <Grid item xs={12}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {editable && isFullyEditable
                ? 'Choose Specifications'
                : 'Specifications'}
            </Typography>
          </Grid>
        </>
      ) : null}
      {(values.specifications || []).map((spec, index) =>
        editable && isFullyEditable ? (
          <SpecificationsEdit
            key={spec.id}
            spec={spec}
            onSpecificationOptionChange={onSpecificationOptionChange}
            index={index}
            options={options}
            valuesByOptionId={valuesByOptionId}
            onSpecificationValueChange={onSpecificationValueChange}
            onRemoveSpecification={onRemoveSpecification}
            onAddSpecification={onAddSpecification}
            specificationsLength={values.specifications?.length || 0}
          />
        ) : (
          <Specifications spec={spec} />
        )
      )}
      {hasError(errors, 'specifications') ? (
        <Grid item xs={12}>
          <FormHelperText error>
            {getError(errors, 'specifications')}
          </FormHelperText>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>
      <Images
        images={values.images}
        skuId={values.id}
        onAddImageClick={onAddImageClick}
        onFileChange={onFileChange}
        onRemoveImageClick={onRemoveImageClick}
        onClearImageClick={onClearImageClick}
        editable={editable && isFullyEditable}
        error={hasError(errors, 'images')}
        helperText={getError(errors, 'images')}
      />
      <Grid item xs={12}>
        <Divider variant="fullWidth" />
      </Grid>
    </Grid>
  );
};

StockKeepingUnitDetailsEdit2.propTypes = {
  values: PropTypes.object,
  formOnChange: PropTypes.objectOf(PropTypes.any),
  productOptions: PropTypes.arrayOf(PropTypes.any),
  isMobile: PropTypes.bool,
  errors: PropTypes.object,
  isFullyEditable: PropTypes.bool,
  editable: PropTypes.bool
};
