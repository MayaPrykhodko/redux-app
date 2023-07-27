const validateModal = (values) => {
    const errors = {};
    const currentDate = new Date();
    const selectedDate = new Date(values.date);
    const options = {    
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    const formattedSelectedDate = selectedDate.toLocaleDateString('en-GB', options);
    const formattedCurrentDate = currentDate.toLocaleDateString('en-GB', options);


    if (!values.date) {
        errors.date = 'Date is required!';
    } else if (formattedSelectedDate === formattedCurrentDate) {
        errors.date = 'Date is not available. Please, choose date since tomorrow';
    }  else if (selectedDate < currentDate) {
        errors.date = 'Period is not available';
    }

    if (values.guests > 10) {
        errors.guests = 'Number of guests can be from 1 to 10';
    }
    return errors;
}
export default validateModal;