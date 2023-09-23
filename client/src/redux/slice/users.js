import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    customer: "",
    currentUser: ""
    initialState: false,
    reducers: {
        setCustomer(){
            
        }
        toggleTheme : (state) =>(
            state = !state
        )
    }
});

export const {toggleTheme} = theme.actions;
export default theme.reducer;