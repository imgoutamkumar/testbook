import { configureStore as createReduxStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import { authApi } from '../redux/services/authApi';
import { productApi } from '@/redux/services/productApi';
import { categoryApi } from '@/redux/services/categoryApi';
import { brandApi } from '@/redux/services/brandApi';
import { attributeApi } from '@/redux/services/attributeApi';
import { testApi } from '@/redux/services/testApi';
export const store = createReduxStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [testApi.reducerPath]: testApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [attributeApi.reducerPath]: attributeApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, productApi.middleware,categoryApi.middleware, brandApi.middleware, attributeApi.middleware,testApi.middleware),
});