import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import tripsReducer from '../reducers/tripsSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      trips: tripsReducer
    },
  });

export default store;