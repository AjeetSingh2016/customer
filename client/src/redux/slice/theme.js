import { createSlice } from "@reduxjs/toolkit";

export const theme = createSlice({
    name: "theme",
    initialState: true,
    reducers: {
        toggleTheme : (state) =>(
            state = !state
        )
    }
});

export const {toggleTheme} = theme.actions;
export default theme.reducer;