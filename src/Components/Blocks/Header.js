import React from 'react';
import briefcase from '../../images/briefcase.svg';
import user from '../../images/user.svg';
import paths from '../../enums/paths';
import { Link } from 'react-router-dom';


const Header = (props) => {

    const navStyle = {
        display: props.display || 'block',
    }

    return (
        <header className="header">
            <div className="header__inner">
                <Link data-test-id="header-logo" to="/" className="header__logo">
                    Travel App
                </Link>
                <nav data-test-id="header-nav" className="header__nav" style={navStyle}>
                    <ul className="nav-header__list">
                        <li className="nav-header__item" title="Bookings">
                            <Link
                                data-test-id="header-bookings-link"
                                to={paths.BOOKINGS}
                                className="nav-header__inner"
                            >
                                <span className="visually-hidden">Bookings</span>
                                <img src={briefcase} alt="bookings" />
                            </Link>
                        </li>
                        <li className="nav-header__item" title="Profile">
                            <div
                                data-test-id="header-profile-nav"
                                className="nav-header__inner profile-nav"
                                tabIndex="0"
                            >
                                <span className="visually-hidden">Profile</span>
                                <img src={user} alt="profile" />
                                <ul
                                    data-test-id="header-profile-nav-list"
                                    className="profile-nav__list"
                                >
                                    <li
                                        data-test-id="header-profile-nav-username"
                                        className="profile-nav__item profile-nav__username"
                                    >
                                        {props.fullName}
                                    </li>
                                    <li className="profile-nav__item">
                                        <a
                                            data-test-id="header-profile-nav-sign-out"
                                            href="/"
                                            className="profile-nav__sign-out button"
                                            onClick={props.onSignOut}
                                        >
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;