import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getCountries } from '../../Redux/Actions';
import s from '../Form/Form.module.css'


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
        countryId: [],
      });    
    
                              
    useEffect(()=>{
        dispatch(getCountries());
    }, [dispatch])

    const handleCountry = (e) => {
    //   if (e.target.name === 'id') {
    //     setInput({
    //         ...input,
    //         country: [...input.country, e.target.value]
    //     });
    // }
      setCountry(countries.find((el) => el.name === e.target.value))
      // setInput({...input, countryId:[country.id]})
      console.log('setcountry', setCountry)
    }

    const handleCountryAdd = (e) =>{
        e.preventDefault();
        if (country) {
            setActivities([...activities, country]);
        }
        
        let inputId = document.getElementById("dataInput");
        inputId.value = "";
        console.log(country.id, 'countrid')
        setInput({...input, countryId:[country.id]})
        console.log('input', setInput)
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
    <div className={s.background}>
        <form onSubmit={(e) => handlerSubmit (e)} className={s.container}>
            <h1 className={s.title}>Add Touristic Activity</h1>
            <label for="name" className={s.text}>Name(*):</label>
            <input className={s.input} type="text" placeholder="Name of activity" onChange={(e) =>handleName(e)} />
            {/* {errors.name && (<p>{errors.name}</p>)} */}

            <label className={s.text}>Duration:</label>
            <input className={s.input} type="number" placeholder="Duration time" min="1" onChange={(e) => handleDuration(e)} />

            <label for="difficulty" className={s.text}>Difficulty:</label> 
            <select className={s.select} onChange={(e) => handleDifficulty(e)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            
            <label className={s.text}>Season(*):</label> 
            <select className={s.select} onChange={(e) => handleSeason(e)} required>
                <option>Station in which it takes place?</option>
                <option value='summer'>Summer</option>
                <option value='winter'>Winter</option>
                <option value='automn'>Autumn</option>
                <option value='spring'>Spring</option>
            </select>

            <input className={s.input}
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
                      return <option  key={country.id} value={country.name} />;
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