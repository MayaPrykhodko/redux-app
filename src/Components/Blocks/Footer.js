import React from 'react';
import heart from '../../images/heart.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer__text">
                from
                <a className="footer__link" href="#">
                    travel app
                </a>
                with
                <img className="footer__icon" src={heart} alt="heart" />
            </span>
        </footer>
    );
}

export default Footer;