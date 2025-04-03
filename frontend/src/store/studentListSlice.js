import { createSlice } from '@reduxjs/toolkit'

const studentListSlice = createSlice({

    name: "studentsList",
    initialState: {
        studentsList: []
    },

    reducers: {
        addStudentsList: (state, action) => {
            state.studentsList = action.payload;
        }
    }
});


export const { addStudentsList } = studentListSlice.actions;
export default studentListSlice.reducer;
