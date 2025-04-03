import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    
    name: 'teacherInfo',
    initialState: {
        teacherInfo: null
    },
    reducers: {
        addTeacherInfo: (state, action) => {
            state.teacherInfo = action.payload;
        }
    }
});


export const { addTeacherInfo } = teacherSlice.actions;
export default teacherSlice.reducer;