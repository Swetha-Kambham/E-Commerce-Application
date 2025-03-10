import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  CardMedia,
  Typography,
  makeStyles,
  Grid,
  IconButton,
  TextField,
  Divider
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import {
  useDeletePreference,
  useUpdatePreferenceQuantity
} from 'modules/user/hooks/';
import { FlexView } from 'modules/common/components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(1),
    height: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(15)
    }
  },
  details: {
    margin: 'auto',
    padding: theme.spacing(1)
  },
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
  quantityContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  },
  priceLabel: {
    margin: 'auto',
    display: 'inline-flex'
  },
  totalPriceLabel: {
    margin: 'auto',
    display: 'inline-flex',
    fontWeight: 600
  },
  priceGrid: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  deleteButtonContainer: {
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}));

const isDirtyField = 'isDirty';
const thresholdQuantity = 10;
const quantityField = 'quantity';

export const MobileOrderListRow = ({ record, index }) => {
  const { setFieldValue } = useFormikContext();
  const { deletePreference } = useDeletePreference();

  const onClick = useCallback(async () => {
    setFieldValue(`records[${index}].[${isDirtyField}]`, true);
    await deletePreference({ preferenceId: record.id });
  }, [deletePreference, index, record.id, setFieldValue]);
  const classes = useStyles();

  const { price, quantity, productName, images } = record;
  const [image] = images;
  const { amount, currency } = price;

  const priceString = `${currency?.symbol} ${parseFloat(amount).toFixed(2)}`;

  const totalPriceString = `${currency?.symbol} ${(
    parseInt(quantity) * parseFloat(amount)
  ).toFixed(2)}`;

  const { updatePreferenceQuantity } = useUpdatePreferenceQuantity();

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
      if (value + delta > 0 && value + delta <= thresholdQuantity) {
        setFieldValue(`records[${index}]${quantityField}`, value + delta);
        setFieldValue(`records[${index}]${isDirtyField}`, true);
        await updatePreferenceQuantity({
          preferenceId: record.id,
          quantity: value + delta
        });
        return;
      }
      if (value + delta === 0) {
        setFieldValue(`records[${index}]${quantityField}`, 0);
        setFieldValue(`records[${index}]${isDirtyField}`, true);
        await deletePreference({ preferenceId: record.id });
      }
    },
    [
      deletePreference,
      index,
      quantity,
      record.id,
      setFieldValue,
      updatePreferenceQuantity
    ]
  );

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <div>
            <CardMedia
              id={record.id}
              className={classes.image}
              component="img"
              alt="Not Available"
              image={image?.url}
            />
            <Typography variant="subtitle2" className={classes.details}>
              {productName}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={7} className={classes.priceGrid}>
          <FlexView>
            <Typography className={classes.priceLabel} variant="subtitle2">
              {priceString}
            </Typography>
          </FlexView>
          <FlexView>
            <div className={classes.quantityContainer}>
              <IconButton
                disabled={record[isDirtyField]}
                onClick={onChange(-1)}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <TextField
                className={classes.quantityField}
                variant="outlined"
                value={quantity}
                InputProps={InputProps}
              />
              <IconButton
                disabled={
                  record[isDirtyField] ||
                  parseInt(quantity) === parseInt(thresholdQuantity)
                }
                onClick={onChange(1)}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </div>
          </FlexView>
          <FlexView>
            <Typography className={classes.totalPriceLabel} variant="subtitle2">
              {totalPriceString}
            </Typography>
          </FlexView>
        </Grid>
        <Grid item xs={1} sm={1} className={classes.deleteButtonContainer}>
          <IconButton disabled={record[isDirtyField]} onClick={onClick}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" />
    </>
  );
};

MobileOrderListRow.propTypes = {
  record: PropTypes.object,
  index: PropTypes.number
};
