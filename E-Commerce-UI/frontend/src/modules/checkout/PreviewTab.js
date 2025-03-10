import React, { useCallback } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { FlexView } from 'modules/common/components';
import { Preview } from './Preview';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: theme.spacing(4)
  },
  continue: {
    margin: 'auto'
  }
}));

const arrowBackOutlinedIcon = <ArrowBackOutlinedIcon />;

export const PreviewTab = ({ handleChange, tabs, preview }) => {
  const classes = useStyles();

  const onContinueClick = useCallback(
    (e) => {
      handleChange(e, tabs.payment.value);
    },
    [handleChange, tabs.payment.value]
  );

  const onBackClick = useCallback(
    (e) => {
      handleChange(e, tabs.address.value);
    },
    [handleChange, tabs.address.value]
  );

  return (
    <>
      <FlexView>
        <Button startIcon={arrowBackOutlinedIcon} onClick={onBackClick}>
          Back
        </Button>
      </FlexView>
      <Preview preview={preview} />
      <FlexView className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={onContinueClick}
          className={classes.continue}
        >
          Continue
        </Button>
      </FlexView>
    </>
  );
};

PreviewTab.propTypes = {
  handleChange: PropTypes.func,
  tabs: PropTypes.objectOf(PropTypes.any),
  preview: PropTypes.object
};
