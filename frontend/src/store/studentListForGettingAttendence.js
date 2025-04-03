import { createSlice } from '@reduxjs/toolkit'

const studentListForGettingAttendence = createSlice({

    name: "studentListForGettingAttendence",
    initialState: {
        studentListForGettingAttendence: []
    },

    reducers: {
        addStudentListForGettingAttendence: (state, action) => {
            state.studentListForGettingAttendence = action.payload;
        }
    }
});


export const { addStudentListForGettingAttendence } = studentListForGettingAttendence.actions;
export default studentListForGettingAttendence.reducer;
