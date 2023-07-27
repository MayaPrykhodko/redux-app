import {Route, Routes, Navigate } from 'react-router-dom';
import Main from './Components/Main/Main';
import SignIn from './Components/SignIn/SinIn';
import SignUp from './Components/SignUp/SignUp';
import Bookings from './Components/Bookings/Bookings';
import TripDetails from './Components/TripDetails/TripDetails';
import paths from './enums/paths';

function App() {
  return (
    <Routes>
      <Route path={paths.MAIN} element={<Main />} />
      <Route path={paths.SIGN_IN} element={<SignIn />} />
      <Route path={paths.SIGN_UP} element={<SignUp />} />
      <Route path={paths.BOOKINGS} element={<Bookings />} />
      <Route path={`${paths.TRIP_DETAILS}/:id`} element={<TripDetails />} />
      <Route path={paths.OTHERS} element={<Navigate to={paths.MAIN} />} /> 
    </Routes>
  );
}

export default App;
