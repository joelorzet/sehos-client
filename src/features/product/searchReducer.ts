import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../routes/routes';
import toast from 'react-hot-toast';

export const searchProduct: any = createAsyncThunk('search-product', (search: any) => {
  return fetch(`${Endpoint.searchProduct}/${search}`)
    .then(res => res.json())
    .catch(err => console.log(err));
});

export const searchReducer = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(searchProduct.pending, () => {
    toast.loading('Buscando coincidencias...');
  });

  builder.addCase(searchProduct.fulfilled, (state:any, action:any) => {
    if (action.payload.length) {
      toast.dismiss();
      toast.success('Redirigiendo...');
    } else {
      toast.dismiss();
      toast.error('No se han encontrado coincidencias');
    }
    state.searchResult = action.payload;
  });


  builder.addCase(searchProduct.rejected, (state:any) => {

    toast.dismiss();
    toast.error('<b>No se encontraron coincidencias</b>');
    state.searchResult = [];
  });
};

