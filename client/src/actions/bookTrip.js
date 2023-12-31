import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';
import { toast } from 'react-toastify';


export const bookTrip = createAsyncThunk(
    'bookings/bookTrip',
    async ({ token, tripId, userId, title, totalPrice, guests, date}, { rejectWithValue }) => {
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
                title: title,
                totalPrice: totalPrice,
                guests: guests,
                date: new Date(date).toISOString()
              }),
            });
      
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