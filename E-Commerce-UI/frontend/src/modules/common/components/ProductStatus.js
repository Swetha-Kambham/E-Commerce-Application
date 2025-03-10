import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Chip } from '@material-ui/core';
import clsx from 'clsx';
import { useAuthContext } from 'modules/auth/AuthContext';
import { styled } from '@material-ui/core/styles';
import { productStatus } from 'modules/common/enums';
import { Roles } from '../enums/Roles';
import { useUpdateProductStatus } from '../hooks/useUpdateProductStatus';

const chip = {
  [productStatus.NEW]: styled((props) => <Chip label="New" {...props} />)(
    ({ theme }) => ({
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white
    })
  ),
  [productStatus.EDITED]: styled((props) => (
    <Chip label="Modified" {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.grey[500],
    color: theme.palette.common.white
  })),
  [productStatus.UNDER_REVIEW]: styled((props) => (
    <Chip label="Under Review" {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  })),
  [productStatus.REJECTED]: styled((props) => (
    <Chip label="Rejected" {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white
  })),
  [productStatus.APPROVED]: styled((props) => (
    <Chip label="Approved" {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white
  })),
  [productStatus.LIVE]: styled((props) => <Chip label="Live" {...props} />)(
    ({ theme }) => ({
      backgroundColor: 'red',
      color: theme.palette.common.white
    })
  )
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1.5),
    paddingRight: theme.spacing(3)
  }
}));

export const ProductStatus = ({ className, product, editable }) => {
  const classes = useStyles();
  const { me } = useAuthContext();
  const { updateProductStatus } = useUpdateProductStatus();

  const StyledChip = chip[product.status];
  const LiveChip = chip[productStatus.LIVE];
  const ApprovedChip = chip[productStatus.APPROVED];

  const onRequestForVerificationClick = useCallback(
    (status) => async () => {
      updateProductStatus({
        productId: product.id,
        status
      });
    },
    [product.id, updateProductStatus]
  );

  if (!editable) {
    return (
      <div className={clsx(classes.root, className)}>
        {Boolean(StyledChip) && <StyledChip />}
      </div>
    );
  }

  if (me && me.role === Roles.admin)
    return (
      <div className={clsx(className, classes.root)}>
        {(() => {
          if (
            product.status === productStatus.NEW ||
            product.status === productStatus.EDITED ||
            product.status === productStatus.UNDER_REVIEW
          ) {
            return (
              <Button
                onClick={onRequestForVerificationClick(productStatus.APPROVED)}
                color="primary"
              >
                Approve Product
              </Button>
            );
          }

          if (product.status === productStatus.APPROVED) {
            return (
              <>
                <ApprovedChip />
                <Button
                  onClick={onRequestForVerificationClick(productStatus.LIVE)}
                >
                  Ready For Sale
                </Button>
              </>
            );
          }

          if (product.status === productStatus.LIVE) {
            return (
              <>
                <LiveChip />
                <Button
                  onClick={onRequestForVerificationClick(
                    productStatus.APPROVED
                  )}
                >
                  Hide
                </Button>
              </>
            );
          }

          return Boolean(StyledChip) && <StyledChip />;
        })()}
      </div>
    );

  return (
    <div className={clsx(className, classes.root)}>
      {(() => {
        if (
          product.status === productStatus.NEW ||
          product.status === productStatus.EDITED
        ) {
          return (
            <Button
              onClick={onRequestForVerificationClick(
                productStatus.UNDER_REVIEW
              )}
              color="primary"
            >
              Request For Verification
            </Button>
          );
        }

        if (product.status === productStatus.APPROVED) {
          return (
            <>
              <ApprovedChip />
              <Button
                onClick={onRequestForVerificationClick(productStatus.LIVE)}
              >
                Ready For Sale
              </Button>
            </>
          );
        }

        if (product.status === productStatus.LIVE) {
          return (
            <>
              <LiveChip />
              <Button
                onClick={onRequestForVerificationClick(productStatus.APPROVED)}
              >
                Hide
              </Button>
            </>
          );
        }

        return Boolean(StyledChip) && <StyledChip />;
      })()}
    </div>
  );
};

ProductStatus.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
  editable: PropTypes.bool
};

export default ProductStatus;
