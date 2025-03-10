import React from 'react';
import {
  makeStyles,
  Typography,
  TableRow,
  TableCell,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { NoDataMessage, Money, Quantity, ReadOnlyField } from 'modules/common';
import PropTypes from 'prop-types';
import { resource } from 'modules/resources';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import { OptionValuesFormatter } from './formatters';
import { ActionMenu } from './ActionMenu';

const useStyles = makeStyles((theme) => ({
  sectionTop: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  quantityCell: {
    width: theme.spacing(12),
    minWidth: theme.spacing(12),
    borderBottom: 'none'
  },
  actionCell: {
    minWidth: theme.spacing(10),
    borderBottom: 'none',
    [theme.breakpoints.down('sm')]: { minWidth: 'unset' }
  },
  priceCell: {
    width: theme.spacing(25),
    minWidth: theme.spacing(25),
    borderBottom: 'none'
  },
  cell: {
    borderBottom: 'none'
  },
  headerLabel: { marginLeft: theme.spacing(1) },
  imageRoot: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      justifyContent: 'center'
    }
  },
  imageContainer: {
    height: theme.spacing(30),
    margin: theme.spacing(1, 0.5, 1, 0.5),
    [theme.breakpoints.up('md')]: {
      width: '30%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '45%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  hide: { display: 'none' },
  image: { width: '100%', height: '100%' },
  imageLoadingContainer: {
    height: theme.spacing(30),
    margin: theme.spacing(1, 0.5, 1, 0.5),
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      width: '30%'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '45%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  deleteImage: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: '100%',
    '&:hover': {
      backgroundColor: 'white',
      opacity: '60%'
    }
  },
  row: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      overflowX: 'auto'
    }
  }
}));

const { productCommon: resourceLabel } = resource;

export const StockKeepingUnitDetailsComponent = ({
  productSkus,
  onDeleteUnitClick,
  onSaveUnitClick,
  onUploadClick,
  handleQuantityChange,
  handlePricePerUnitChange,
  handleSellingPricePerUnitChange,
  onImageLoad,
  onDeleteImageClick,
  editable
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.sectionTop}>
        <Typography className={classes.heading} variant="h5">
          {resourceLabel.skuUnit}
        </Typography>
      </div>
      {productSkus && productSkus.length ? (
        <>
          <Divider variant="fullWidth" />
          {productSkus.map((sku, index) => (
            <React.Fragment key={sku.skuId}>
              <TableRow component="div" className={classes.row}>
                {editable ? (
                  <TableCell component="div" className={classes.actionCell}>
                    <ActionMenu
                      onDeleteClick={onDeleteUnitClick(sku.skuId)}
                      onSaveClick={onSaveUnitClick(sku.skuId)}
                      disableSave={
                        sku.originalPricePerUnit == sku.pricePerUnit && // eslint-disable-line eqeqeq
                        sku.originalQuantity == sku.quantity && // eslint-disable-line eqeqeq
                        sku.originalSellingPricePerUnit == // eslint-disable-line eqeqeq
                          sku.sellingPricePerUnit
                      }
                      onUploadClick={onUploadClick(sku.skuId)}
                    />
                  </TableCell>
                ) : null}
                <TableCell component="div" className={classes.quantityCell}>
                  {editable ? (
                    <Quantity
                      label="Quantity"
                      quantity={sku.quantity}
                      onChange={handleQuantityChange(index)}
                      margin="dense"
                      variant="outlined"
                    />
                  ) : (
                    <ReadOnlyField label="Quantity" value={sku.quantity} />
                  )}
                </TableCell>
                <TableCell component="div" className={classes.priceCell}>
                  {editable ? (
                    <Money
                      label="Price Per Unit"
                      amount={sku.pricePerUnit}
                      currencySymbol={sku.currencySymbol}
                      onChange={handlePricePerUnitChange(index)}
                      margin="dense"
                      variant="outlined"
                    />
                  ) : (
                    <ReadOnlyField
                      label="Price Per Unit"
                      value={`${sku.currencySymbol} ${sku.pricePerUnit}`}
                    />
                  )}
                </TableCell>
                <TableCell component="div" className={classes.priceCell}>
                  {editable ? (
                    <Money
                      label="Selling Price"
                      amount={sku.sellingPricePerUnit}
                      currencySymbol={sku.currencySymbol}
                      onChange={handleSellingPricePerUnitChange(index)}
                      margin="dense"
                      variant="outlined"
                    />
                  ) : (
                    <ReadOnlyField
                      label="Selling Price"
                      value={`${sku.currencySymbol} ${sku.sellingPricePerUnit}`}
                    />
                  )}
                </TableCell>
                <TableCell component="div" className={classes.cell}>
                  <OptionValuesFormatter optionValues={sku.variant} />
                </TableCell>
              </TableRow>
              <div className={classes.imageRoot}>
                {sku.images.map((img, imgIndex) => (
                  <React.Fragment key={img.key}>
                    {img.loading ? (
                      <div className={classes.imageLoadingContainer}>
                        <CircularProgress size={20} />
                      </div>
                    ) : null}
                    <div
                      className={clsx(
                        classes.imageContainer,
                        img.loading && classes.hide
                      )}
                    >
                      {editable ? (
                        <Tooltip title="Delete Image">
                          <IconButton
                            onClick={onDeleteImageClick(img.key)}
                            className={classes.deleteImage}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      <img
                        className={classes.image}
                        alt="Not available"
                        src={img.url}
                        onLoad={onImageLoad(imgIndex)}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <Divider variant="fullWidth" />
            </React.Fragment>
          ))}
        </>
      ) : (
        <NoDataMessage message="No any units are there" />
      )}
    </>
  );
};

StockKeepingUnitDetailsComponent.propTypes = {
  productSkus: PropTypes.arrayOf(PropTypes.any),
  onDeleteUnitClick: PropTypes.func,
  onSaveUnitClick: PropTypes.func,
  handleSellingPricePerUnitChange: PropTypes.func,
  onUploadClick: PropTypes.func,
  handleQuantityChange: PropTypes.func,
  handlePricePerUnitChange: PropTypes.func,
  onImageLoad: PropTypes.func,
  onDeleteImageClick: PropTypes.func,
  editable: PropTypes.bool
};
