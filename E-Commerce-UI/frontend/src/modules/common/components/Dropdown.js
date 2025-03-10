import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const useStyles = makeStyles((theme) => ({
  root: ({ maxWidth }) => ({
    width: '100%',
    maxWidth
  })
}));

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '100%'
  })
};

export const Dropdown = ({ label, dropdownClasses }) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div
      className={clsx(classes.root, dropdownClasses && dropdownClasses.root)}
    >
      {label ? (
        <Typography
          className={clsx(dropdownClasses && dropdownClasses.label)}
          variant="body2"
        >
          {label}
        </Typography>
      ) : null}
      <Select
        defaultValue={selectedOption}
        className={clsx(dropdownClasses && dropdownClasses.dropdown)}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
        maxMenuHeight={300}
      />
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dropdownClasses: PropTypes.objectOf(PropTypes.any)
};
