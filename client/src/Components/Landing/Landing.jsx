import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../Landing/landing.module.css'

export default function Landing () {
    return (
        <div className={s.landing}>
        <div className={s.container}>
            <h1 className={s.text}>Countries App</h1>
            <NavLink to="/countries">
                <button className={s.button}>Welcome</button>
            </NavLink>
        </div>
        </div>
       
    )
}