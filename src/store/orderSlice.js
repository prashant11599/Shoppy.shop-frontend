import { createSlice} from '@reduxjs/toolkit';


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: [],
        paymentStatus:"",
        total: "",
    },
    reducers: {
        setOrder(state, action) {
            const {orderdata,paymentStatus,total}=action.payload;
            state.data=orderdata;
            state.paymentStatus=paymentStatus;
            state.total=total;
        },
        removeOrder(state,action){
            state.data=[];
            state.paymentStatus="";
            state.total="";
        }
    },
});
export const { setOrder,removeOrder } = orderSlice.actions
export default orderSlice.reducer