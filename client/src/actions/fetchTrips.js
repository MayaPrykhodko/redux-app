import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchTrips = createAsyncThunk(
    'trips/getAllTrips',
    async (token) => {
      if (token) {
        try {
          const response = await fetch(url.TRIPS, {
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