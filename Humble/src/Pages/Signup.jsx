// import React from 'react'
import Header from '../components/Header';
import SignupComponent from '../components/Signup/SignupComponent';

function Signup() {
    return (
        <>
            <Header />
            <div className='wrapper'>
                <SignupComponent />
            </div>
        </>
    );
}

export default Signup