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

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [season, setSeason] = useState("");
    const [countriesActivities, setCountriesActivies] = useState([]);
    const [country, setCountry] = useState([]);
    
    //VIDEO 3 1.17.06 TIEMPO
    // useEffect(()=> {
    //     set
    // }) 
                              
    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const handleCountry = (e) => {
        setCountry(countries.find((el) => el.name === e.target.value));
    }

    const handleCountryAdd = (e) =>{
        e.preventDefault();
        if (country) {
        setCountriesActivies([...countriesActivities, country]);
        }
        setCountry();
        let input = document.getElementById("dataInput");
        input.value = "";
    }

    const handleName = (event) => {
        let provName = event.target.value;
        setName(provName);
    }
    const handleDuration = (event) => {
        setDuration(event.target.value);
    }
    const handleDifficulty = (event) => {
        let dif = event.target.value;
        setDifficulty(dif === "Difficulty" ? null : dif);
    }
    const handleSeason = (event) => {
        let seas = event.target.value;
        setSeason(seas === "Season" ? null : seas);
    }
    
    const removeCountry = (country) => {
        setCountriesActivies(countriesActivities.filter((el) => el !== country));
    }

    const handlerSubmit = async (e) => {
        console.log('submit', handlerSubmit)
        e.preventDefault();
        await axios.post('http://localhost:3001/activity', name, season, difficulty, duration, country)
        .then(() => {
            setCountry(),
            setDifficulty(),
            setDuration(),
            setName(),
            setSeason()
        })
        alert("The activity was added successfully");
        // dispatch(clear());
        history.push('/countries');  
    }

return(
    <div>
        <form onSubmit={(e) => handlerSubmit (e)}>
            <h1>Add Touristic Activity</h1>
            <label for="name">Name(*):</label>
            <input type="text" placeholder="Name of activity" onChange={(e) =>handleName(e)} />
            {/* {errors.name && (<p>{errors.name}</p>)} */}

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
            
            <label>Season(*):</label> 
            <select onChange={(e) => handleSeason(e)} required>
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
                onChange={(e) => handleCountry(e)}
              />
            <datalist id="data">
                {countries &&
                  countries
                    .filter((el) => !countriesActivities.includes(el))
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
            {countriesActivities &&
                countriesActivities
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