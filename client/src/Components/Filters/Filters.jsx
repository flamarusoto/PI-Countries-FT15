import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clear, filterByContinent, getActivities, sortByAlphabet, sortByPopulation, getCountries, filterByActivity } from '../../Redux/Actions';

import s from '../Filters/Filters.module.css'

export default function Filters(){
    const dispatch = useDispatch();
    // const [activity, setActivity] = useState(null);
    const activities = useSelector(state => state.activities);

    useEffect(()=> {
        dispatch(getCountries())
        dispatch(getActivities())
        dispatch(clear())
    }, [dispatch]);


    const handleReset = (e) => {
        dispatch(getCountries(e.target.value))
        console.log(handleReset, 'reset')
    }
   
    const handlerAlphabet = (e)=> {
        dispatch(sortByAlphabet(e.target.value))
    }
    const handlerPopulation = (e) => {
        dispatch(sortByPopulation(e.target.value))
    };
    const handlerContinent = (e) => {
        dispatch(filterByContinent(e.target.value))
    }
    const handlerActivity = (e) => {
        dispatch(filterByActivity(e.target.value))
    }

    return(
        <div>
            <div>
            <div className={s.container}>
                <button onClick={handleReset}>Reset</button>
            </div>
            </div>
           
            <div className={s.container}>
            <h2 className={s.title}>Filter by Continent</h2>
                <select className={s.select} onChange={handlerContinent}>
                    <option value=''>None</option>
                    <option value='Asia'>Asia</option>
					<option value='Americas'>Americas</option>
					<option value='Europe'>Europe</option>
					<option value='Oceania'>Oceania</option>
					<option value='Africa'>Africa</option>
					<option value='Polar'>Polar</option>
                </select>
            </div>
            <div className={s.container}>
            <h2 className={s.title}>Filter by Activity</h2>
                <select className={s.select}  onChange={handlerActivity}>
					<option value="">Selection</option>			
					{ activities ? activities.map((e)=> {
                        return <option>{e.name}</option>
					}) 
	  				: <option>no activities</option> }
				</select>
            </div>
            <div className={s.container}>
            <h2 className={s.title}>Order by Alphabet</h2>
                <select className={s.select} id="order" onChange={handlerAlphabet}>
                    <option value="">All</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>
            <div className={s.container}>
            <h2 className={s.title}>Order by Population</h2>
                <select className={s.select} id="order" onChange={handlerPopulation}>
                    <option value="">All</option>
                    <option value="less">LessPopulation</option>
                    <option value="more">More Population</option>
                </select>
            </div>
        </div>
    )
}