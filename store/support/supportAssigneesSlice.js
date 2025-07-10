import { createSlice } from '@reduxjs/toolkit';

export const supportAssigneesSlice = createSlice({
    name: 'supportAssignees',
    initialState: {
        assignees: null,
    },
    reducers: {
        setAssignees: (state, action) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAssignees } = supportAssigneesSlice.actions;

export default supportAssigneesSlice.reducer;
