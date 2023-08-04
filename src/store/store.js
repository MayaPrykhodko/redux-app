import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import tripsReducer from '../reducers/tripsSlice';
import bookingReducer from '../reducers/bookingsSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      trips: tripsReducer,
      bookings: bookingReducer
    },
  });

export default store;