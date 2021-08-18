import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getDetail } from '../../Redux/Actions';
import { NavLink } from 'react-router-dom';

export default function CardDetail (props) {
    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(id, 'data')
    const country = useSelector(store => store.detail);
    
    console.log(country)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);

    return(
        <div>
            <div>
                <h2>{country.name}</h2>
                <img src={country.image_flag} alt="img not found" width="210px" height="200px" />
                <h4>Continent:</h4>
                <p>{country.continent}</p>
                <h4>Capital:</h4>
                <p>{country.capital}</p>
                <h4>Subregion:</h4>
                <p>{country.subregion}</p>
                <h4>Area:</h4>
                <p>{country.area}</p>
                <h4>Population:</h4>
                <p>{country.population}</p>
            </div>
            <div>
            <NavLink to="/countries">
                <button>Back</button>
            </NavLink>
            </div>
        </div>
    )
}