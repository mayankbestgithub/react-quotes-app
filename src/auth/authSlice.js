import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";
export const loginpostAsync = createAsyncThunk('auth/loginpost', async (credentials, { dispatch, getState }) => {

    const { username, password } = credentials;


    const response = await client.post(username, password);
    return response

})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        username: null,
        status: 'idle',
        err: null
    },
    reducers: {
        errorNotify(state, action) {
            state.err = action.payload.error;
            state.status = 'failed';
        },
        logout(state) {
            state.loggedIn = false;
            state.username = null;
            state.err = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginpostAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginpostAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.loggedIn = true;
                state.username = action.payload.username;
            })
            .addCase(loginpostAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.err = action.error.message;
            })
    }
})
export const { logout, errorNotify, login } = authSlice.actions;

export const isLoggedIn = (state) => state.auth.loggedIn;
export const getUserName = (state) => state.auth.username;
export const errorMessage = (state) => state.auth.err;
export default authSlice.reducer;