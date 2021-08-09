import React from 'react';

export default function Pagination({ countriesPerPage, totalCountries, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCountries/ countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            {pageNumbers.map(n => (
                        <button onClick={() => paginate(n)}>
                            {n}
                        </button>    
                ))}    
        </nav>
    )
}