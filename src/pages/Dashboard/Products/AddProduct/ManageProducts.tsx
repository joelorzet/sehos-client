import Grid from '@mui/material/Grid';
import React from 'react';
import DeleteProduct from './DeleteProduct';
import AddProduct from './AddProduct';
import UpdateStock from './StockUpdate';
import UpdateProduct from './UpdateProduct';
export default function ManageProducts() {
    return (
        <>
            <Grid display='flex' flexDirection='row' justifyContent='space-evenly' container>
                <Grid item xs={12} xl={4} lg={4}>
                    <AddProduct/>
                    <DeleteProduct/>
                </Grid>
                <Grid item xs={12} xl={4} lg={4}>
                    <UpdateProduct/>
                    <UpdateStock/>
                </Grid>
            </Grid>
        </>
    );
}
