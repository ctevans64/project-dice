import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import {Link, useLocation} from 'react-router-dom'



function Header() {
    let match = useLocation().pathname;

    let activeLink = "nav-link px-2 text-white";
    let otherLink = "nav-link px-2 text-secondary";

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <FontAwesomeIcon icon={faDice} />
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className={("/" === match) ? activeLink : otherLink}>Home</Link></li>
                        <li><Link to="/create" className={("/create" === match) ? activeLink : otherLink}>Create Set</Link></li>
                        <li><Link to="/browse" className={("/browse" === match) ? activeLink : otherLink}>Browse Sets</Link></li>
                    </ul>

                    {/*<div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                        <button type="button" className="btn btn-warning">Sign-up</button>
                    </div>*/}
                </div>
            </div>
        </header>
    );
}

export default Header;
