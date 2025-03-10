import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDeletePreference } from 'modules/user/hooks/';

const isDirtyField = 'isDirty';

export const DeleteItem = ({ record, index, column: { setFieldValue } }) => {
  const { deletePreference } = useDeletePreference();

  const onClick = useCallback(async () => {
    setFieldValue(`records[${index}].${isDirtyField}`, true);
    await deletePreference({ preferenceId: record.id });
  }, [deletePreference, index, record.id, setFieldValue]);

  return (
    <IconButton disabled={record[isDirtyField]} onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );
};

DeleteItem.propTypes = {
  record: PropTypes.object,
  column: PropTypes.object,
  index: PropTypes.number
};
