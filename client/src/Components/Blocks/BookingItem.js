import React from 'react';


const BookingItem = (booking) => {
    return (
      <li data-test-id="booking" className="booking">
        <h3 data-test-id="booking-title" className="booking__title">
          {booking.title}
        </h3>
        <span data-test-id="booking-guests" className="booking__guests">
          {booking.guests} guests
        </span>
        <span data-test-id="booking-date" className="booking__date">
          {booking.date}
        </span>
        <span data-test-id="booking-total" className="booking__total">
          {booking.totalPrice} $
        </span>
        <button
          data-test-id="booking-cancel"
          className="booking__cancel"
          title="Cancel booking"
          onClick={booking.handleCancelBooking}
        >
          <span className="visually-hidden">Cancel booking</span>
          ×
        </button>
      </li>
    );
  };

  export default BookingItem;