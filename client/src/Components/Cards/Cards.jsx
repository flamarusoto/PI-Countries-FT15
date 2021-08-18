import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Card from '../Card';
import Pagination from '../Pagination/Pagination';
import { getCountries } from '../../Redux/Actions';
import s from '../Cards/Cards.module.css'


export default function Home () {
    //me traigo el estado de los países
    const countries = useSelector(state => state.countries)

    const dispatch = useDispatch();

    //cambio de estado cada vez que se setea el estado del n° de pág.
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(9);
    //Paginacion
    const indexOfLastCountry = currentPage* countriesPerPage //9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //9 -9
    const currentCountries = countries?.slice(indexOfFirstCountry, indexOfLastCountry)

    useEffect(()=> {
        dispatch(getCountries())
    }, [dispatch])

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className={s.page}>
            <div className={s.cards}>
            {/* <Filters /> */}
            {currentCountries? currentCountries.map((ctry)=>{
                return(
                    <Card
                        id={ctry.id}
                        name={ctry.name}
                        image_flag={ctry.image_flag}
                        continent={ctry.continent}/>
                ) 
            }) : <h2>Loading..</h2>}
            </div>    
            <div>
        <Pagination paginate={paginate} countriesPerPage={countriesPerPage} totalCountries={countries?.length}/>
        </div>          
        </div>
    )
}