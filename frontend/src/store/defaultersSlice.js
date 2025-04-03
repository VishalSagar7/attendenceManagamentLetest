import { createSlice } from "@reduxjs/toolkit";

const defaulterSlice = createSlice({

    name: 'defaulterlist',
    initialState: {
        defaulterlist: null
    },
    reducers: {
        addDefaulterList: (state, action) => {
            state.defaulterlist = action.payload;
        }
    }
});


export const { addDefaulterList } = defaulterSlice.actions;
export default defaulterSlice.reducer;