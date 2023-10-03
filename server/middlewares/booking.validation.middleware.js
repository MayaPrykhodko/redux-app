import { ValidationMiddlewareError } from "./validation.middleware.error.js";

const guestsMax = 10;

const validateDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
    const formattedCurrentDate = currentDate.toLocaleDateString('en-GB', options);


    if (formattedSelectedDate === formattedCurrentDate) {
        return new ValidationMiddlewareError('Date is not available. Please, choose date since tomorrow');
    } else if (selectedDate < currentDate) {
        return new ValidationMiddlewareError('Period is not available');
    }
}

const validateGuests = (guests) => {
    if (guests < guestsMax) {
        return null;
      } else {
        return new ValidationMiddlewareError('Number of guests can be from 1 to 10');
      }
}

function setError(error, res, req) {
    if (error) {
        res.err = error;
        req.valid = false;
    } else {
        req.valid = true;
    }
}

const createBookingValid = async (req, res, next) => {
    const { date, guests } = req.body;
    let error;

    if (!date) {
        error = new ValidationMiddlewareError('Date is required field');
    }

    error = error || validateDate(date) || validateGuests(guests);

    setError(error, res, req)
    next();
};


export { createBookingValid };
