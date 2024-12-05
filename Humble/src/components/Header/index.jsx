// import React from 'react';
import "./styles.css";

function Header() {
    function logoutfnc() {
        alert('logout');
    }
    return (
        <div className='navbar'>
            <p className="logo">Humble</p>
            <p className="logo link" onClick={logoutfnc}>Logout</p>
        </div>

    );
}

export default Header;