import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getCountries, addActivity, clear, getActivities } from '../Redux/Actions';

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector(state => state.countries);
    const activities = useSelector((state) => state.activities);

    const [error, setError] = useState({}); 
    const [input, setInput] = useState({ 
      name: '',             
      difficulty: '',       
      season: '',
      duration: '',
      country: [],
    });                      
    //-----------------USE EFFECT (cada vez q se pinta)------                          
    useEffect(()=>{
        dispatch(getCountries())
    }, [dispatch])

    useEffect(()=>{
        if(!input.name){
            setError({...error,name:'name is required'})
        }
        else if (input.countries===[]){
            setError({...error, country: 'country is required'})
        }
        else if(input.countries.length > 0){
            setError({})
        }    
    }, [input])
    //--------------HANDLERS------------
    const handleCountry = (e) => {
        setInput(countries.find((el) => el.name === e.target.value));
    }

    const handleCountryAdd = (e) =>{
        e.preventDefault();
        setInput((prev) => ({ ...prev, country: [...prev.country, e.target.value] }))
        // setInput();
        let inputId = document.getElementById("dataInput");
        inputId.value = "";
    }

    const handleName = (e) => {
        setInput({...input, nombre:e.target.value})
    }
    const handleDuration = (e) => {
        setInput({...input, duration:e.target.value})
    }
    const handleDifficulty = (e) => {
        setInput({...input, difficulty:e.target.value})
    }
    const handleSeason = (e) => {
        setInput({...input, season:e.target.value})
    }
    const removeCountry = (c) => {
        setInput((prev) => ({ ...prev, country: prev.country.filter(countries => countries !== c) }))
    }
    const handlerSubmit = async (e) => {
        console.log('submit', handlerSubmit)
        e.preventDefault();
        if(!error.name && !error.country){
            await axios.post('http://localhost:3001/activity', input)
            .then(res => {
                setInput({
                    name:'',
                    difficulty:'',
                    season:'',
                    duration:'',
                    country:[]
                })
            })
        } else {alert('something went wrong')}
        // dispatch(clear());
        history.push('/countries');  
    }

    return(
        <div>
            <form onSubmit={(e) => handlerSubmit (e)}>
            <h1>Add Touristic Activity</h1>

            <label for="name">Name(*):</label>
            <input type="text" placeholder="Name of activity" onChange={(e) =>handleName(e)} />

            <label>Duration:</label>
            <input type="number" placeholder="Duration time" min="1" onChange={(e) => handleDuration(e)} />

            <label for="difficulty">Difficulty:</label> 
            <select onChange={(e) => handleDifficulty(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>

            <label>Season:</label> 
            <select onChange={(e) => handleSeason(e)}>
                <option>Station in which it takes place?</option>
                <option value='Summer'>Summer</option>
                <option value='Winter'>Winter</option>
                <option value='Autumn'>Autumn</option>
                <option value='Spring'>Spring</option>
            </select>

            <input
                type="text"
                list="data"
                id="dataInput"
                placeholder="Select country..."
                onChange={(e) => handleCountry(e)}/>

            <datalist id="data">
                {countries &&
                  countries
                    .filter((el) => !countries.includes(el))
                    .sort((a, b) => {
                      if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((country) => {
                      return <option key={country.id} value={country.name} />;
                    })}
            </datalist>    

            <button onClick={(e) => handleCountryAdd(e)}>+</button>

            <div>
            {countries.length > 0 &&
                countries
                  .sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                    })
                    .map((el) => {
                    return (
                      <div>
                        <span>{el.name} </span>
                        <button
                          type="button"
                          onClick={() => removeCountry(el)}>X</button>
                      </div>
                    );
                  })}
            </div>
            <button type="submit">Add Activity</button>

            </form>
            <NavLink to="/countries">
            <button>Back</button>
            </NavLink>
        </div>
    )
}