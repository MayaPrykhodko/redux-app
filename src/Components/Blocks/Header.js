import React from 'react';
import briefcase from '../../images/briefcase.svg';
import user from '../../images/user.svg';
import paths from '../../enums/paths';


const Header = (props) => {
    
    const navStyle = {
        display: props.display || 'block', 
    }

    return (
        <header className="header">
            <div className="header__inner">
                <a data-test-id="header-logo" href="/" className="header__logo">
                    Travel App
                </a>
                <nav data-test-id="header-nav" className="header__nav" style={navStyle}>
                    <ul className="nav-header__list">
                        <li className="nav-header__item" title="Bookings">
                            <a
                                data-test-id="header-bookings-link"
                                href={paths.BOOKINGS}
                                className="nav-header__inner"
                            >
                                <span className="visually-hidden">Bookings</span>
                                <img src={briefcase} alt="bookings" />
                            </a>
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
                                        John Doe
                                    </li>
                                    <li className="profile-nav__item">
                                        <a
                                            data-test-id="header-profile-nav-sign-out"
                                            href={paths.SIGN_IN}
                                            className="profile-nav__sign-out button"
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