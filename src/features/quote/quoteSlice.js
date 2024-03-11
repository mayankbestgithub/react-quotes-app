import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '../../api/client';

export const fetchQuotesAsync = createAsyncThunk('quote/fetchQuotes', async (category) => {
    let url = 'https://api.api-ninjas.com/v1/quotes?category=' + category;
    console.log(url)
    const response = await client.get(url);

    return response;
});
export const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        values: [],
        status: 'idle',
        error: null,
        categories: ["age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "business", "car", "happiness"],
    },
    reducers: {

        // load: (state, action) => {
        //     state.loading = false;
        //     state.values = action.payload;
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuotesAsync.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchQuotesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.values = action.payload;
            })
            .addCase(fetchQuotesAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
// export const { load } = quoteSlice.actions;

export const allQuotes = state => state.quote.values;
export const isLoading = state => state.quote.status;
export const getCategories = state => state.quote.categories;


export default quoteSlice.reducer;