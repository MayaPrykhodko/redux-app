import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';
import { toast } from 'react-toastify';


export const bookTrip = createAsyncThunk(
    'bookings/bookTrip',
    async ({ token, tripId, userId, guests, date}, { rejectWithValue }) => {
        try {
            const response = await fetch(url.BOOKINGS, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                tripId: tripId,
                userId: userId,
                guests: guests,
                date: new Date(date).toISOString()
              }),
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
        }
        catch (error) {
          toast.error(error.message, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          
          return rejectWithValue(error.message);
        }
    }
)