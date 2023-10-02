import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token) => {
    if (token) {
      try {
        const response = await fetch(url.AUTHENTICATED_USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized');
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

  });


