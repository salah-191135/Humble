// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React from 'react';
import React, { useState } from 'react';

import './input.css';
function Input({ label, state, setState, placeholder, type }) {
    return (
        <div className='input-wrapper'>
            <label className='label-input'>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={state}
                className='custom-input'
                required
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    );
}

export default Input;