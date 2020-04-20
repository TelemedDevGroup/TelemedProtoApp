import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const PageNotFound = () => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ height: '100vh' }}
  >
    <Typography variant="h3">Data Not Found :(</Typography>
  </Grid>
);

export default PageNotFound;
