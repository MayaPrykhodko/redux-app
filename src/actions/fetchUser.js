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
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }

  });


