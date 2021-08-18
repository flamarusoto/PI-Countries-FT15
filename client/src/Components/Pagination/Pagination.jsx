import React from 'react';
import s from '../Pagination/Pagination.module.css'

// import { Chevron_circle_left } from '@fortawesome/react-fontawesome';

export default function Pagination({ countriesPerPage, totalCountries, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCountries/ countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={s.container}>
           
            {pageNumbers.map(n => (
                 
                        <button className={s.button} onClick={() => paginate(n)}>
                            {n}
                        </button>    
            
                ))}    
            
               
        </div>
    )
}