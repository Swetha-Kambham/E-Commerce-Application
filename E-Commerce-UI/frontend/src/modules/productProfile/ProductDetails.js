import React, { useMemo } from 'react';
import {
  Typography,
  Button,
  Grid,
  Snackbar,
  FormHelperText
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import {
  ExpansionPanel,
  DiscountMoneyFormatter,
  FlexView,
  LinkButton,
  LoadingButton,
  RichText
} from 'modules/common';
import MuiAlert from '@material-ui/lab/Alert';
import useAuthContext from 'modules/auth';
import { ProductSpecification } from './ProductSpecification';
import {
  useDraftOrder,
  useCheckout,
  useProductDetailsHook,
  useAddToCart
} from './hooks';
import { QuantityEditor } from './QuantityEditor';

const useStyles = makeStyles((theme) => ({
  containerGrid: {
    padding: theme.spacing(2),
    [theme.breakpoints.down(800)]: {
      padding: 'unset'
    }
  },
  quantity: {
    paddingTop: theme.spacing(2)
  },
  dispatchInfo: {
    color: '#4E4949'
  },
  productName: {
    maxWidth: '80%',
    overflowWrap: 'break-word'
  },
  stock: {
    marginLeft: 'auto',
    '& svg': {
      height: '1.1rem'
    },
    [theme.breakpoints.up(800)]: {
      paddingRight: theme.spacing(2)
    }
  },
  redColor: {
    color: 'red'
  },
  greenColor: {
    color: 'green'
  },
  designedByLabel: {
    minWidth: theme.spacing(12),
    paddingTop: theme.spacing(1),
    marginBottom: 'auto'
  },
  designedBy: {
    textAlign: 'left'
  },
  quantityLabelRoot: { fontWeight: 600 },
  specification: {
    border: '1px solid #e3e6ec',
    borderRadius: theme.spacing(0.5),
    marginTop: theme.spacing(2)
  },
  description: {
    padding: theme.spacing(1),
    overflowWrap: 'break-word'
  },
  loginButton: {
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: theme.spacing(2)
  }
}));

const useDiscountMoneyFormatterStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'unset'
  },
  sellingPrice: { fontWeight: '600', fontSize: '1rem' },
  origialPrice: {
    textDecoration: 'line-through',
    textDecorationColor: '#6d6767',
    padding: theme.spacing(0.5, 0, 0, 1)
  },
  offLabel: {
    fontWeight: '600',
    padding: theme.spacing(0.5, 0, 0, 1)
  }
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    borderColor: '#010101',
    backgroundColor: '#ffffff',
    maxWidth: theme.spacing(40),
    maxHeight: theme.spacing(5),
    marginTop: theme.spacing(2),
    display: 'flex',
    [theme.breakpoints.down(800)]: {
      maxWidth: theme.spacing(70)
    }
  },
  label: {
    color: '#000000',
    fontSize: '0.875rem',
    textTransform: 'none'
  }
}));

export const ProductDetails = ({ productUnit, dispatchInfo, isMobile }) => {
  const classes = useStyles();
  const { addToCart } = useAddToCart();
  const { draftOrder } = useDraftOrder();
  const { me, isAuthenticated, role } = useAuthContext();
  const {
    isCartSuccessAlertOpen,
    isLoingInfoAlertOpen,
    handleCartSuccessAlertClose,
    handleLoingInfoAlertClick,
    handleLoingInfoAlertClose,
    isQuantityErrorAlertOpen,
    handleQuantityErrorAlertOpenClick,
    handleQuantityErrorAlertOpenClose,
    quantity,
    handleQuantityChange,
    handleAddToCartClick,
    isAddingToCart,
    isCheckoutProgress,
    setIsCheckoutProgress
  } = useProductDetailsHook({
    me,
    isAuthenticated,
    role,
    addToCart,
    skuId: productUnit.skuId,
    productId: productUnit.productId,
    quantity: productUnit.quantity
  });
  const discountMoneyFormatterStyles = useDiscountMoneyFormatterStyles();
  const buttonClasses = useButtonStyles();

  const inStock = useMemo(
    () => productUnit.quantity > 0,
    [productUnit.quantity]
  );

  const originalPrice = useMemo(
    () => ({
      amount: productUnit.pricePerUnit,
      currency: productUnit.currency
    }),
    [productUnit.pricePerUnit, productUnit.currency]
  );

  const sellingPrice = useMemo(
    () => ({
      amount: productUnit.sellingPricePerUnit,
      currency: productUnit.currency
    }),
    [productUnit.sellingPricePerUnit, productUnit.currency]
  );

  const { onBuyNowClick } = useCheckout({
    draftOrder,
    productUnit,
    me,
    isAuthenticated,
    quantity,
    handleLoingInfoAlertClick,
    role,
    setIsCheckoutProgress,
    handleQuantityErrorAlertOpenClick
  });

  return (
    <Grid container spacing={0} className={classes.containerGrid}>
      <Grid item xs={12}>
        <FlexView>
          <Typography
            className={classes.productName}
            variant={isMobile ? 'h6' : 'h5'}
          >
            {productUnit.name}
          </Typography>
          <Typography
            variant="caption"
            className={clsx(classes.stock, !inStock && classes.redColor)}
          >
            {inStock ? (
              <>
                <CheckIcon
                  viewBox="0 0 24 18"
                  className={classes.greenColor}
                  size="small"
                />
                <Typography variant="caption">In Stock</Typography>
              </>
            ) : (
              <Typography variant="caption">Out of Stock</Typography>
            )}
          </Typography>
        </FlexView>
      </Grid>
      <Grid item xs={12}>
        <FlexView>
          <Typography className={classes.designedByLabel} variant="body2">
            Designed By:
          </Typography>
          <Button className={classes.designedBy} color="primary">
            {productUnit.seller.displayName}
          </Button>
        </FlexView>
      </Grid>
      {productUnit.rating ? (
        <Grid item xs={12}>
          <Rating
            name="product-rating"
            defaultValue={2.5}
            precision={0.1}
            readOnly
          />
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <DiscountMoneyFormatter
          classes={discountMoneyFormatterStyles}
          originalPrice={originalPrice}
          sellingPrice={sellingPrice}
        />
      </Grid>
      {dispatchInfo ? (
        <Grid item xs={12}>
          <Typography variant="caption" className={classes.dispatchInfo}>
            {dispatchInfo}
          </Typography>
        </Grid>
      ) : null}
      <Grid className={classes.quantity} item xs={12}>
        <QuantityEditor
          label="Quantity"
          quantity={quantity}
          onValueChange={handleQuantityChange}
        />
      </Grid>
      {productUnit.quantity < 5 ? (
        <Grid item xs={12}>
          <FormHelperText
            error
          >{`Only ${productUnit.quantity} remaining in stock`}</FormHelperText>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <LoadingButton
          disabled={!inStock || isCheckoutProgress}
          onClick={onBuyNowClick}
          variant="outlined"
          fullWidth
          classes={buttonClasses}
          isSubmitting={isCheckoutProgress}
          submitLabel="Please wait..."
          label="Buy Now"
          circularProgressSize={16}
        />
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          disabled={!inStock || isCheckoutProgress}
          onClick={handleAddToCartClick}
          variant="outlined"
          fullWidth
          classes={buttonClasses}
          label="Add to Cart"
          submitLabel="Adding to Cart.."
          isSubmitting={isAddingToCart}
          circularProgressSize={16}
        />
      </Grid>
      {productUnit.specifications && productUnit.specifications.length ? (
        <Grid className={classes.specification} item xs={12}>
          <ExpansionPanel label="Product Specifications" defaultExpanded>
            <ProductSpecification specification={productUnit.specifications} />
          </ExpansionPanel>
        </Grid>
      ) : null}
      {productUnit.description ? (
        <Grid className={classes.specification} item xs={12}>
          <ExpansionPanel label="Description" defaultExpanded>
            <Typography className={classes.description} variant="body1">
              <RichText rawContent={productUnit.description} />
            </Typography>
          </ExpansionPanel>
        </Grid>
      ) : null}
      <Snackbar
        open={isCartSuccessAlertOpen}
        autoHideDuration={6000}
        onClose={handleCartSuccessAlertClose}
      >
        <Alert onClose={handleCartSuccessAlertClose} severity="success">
          Product Added to Cart
        </Alert>
      </Snackbar>
      <Snackbar
        open={isQuantityErrorAlertOpen}
        autoHideDuration={6000}
        onClose={handleQuantityErrorAlertOpenClose}
      >
        <Alert onClose={handleQuantityErrorAlertOpenClose} severity="error">
          Please enter valid quantity
        </Alert>
      </Snackbar>
      <Snackbar
        open={isLoingInfoAlertOpen}
        autoHideDuration={6000}
        onClose={handleLoingInfoAlertClose}
      >
        <Alert onClose={handleLoingInfoAlertClose} severity="info">
          <FlexView>
            <Typography>Please login before continuing...</Typography>
            <LinkButton
              className={classes.loginButton}
              to="/login"
              label="Login / Sign Up"
            />
          </FlexView>
        </Alert>
      </Snackbar>
    </Grid>
  );
};

ProductDetails.propTypes = {
  productUnit: PropTypes.objectOf(PropTypes.any),
  dispatchInfo: PropTypes.string,
  isMobile: PropTypes.bool
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
