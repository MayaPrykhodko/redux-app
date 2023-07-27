import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import { useParams } from 'react-router-dom';
import trips from '../../data/trips';
import '../../styles/TripDetails.scss';
import validateModal from '../helpers/validateModal';
import Modal from '../Blocks/Modal';


export default function TripDetails() {

    const { id } = useParams();
    const trip = trips.find((trip) => trip.id === id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const initialValues = {
        date: "",
        guests: "1"
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [totalValue, setTotalValue] = useState(trip.price);

    useEffect(() => {
        const guests = formValues.guests || 1;
        setTotalValue(guests * trip.price);
    }, [formValues.guests, trip.price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmitBooking = (e) => {
        e.preventDefault();
        setFormErrors(validateModal(formValues));
        setIsSubmit(true);

        const errors = validateModal(formValues);
        if (Object.keys(errors).length === 0) {
            const bookingData = {
                title: trip.title,
                guests: formValues.guests,
                date: formValues.date,
                totalPrice: totalValue,
              };
              const existingBookings = JSON.parse(sessionStorage.getItem('bookings')) || [];
              const updatedBookings = [...existingBookings, bookingData];
              sessionStorage.setItem('bookings', JSON.stringify(updatedBookings));

            setFormValues(initialValues);
            setIsModalOpen(false);
        }
    }

    return (
        <>
            <Header />
            <main className="trip-page">
                <h1 className="visually-hidden">Travel App</h1>
                <div className="trip">
                    <img
                        data-test-id="trip-details-image"
                        src={trip.image}
                        className="trip__img"
                        alt="trip_photo"
                    />
                    <div className="trip__content">
                        <div className="trip-info">
                            <h3 data-test-id="trip-details-title" className="trip-info__title">
                                {trip.title}
                            </h3>
                            <div className="trip-info__content">
                                <span
                                    data-test-id="trip-details-duration"
                                    className="trip-info__duration"
                                >
                                    <strong>{trip.duration}</strong> days
                                </span>
                                <span data-test-id="trip-details-level" className="trip-info__level">
                                    {trip.level}
                                </span>
                            </div>
                        </div>
                        <div
                            data-test-id="trip-details-description"
                            className="trip__description"
                        >
                            {trip.description}
                        </div>
                        <div className="trip-price">
                            <span>Price</span>
                            <strong
                                data-test-id="trip-details-price-value"
                                className="trip-price__value"
                            >
                                {trip.price} $
                            </strong>
                        </div>
                        <button
                            data-test-id="trip-details-button"
                            className="trip__button button"
                            onClick={handleOpenModal}
                        >
                            Book a trip
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
            <Modal
                trip={trip}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                formValues={formValues}
                formErrors={formErrors}
                isSubmit={isSubmit}
                totalValue={totalValue}
                handleChange={handleChange}
                handleSubmitBooking={handleSubmitBooking} 
                />
        </>
    );
}

