import { createSlice } from "@reduxjs/toolkit"; 

const classAnnouncementsSlice = createSlice({

    name: "classAnnouncements",
    initialState: {
        classAnnouncements: null
    },
    reducers: {
        addAnnouncements: (state, action) => {
            state.classAnnouncements = action.payload
        }
    }
});

export const { addAnnouncements } = classAnnouncementsSlice.actions;
export default classAnnouncementsSlice.reducer;