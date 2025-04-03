import { createSlice } from "@reduxjs/toolkit";

const schoolInfo = createSlice({

    name: 'schoolInfo',
    initialState: {
        schoolInfo: null
    },
    reducers: {
        addSchoolInfo: (state, action) => {
            state.schoolInfo = action.payload;
        }
    }
});


export const { addSchoolInfo } = schoolInfo.actions;
export default schoolInfo.reducer;