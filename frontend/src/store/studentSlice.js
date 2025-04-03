import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({

    name: 'studentInfo',
    initialState: {
        studentInfo: null
    },
    reducers: {
        addStudentInfo: (state, action) => {
            state.studentInfo = action.payload;
        }
    }
});


export const { addStudentInfo } = studentSlice.actions;
export default studentSlice.reducer;