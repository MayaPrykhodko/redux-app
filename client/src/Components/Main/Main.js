import React from "react";
import {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import '../../styles/Main.scss';
import TripList from "../Blocks/TripList";
import paths from "../../enums/paths";
import { fetchUser } from '../../actions/fetchUser';
import { fetchTrips } from "../../actions/fetchTrips";


export default function Main() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token));
            dispatch(fetchTrips(token));
        } else {
            navigate(paths.SIGN_IN);
        }
    }, [dispatch, navigate, token]);

    const user = useSelector((state) => state.user);
    const trips = useSelector((state) => state.trips);

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [level, setLevel] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value);
        setIsSubmit(e.target.value !== "" || duration !== "" || level !== "");
    }

    const handleSelectDuration = (e) => {
        setDuration(e.target.value);
        setIsSubmit(name !== "" || e.target.value !== "" || level !== "");
    }

    const handleSelectLevel = (e) => {
        setLevel(e.target.value);
        setIsSubmit(name !== "" || duration !== "" || e.target.value !== "");
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
    };

    return (
        <>
            <Header fullName={user.user.fullName} onSignOut={handleSignOut} />
            <main >
                <h1 className="visually-hidden">Travel App</h1>
                <section className="trips-filter">
                    <h2 className="visually-hidden">Trips filter</h2>
                    <form className="trips-filter__form" autoComplete="off">
                        <label className="trips-filter__search input">
                            <span className="visually-hidden">Search by name</span>
                            <input
                                data-test-id="filter-search"
                                name="search"
                                type="search"
                                placeholder="search by title"
                                onChange={handleChange}
                                value={name}
                            />
                        </label>
                        <label className="select">
                            <span className="visually-hidden">Search by duration</span>
                            <select data-test-id="filter-duration" name="duration" onChange={handleSelectDuration} value={duration}>
                                <option value="">duration</option>
                                <option value="0_x_5">&lt; 5 days</option>
                                <option value="5_x_10">&lt; 10 days</option>
                                <option value="10_x">&ge; 10 days</option>
                            </select>
                        </label>
                        <label className="select">
                            <span className="visually-hidden">Search by level</span>
                            <select data-test-id="filter-level" name="level" onChange={handleSelectLevel} value={level}>
                                <option value="">level</option>
                                <option value="easy">easy</option>
                                <option value="moderate">moderate</option>
                                <option value="difficult">difficult</option>
                            </select>
                        </label>
                    </form>
                </section>
                <section className="trips">
                    <h2 className="visually-hidden">Trips List</h2>
                    <ul className="trip-list">
                        {isSubmit ? (<TripList title={name} duration={duration} level={level} trips={trips.trips} />) : (
                            <TripList trips={trips.trips} />
                        )}

                    </ul>
                </section>
            </main>
            <Footer />
        </>
    );
}