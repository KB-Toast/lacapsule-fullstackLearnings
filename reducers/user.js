import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  cities: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload.username;
    },
    addCity: (state, action) => {
        state.cities.push(action.payload.city);
    },
    removeCity: (state, action) => {
        // remove city
        state.cities = state.cities.filter(data => data.features[0].properties.city !== action.payload.city);
    },
  },
});

export const { login, addCity, removeCity } = userSlice.actions;
export default userSlice.reducer;
