import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  DialogActions,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useIsMobile, MOBILE_SCREEN_SIZE } from 'modules/common/hooks';
import { FlexView } from 'modules/common/components';
import { usePageOfProductUnits } from 'modules/infiniteProductGridView/hooks/usePageOfProductUnits';
import { AddUpdateProductDialogContent } from './AddUpdateProductDialogContent';
import { useOnSubmit, useAddOrUpdateProductUnitsToProductView } from './hooks';

const useDialogStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(100),
    [theme.breakpoints.down(MOBILE_SCREEN_SIZE)]: {
      width: '100%'
    }
  }
}));

const useCloseButtonStyles = makeStyles((theme) => ({
  root: {
    padding: 'unset',
    float: 'right',
    marginTop: theme.spacing(-0.5),
    marginLeft: 'auto'
  }
}));

export const AddUpdateProductDialog = ({
  open,
  onClose,
  viewId,
  productUnits: productViewProductUnits
}) => {
  const [saving, setSaving] = useState(false);
  const { addOrUpdateProductUnitsToProductView } =
    useAddOrUpdateProductUnitsToProductView();
  const [selectedProductUnits, setSelectedProductUnits] = useState(
    productViewProductUnits || []
  );
  const { isMobile } = useIsMobile();
  const { productUnits, loading, loadMore, hasMore } = usePageOfProductUnits(
    {}
  );
  const { onSubmit } = useOnSubmit({
    setSaving,
    onClose,
    viewId,
    addOrUpdateProductUnitsToProductView,
    selectedProductUnits
  });

  return (
    <>
      <Dialog
        open={open}
        disableBackdropClick
        onClose={onClose}
        classes={useDialogStyles()}
        fullScreen={isMobile}
      >
        <DialogTitle>
          <FlexView>
            <Typography variant="h6">Add Product</Typography>
            <IconButton
              disabled={saving}
              classes={useCloseButtonStyles()}
              onClick={onClose}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </FlexView>
        </DialogTitle>
        <DialogContent>
          <AddUpdateProductDialogContent
            productUnits={productUnits}
            loading={loading}
            loadMore={loadMore}
            hasMore={hasMore}
            selectedProductUnits={selectedProductUnits}
            setSelectedProductUnits={setSelectedProductUnits}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={saving}
            onClick={onSubmit}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            disabled={saving}
            onClick={onClose}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddUpdateProductDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  productUnits: PropTypes.array,
  viewId: PropTypes.string
};
