import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topBanner: {
        enabled: false,
        text: '',
        bgColor: '#ffc107',
    },
    loaded: false,
};

export const systemSettingsSlice = createSlice({
    name: 'systemSettings',
    initialState,
    reducers: {
        setSystemSettings: (state, action) => {
            const payload = action.payload || {};
            if (payload.topBanner) {
                state.topBanner = { ...state.topBanner, ...payload.topBanner };
            }
            state.loaded = true;
        },
        setTopBanner: (state, action) => {
            state.topBanner = { ...state.topBanner, ...action.payload };
        },
    },
});

export const { setSystemSettings, setTopBanner } = systemSettingsSlice.actions;

export default systemSettingsSlice.reducer;
