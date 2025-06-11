import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state,value){
            state.totalItems = value.payload;
        },
        //add to cart, remove from cart, resetCart
        addItem(state,value){
            state.totalItems = state.totalItems + 1;
        },
        removeItem(state,value){
            state.totalItems = Math.max(0,state.totalItems - 1);
        },
        resetCart(state,value){
            state.totalItems = 0;
        },

    },
});

export const {setTotalItems,addItem,removeItem,resetCart} = cartSlice.actions;
export default cartSlice.reducer;