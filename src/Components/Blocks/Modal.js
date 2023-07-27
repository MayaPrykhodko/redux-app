import React from 'react';

const Modal =(props) => {
return (
    <div hidden={!props.isModalOpen}>
    <div className="modal">
        <div data-test-id="book-trip-popup" className="book-trip-popup">
            <button
                data-test-id="book-trip-popup-close"
                className="book-trip-popup__close"
                onClick={props.handleCloseModal}
            >
                ×
            </button>
            <form className="book-trip-popup__form" autoComplete="off" onSubmit={props.handleSubmitBooking}>
                <div className="trip-info">
                    <h3 data-test-id="book-trip-popup-title" className="trip-info__title">
                        {props.trip.title}
                    </h3>
                    <div className="trip-info__content">
                        <span
                            data-test-id="book-trip-popup-duration"
                            className="trip-info__duration"
                        >
                            <strong>{props.trip.duration}</strong> days
                        </span>
                        <span
                            data-test-id="book-trip-popup-level"
                            className="trip-info__level"
                        >
                            {props.trip.level}
                        </span>
                    </div>
                </div>
                <label className="input">
                    <span className="input__heading">Date</span>
                    <p>{props.isSubmit && props.formErrors.date}</p>
                    <input
                        data-test-id="book-trip-popup-date"
                        name="date"
                        type="date"
                        required
                        onChange={props.handleChange}
                        value={props.formValues.date}
                    />
                </label>
                <label className="input">
                    <span className="input__heading">Number of guests</span>
                    <p>{props.isSubmit && props.formErrors.guests}</p>
                    <input
                        data-test-id="book-trip-popup-guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="10"
                        value={props.formValues.guests}
                        required
                        onChange={props.handleChange}
                    />
                </label>
                <span className="book-trip-popup__total">
                    Total:
                    <output
                        data-test-id="book-trip-popup-total-value"
                        className="book-trip-popup__total-value"
                    >
                        {props.totalValue}$
                    </output>
                </span>
                <button
                    data-test-id="book-trip-popup-submit"
                    className="button"
                    type="submit"
                >
                    Book a trip
                </button>
            </form>
        </div>
    </div>
</div>
);
}

export default Modal;