import { createSlice } from '@reduxjs/toolkit';
import { bookTrip } from '../actions/bookTrip';
import { fetchBookings } from '../actions/fetchBookings';
import { deleteBooking } from '../actions/deleteBooking';

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        loading: false,
        error: null,
        bookings: [],
    },
    reducers: {
        deleteItem: (state,action) => {
              state.bookings = state.bookings.filter((item) => item.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bookings = state.bookings.concat(action.payload);
            })
            .addCase(bookTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.bookings = null;
            })
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.bookings = null;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.bookingId);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        
    },
});

export const {deleteItem} = bookingsSlice.actions;
export default bookingsSlice.reducer;