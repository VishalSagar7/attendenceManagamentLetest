import { createSlice } from '@reduxjs/toolkit';

const selectedTabSlice = createSlice({

    name: "selectedTab",
    initialState: {
        selectedTab : null
    },
    
    reducers: {
        addSelectedTab: (state, action) => {
            console.log(action.payload);
            
            state.selectedTab = action.payload
        }
    }
});

export const { addSelectedTab } = selectedTabSlice.actions;
export default selectedTabSlice.reducer;
