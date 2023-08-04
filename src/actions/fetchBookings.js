import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchBookings = createAsyncThunk(
    'bookings/getAllBookings',
    async (token) => {
      if (token) {
        try {
          const response = await fetch(url.BOOKINGS, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
      }
  
    });