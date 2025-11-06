import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
    name: "customer",
    initialState: ["razia"],
    reducers: {
        addCustomer : (state,action) => { state.push(action.payload); },
        removeCustomer(state, action){
            return state.filter((customer) => customer !== action.payload);
        }
    }
});

export const { addCustomer, removeCustomer } = customerSlice.actions;
export default customerSlice.reducer;