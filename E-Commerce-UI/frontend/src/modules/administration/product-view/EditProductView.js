import React, { useState, useCallback, useMemo } from 'react';
import { Drawer, makeStyles, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useViewSettings } from 'modules/common';
import { ProductViewDetails } from './ProductViewDetails';
import {
  useProductViewDetails,
  useFormState,
  usePutProductView,
  useDeleteProductView,
  useUploadObject,
  useDeleteProductViewSettings
} from './hooks';
import { DrawerHeader } from './DrawerHeader';
import { DrawerFooter } from './DrawerFooter';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  circularProgress: {
    margin: 'auto'
  }
}));

export const EditProductView = ({ onClose, open, isAaddMode, id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { putProductView } = usePutProductView();
  const { deleteViewSettings } = useDeleteProductViewSettings();
  const classes = useStyles();
  const drawerClasses = useMemo(
    () => ({
      paper: classes.paper
    }),
    [classes.paper]
  );
  const [editable, setEditable] = useState(isAaddMode);
  const onEditClick = useCallback(() => {
    setEditable(true);
  }, []);
  const { deleteProductView } = useDeleteProductView();

  const { productView, loading } = useProductViewDetails({ id });
  const { viewSettings, loading: viewSettingsLoading } = useViewSettings({
    name: productView?.name
  });
  const formik = useFormState({
    productView
  });
  const { values, setFieldValue, handleReset } = formik;
  const { upload, getObjectUrl } = useUploadObject({
    setFieldValue,
    image: values.image,
    onClose,
    setIsSubmitting
  });

  const onDelete = useCallback(async () => {
    await deleteProductView({ id, name: productView?.name });

    if (viewSettings && viewSettings.name) {
      await deleteViewSettings({ name: viewSettings.name });
    }

    onClose();
  }, [
    deleteProductView,
    deleteViewSettings,
    id,
    onClose,
    productView,
    viewSettings
  ]);

  const closeEditMode = useCallback(() => {
    setEditable(false);
    handleReset();
  }, [handleReset]);

  const onSave = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const res = await putProductView({
        productView: {
          name: values.name,
          description: values.description,
          summary: values.summary,
          priority: parseInt(values.priority)
        }
      });

      if (res?.putProductView?.id) {
        const imageUrls = await getObjectUrl({ id: res?.putProductView?.id });

        if (imageUrls && imageUrls.length) {
          await upload({ url: imageUrls[0].url });
        }
      }
    } catch (err) {
      //
    }
  }, [getObjectUrl, putProductView, upload, values]);

  return (
    <Drawer classes={drawerClasses} anchor="right" open={open}>
      <DrawerHeader
        editable={editable}
        onClose={onClose}
        onEditClick={onEditClick}
      />
      {!loading && !viewSettingsLoading ? (
        <ProductViewDetails
          editable={editable}
          values={values}
          setFieldValue={setFieldValue}
          viewSettings={viewSettings}
        />
      ) : (
        <CircularProgress className={classes.circularProgress} size={24} />
      )}
      <DrawerFooter
        editable={editable}
        isSubmitting={isSubmitting}
        closeEditMode={closeEditMode}
        isAaddMode={isAaddMode}
        onSave={onSave}
        values={values}
        onDelete={onDelete}
      />
    </Drawer>
  );
};

EditProductView.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  isAaddMode: PropTypes.bool,
  id: PropTypes.string
};
