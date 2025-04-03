import { createSlice } from "@reduxjs/toolkit";

const individualStudentDetailsSlice = createSlice({

    name: 'individualStudentDetails',
    initialState: {
        individualStudentDetails: null
    },
    reducers: {
        addIndividualStudentDetails: (state, action) => {
            state.individualStudentDetails = action.payload;
        }
    }
});


export const { addIndividualStudentDetails } = individualStudentDetailsSlice.actions;
export default individualStudentDetailsSlice.reducer;