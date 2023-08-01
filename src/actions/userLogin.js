import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';
import { toast } from 'react-toastify';


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(url.USER_LOGIN, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                password: password
              }),
            });
      
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error('Authentication failed. Please check your email and password');
              } else {
                throw new Error('An error occurred. Please try again later.');
              }
            }
            const data = await response.json();
            if (data.token) {
              localStorage.setItem('token', data.token);
            } 
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