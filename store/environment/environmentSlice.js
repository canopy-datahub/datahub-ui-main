import { createSlice } from '@reduxjs/toolkit';

export const environmentSlice = createSlice({
    name: 'environment',
    initialState: {
        showLoading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.showLoading = true;
        },
        hideLoading: (state) => {
            state.showLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { showLoading, hideLoading } = environmentSlice.actions;

export default environmentSlice.reducer;
