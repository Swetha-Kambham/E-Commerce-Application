import React, { useMemo, useCallback } from 'react';
import { TextField, IconButton, makeStyles } from '@material-ui/core';
import { FlexView } from 'modules/common/components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import {
  useUpdatePreferenceQuantity,
  useDeletePreference
} from 'modules/user/hooks/';

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
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  }
}));

const isDirtyField = 'isDirty';
const thresholdQuantity = 10;

export const QuantityEditor = ({
  record,
  field,
  index,
  column: { setFieldValue }
}) => {
  const classes = useStyles();
  const quantity = record[field];
  const { updatePreferenceQuantity } = useUpdatePreferenceQuantity();
  const { deletePreference } = useDeletePreference();

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
        setFieldValue(`records[${index}]${field}`, value + delta);
        setFieldValue(`records[${index}]${isDirtyField}`, true);
        await updatePreferenceQuantity({
          preferenceId: record.id,
          quantity: value + delta
        });
        return;
      }
      if (value + delta === 0) {
        setFieldValue(`records[${index}]${field}`, 0);
        setFieldValue(`records[${index}]${isDirtyField}`, true);
        await deletePreference({ preferenceId: record.id });
      }
    },
    [
      deletePreference,
      field,
      index,
      quantity,
      record.id,
      setFieldValue,
      updatePreferenceQuantity
    ]
  );

  return (
    <FlexView>
      <div className={classes.container}>
        <IconButton disabled={record[isDirtyField]} onClick={onChange(-1)}>
          <RemoveIcon />
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
          <AddIcon />
        </IconButton>
      </div>
    </FlexView>
  );
};

QuantityEditor.propTypes = {
  record: PropTypes.object,
  field: PropTypes.string,
  index: PropTypes.number,
  column: PropTypes.object
};
