import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';
import { toast } from 'react-toastify';


export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async ({ token, bookingId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url.BOOKINGS}${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok)
        return { bookingId };
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