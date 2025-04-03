import { createSlice } from "@reduxjs/toolkit";

const classSubjectSlice = createSlice({

    name: 'classSubjects',
    initialState: {
        classSubjects: []
    },
    reducers: {
        addClassSubjects: (state, action) => {
            state.classSubjects = action.payload;
        }
    }
});


export const { addClassSubjects } = classSubjectSlice.actions;
export default classSubjectSlice.reducer;