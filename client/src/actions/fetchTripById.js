import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchTripById = createAsyncThunk(
    'trips/fetchTripById',
    async ({id, token}) => {
        try {
          const response = await fetch(`${url.TRIPS}${id}`, {
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
    
  );