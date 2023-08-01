import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchTripById = createAsyncThunk(
    'trips/getTripById',
    async (id, token) => {
      if (id && token) {
        try {
          const response = await fetch(`${url.TRIP_BY_ID}${id}`, {
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
    }
  );