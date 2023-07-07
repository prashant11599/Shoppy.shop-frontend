const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data:[],
        total:0,
    },
    reducers: {
        addCart(state, action) {
            const {cartdata,total}=action.payload;
            state.data=cartdata;
            state.total=total;
        },
        removeCart(state,action){
            state.data=[];
            state.total=0;
        }
    },
});
export const { addCart ,removeCart} = cartSlice.actions;
export default cartSlice.reducer;




