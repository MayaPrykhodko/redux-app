import React from 'react';
import { useState } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import BookingItem from '../Blocks/BookingItem';


export default function Bookings() {

    const currentBookings = JSON.parse(sessionStorage.getItem('bookings')) || [];
    const [bookings, setBookings] = useState(currentBookings);


    const sortedByDateBookings = bookings.slice().sort((bookingA, bookingB) => {
        const dateA = new Date(bookingA.date);
        const dateB = new Date(bookingB.date);
        return dateA - dateB;
    });


    const handleCancelBooking = (index) => {
        const updatedBookings = [...bookings];
        updatedBookings.splice(index, 1);
        setBookings(updatedBookings);
        sessionStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }

    return (
        <>
            <Header />
            <main className="bookings-page">
                <h1 className="visually-hidden">Travel App</h1>
                <ul className="bookings__list">
                    {sortedByDateBookings.map((booking, index) => {
                        return (
                            <BookingItem
                                title={booking.title}
                                guests={booking.guests}
                                date={booking.date}
                                totalPrice={booking.totalPrice}
                                handleCancelBooking={() => handleCancelBooking(index)}
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