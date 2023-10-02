import React from 'react';
import { useEffect } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import BookingItem from '../Blocks/BookingItem';
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from '../../actions/fetchBookings';
import { fetchUser } from '../../actions/fetchUser';
import { deleteBooking } from '../../actions/deleteBooking';
import { useNavigate } from "react-router-dom";
import paths from '../../enums/paths';
import { toast } from 'react-toastify';
import { deleteItem } from '../../reducers/bookingsSlice';


export default function Bookings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token));
            dispatch(fetchBookings(token));
        } else {
            navigate(paths.SIGN_IN);
        }
    }, [dispatch, navigate, token]);

    const currentBookings = useSelector((state) => state.bookings.bookings);
    const user = useSelector((state) => state.user);

    const sortedByDateBookings = [...currentBookings].sort((bookingA, bookingB) => {
        const dateA = new Date(bookingA.date);
        const dateB = new Date(bookingB.date);
        return dateA - dateB;
    });

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    const handleCancelBooking = (bookingId) => {
        dispatch(deleteBooking({ token: token, bookingId: bookingId }))
            .unwrap()
            .then((fulfilledData) => {
                    dispatch(deleteItem(bookingId));
                    toast.success('Booking was successfully cancelled!');
                })
            .catch((error) => {
                toast.error('Error canceling the booking. Try again later.');
            });
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <>
            <Header fullName={user.user.fullName} onSignOut={handleSignOut} />
            <main className="bookings-page">
                <h1 className="visually-hidden">Travel App</h1>
                <ul className="bookings__list">
                    {sortedByDateBookings.map((booking, index) => {
                        return (
                            <BookingItem
                                title={booking.title}
                                guests={booking.guests}
                                date={formatDate(booking.date)}
                                totalPrice={booking.totalPrice}
                                handleCancelBooking={() => handleCancelBooking(booking.id)}
                                key={index}
                            />
                        );
                    })}
                </ul>
            </main>
            <Footer />
        </>
    );
}