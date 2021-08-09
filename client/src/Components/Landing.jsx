import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Landing () {
    return (
        <div>
            <h1>Countries App</h1>
            <NavLink to="/countries">
                <button>Welcome</button>
            </NavLink>
        </div>
    )
}