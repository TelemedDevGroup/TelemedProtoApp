import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputsContainer: {
    display: 'flex',
    width: '100%',
    margin: '1.5rem 0',
  },

  searchButton: {
    position: 'absolute',
    right: '2.5rem',
    background: '#00B5AD',
    color: 'white',
    minWidth: '8rem',
    height: '3.85rem',
    borderRadius: '4px',
    '&:hover': {
      background: '#00B5AD',
    },
  },

  inputField: {
    marginRight: '1rem',
  },
});

const FilterDoctors = (props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5">Search for a doctor</Typography>
      <div className={classes.inputsContainer}>
        <TextField
          variant="outlined"
          label="Name"
          className={classes.inputField}
        ></TextField>
        <TextField
          variant="outlined"
          label="Specialization"
          className={classes.inputField}
        ></TextField>
        <TextField
          variant="outlined"
          label="Prof level"
          className={classes.inputField}
        ></TextField>
        <Button className={classes.searchButton}>Search</Button>
      </div>
    </>
  );
};

export default FilterDoctors;
