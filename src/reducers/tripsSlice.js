// tripsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrips } from '../actions/fetchTrips';
import { fetchTripById } from '../actions/fetchTripById';

const tripsSlice = createSlice({
    name: 'trips',
    initialState: {
        loading: false,
        error: null,
        trips: [],
        selectedTrip: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.trips = action.payload;
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.trips = null;
            })
            .addCase(fetchTripById.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchTripById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTrip = action.payload;
                state.error = null;
              })
              .addCase(fetchTripById.rejected, (state, action) => {
                state.loading = false;
                state.selectedTrip = null;
                state.error = action.payload;
              });
    },
});

export default tripsSlice.reducer;
