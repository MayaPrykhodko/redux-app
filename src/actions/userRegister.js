import { createAsyncThunk } from '@reduxjs/toolkit';
import url from '../enums/url';
import { toast } from 'react-toastify';


export const userRegister = createAsyncThunk(
    'auth/register',
    async ({ fullName, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(url.USER_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('User with this email already exists');
                } else {
                    throw new Error('An error occurred. Please try again later.');
                }
            }
            
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