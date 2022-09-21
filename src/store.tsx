import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import admin from './features/admin/adminSlice';
import { apiSlice } from './features/api/apiSlice';
import auth from './features/auth/authSlice';
import cartApiSlice from './features/cart/cartApiSlice';
import cart from './features/cart/CartSlice';
import categories from './features/category/categoriesSlice';
import checkout from './features/checkout/checkoutSlice';
import colors from './features/colors/getColorsSlice';
import products from './features/product/productSlice';
import sizes from './features/sizes/sizesSlice';
import user from './features/user/userSlice';

// importamos el export default que viene del slice

// Usamos la funcion configureStore y le pasamos un objeto que contiene el reducer/slice.reducer
export const store = configureStore({
  reducer: {
    admin,
    user,
    products,
    cart,
    apiCart: cartApiSlice,
    auth,
    checkout,
    categories,
    colors,
    sizes,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware: () => string | any[]) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Inferir los tipos `RootState` y `AppDispatch` de la propia store
export type RootState = ReturnType<typeof store.getState>;
// Tipo inferido: {admin, users, products, etc.}
export type AppDispatch = typeof store.dispatch;
