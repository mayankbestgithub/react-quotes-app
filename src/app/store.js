import { configureStore } from '@reduxjs/toolkit'
import quoteReducer from '../features/quote/quoteSlice';
import authReducer from '../auth/authSlice';
export default configureStore({
    reducer: {
        quote: quoteReducer,
        auth: authReducer
    },
})