// import { createSlice } from '@reduxjs/toolkit';
// const productSlice = createSlice({
//     name: 'product',
//     initialState: {
//         data: [],
//     },
//     reducers: {
//         setProducts(state, action) {
//             state.data = action.payload;
//         },
//         // setStatus(state, action) {
//         //     state.status = action.payload;
//         // },
//     },
// });

// export const { setProducts } = productSlice.actions;
// export default productSlice.reducer;
// import { axiosFetch } from '../components/interceptors/axios';
const { createSlice } = require('@reduxjs/toolkit');
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        total:" ",
        status: STATUSES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            const {records,total}=action.payload;
            state.data = records;
            state.total=total;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProducts.pending, (state, action) => {
    //             state.status = STATUSES.LOADING;
    //         })
    //         .addCase(fetchProducts.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = STATUSES.IDLE;
    //         })
    //         .addCase(fetchProducts.rejected, (state, action) => {
    //             state.status = STATUSES.ERROR;
    //         });
    // },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// // Thunks
// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//     const res=await axiosFetch("http://localhost:5000/api/products/all");
//     return res.data;
// });




