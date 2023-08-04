import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import { useParams } from 'react-router-dom';
import '../../styles/TripDetails.scss';
import validateModal from '../helpers/validateModal';
import Modal from '../Blocks/Modal';
import { useSelector, useDispatch } from "react-redux";
import { fetchTripById } from '../../actions/fetchTripById';
import { fetchUser } from '../../actions/fetchUser';
import { useNavigate } from "react-router-dom";
import paths from "../../enums/paths";
import { bookTrip } from '../../actions/bookTrip';
import { toast } from 'react-toastify';


export default function TripDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token));
            dispatch(fetchTripById({ id: id, token: token }));
        } else {
            navigate(paths.SIGN_IN);
        }
    }, [dispatch, navigate, id, token]);

    const user = useSelector((state) => state.user);
    const selectedTrip = useSelector((state) => state.trips.selectedTrip);
    const loading  = useSelector((state) => state.bookings.loading);
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
    const [totalValue, setTotalValue] = useState(selectedTrip.price);

    useEffect(() => {
        const guests = formValues.guests || 1;
        setTotalValue(guests * selectedTrip.price);
    }, [formValues.guests, selectedTrip.price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setFormErrors(validateModal(formValues));
        setIsSubmit(true);

        const errors = validateModal(formValues);
        if (Object.keys(errors).length === 0) {
            const bookResponse = await dispatch(bookTrip({
                token: token, 
                tripId: selectedTrip.id, 
                userId: user.user.id, 
                guests:formValues.guests,
                date: formValues.date, 
            }));
            setFormValues(initialValues);
            if (bookResponse.meta.requestStatus === 'fulfilled') {
               toast.success('Booking is successful', {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
              }
           
            setIsModalOpen(false);
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <>
            <Header fullName={user.user.fullName} onSignOut={handleSignOut} />
            <main className="trip-page">
                <h1 className="visually-hidden">Travel App</h1>
                <div className="trip">
                    <img
                        data-test-id="trip-details-image"
                        src={selectedTrip.image}
                        className="trip__img"
                        alt="trip_photo"
                    />
                    <div className="trip__content">
                        <div className="trip-info">
                            <h3 data-test-id="trip-details-title" className="trip-info__title">
                                {selectedTrip.title}
                            </h3>
                            <div className="trip-info__content">
                                <span
                                    data-test-id="trip-details-duration"
                                    className="trip-info__duration"
                                >
                                    <strong>{selectedTrip.duration}</strong> days
                                </span>
                                <span data-test-id="trip-details-level" className="trip-info__level">
                                    {selectedTrip.level}
                                </span>
                            </div>
                        </div>
                        <div
                            data-test-id="trip-details-description"
                            className="trip__description"
                        >
                            {selectedTrip.description}
                        </div>
                        <div className="trip-price">
                            <span>Price</span>
                            <strong
                                data-test-id="trip-details-price-value"
                                className="trip-price__value"
                            >
                                {selectedTrip.price} $
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
                trip={selectedTrip}
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                formValues={formValues}
                formErrors={formErrors}
                isSubmit={isSubmit}
                totalValue={totalValue}
                handleChange={handleChange}
                handleSubmitBooking={handleSubmitBooking}
                loading={loading}
            />
        </>
    );
}

