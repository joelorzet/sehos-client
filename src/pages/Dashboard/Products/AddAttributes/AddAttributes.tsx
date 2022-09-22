import Grid from '@mui/material/Grid';
import React from 'react';
import AddCategory from '../AddCategory/AddCategory';
import DeleteCategory from '../AddCategory/DeleteCategory';
import AddColor from './AddColor/AddColor';
import Addsize from './AddSize/AddSize';
import DeleteSize from './AddSize/DeleteSize';
export default function AddAttributes() {
  return (
    <>
      <Grid display='flex' flexDirection='row' justifyContent='space-evenly' container>
        <Grid item xs={12} xl={4} lg={4}>
          <Addsize />
          <DeleteSize/>
        </Grid>
        <Grid item xs={12} xl={4} lg={4}>
          <AddCategory/>
          <DeleteCategory/>
        </Grid>
      </Grid>
    </>
  );
}
