import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, IconButton, Typography } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Dropdown2, FlexView } from 'modules/common/components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { resource } from 'modules/resources';

const { productCommon: resourceLabel } = resource;

export const SpecificationsEdit = ({
  spec,
  onSpecificationOptionChange,
  index,
  options,
  valuesByOptionId,
  onSpecificationValueChange,
  onRemoveSpecification,
  onAddSpecification,
  specificationsLength
}) => (
  <React.Fragment key={spec.id}>
    <Grid item xs={5}>
      <Dropdown2
        id="product-option"
        noneOption={index === 0}
        variant="outlined"
        margin="dense"
        displayEmpty
        label={resourceLabel.option}
        options={options || []}
        selectedId={spec.optionId}
        onChange={onSpecificationOptionChange(index)}
      />
    </Grid>
    <Grid item xs={5}>
      <Dropdown2
        id="product-option"
        noneOption={index === 0}
        variant="outlined"
        margin="dense"
        displayEmpty
        options={valuesByOptionId[spec.optionId] || []}
        selectedId={spec.valueId}
        label={resourceLabel.value}
        onChange={onSpecificationValueChange(index)}
      />
    </Grid>
    <Grid item xs={2}>
      <FlexView>
        {index === 0 ? null : (
          <Tooltip title={resourceLabel.removeSpec}>
            <IconButton
              onClick={onRemoveSpecification(index)}
              color="secondary"
              variant="contained"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
        {index === specificationsLength - 1 ? (
          <Tooltip title={resourceLabel.addSpecs}>
            <IconButton
              onClick={onAddSpecification}
              color="secondary"
              variant="contained"
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </FlexView>
    </Grid>
  </React.Fragment>
);

SpecificationsEdit.propTypes = {
  spec: PropTypes.object,
  onSpecificationOptionChange: PropTypes.func,
  index: PropTypes.number,
  options: PropTypes.array,
  valuesByOptionId: PropTypes.object,
  onSpecificationValueChange: PropTypes.func,
  onRemoveSpecification: PropTypes.func,
  onAddSpecification: PropTypes.func,
  specificationsLength: PropTypes.number
};

export const Specifications = ({ spec }) => (
  <React.Fragment key={spec.id}>
    <Grid item xs={6}>
      <Typography variant="subtitle2">{spec.optionName}</Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography variant="subtitle2">{spec.valueName}</Typography>
    </Grid>
  </React.Fragment>
);

Specifications.propTypes = {
  spec: PropTypes.object
};
