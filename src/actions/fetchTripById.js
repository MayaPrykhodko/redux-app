import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchTripById = createAsyncThunk(
    'trips/fetchTripById',
    async ({id, token}) => {
        try {
          const response = await fetch(`${url.TRIP_BY_ID}${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Unauthorized user');
            } else {
              throw new Error('An error occurred. Please try again later.');
            }
          }
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
      }
    
  );