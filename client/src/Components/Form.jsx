import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getCountries } from '../Redux/Actions';


export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector(state => state.countries);

    const [activities, setActivities] = useState([]);
    const [country, setCountry] = useState([]);
    const [input, setInput] = useState({ 
        name: '',             
        difficulty: '',       
        season: '',
        duration: '',
        country: [],
      });    
    
                              
    useEffect(()=>{
        dispatch(getCountries());
    }, [dispatch])

    const handleCountry = (e) => {
        setCountry(countries.find((el) => el.name === e.target.value));
    }

    //     function getOptions(arr) {
    //     // console.log(getOptions, 'get')
    //     let country = [];
    //     countries.filter((x)=>{
    //         if (x.id===arr){
    //             country.push(x.country)
    //         }
    //     })
    //     return country;
    // }
    const handleCountryAdd = (e) =>{
        e.preventDefault();
        if (country) {
            setActivities([...activities, country]);
        }
        setCountry();
        let inputId = document.getElementById("dataInput");
        inputId.value = "";
        setInput({...input, country})
    }

    const handleName = (e) => {
        setInput({...input, name:e.target.value})
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
    
    const removeCountry = (country) => {
        setActivities(activities.filter((el) => el !== country));
    }

    const handlerSubmit = async (e) => {
        console.log('submit', handlerSubmit)
        e.preventDefault();
        await axios.post('http://localhost:3001/activity', input);
        alert("The activity was added successfully");
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
                <option value='summer'>Summer</option>
                <option value='winter'>Winter</option>
                <option value='automn'>Autumn</option>
                <option value='spring'>Spring</option>
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
                    .filter((el) => !activities.includes(el))
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
            {activities &&
                activities
                    .map((el) => {
                    return (
                      <div>
                        <span>{el.name}</span>
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