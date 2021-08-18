import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { clear, searchByName } from '../../Redux/Actions';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log('name', handleInputChange)
    };
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(searchByName(name));
        dispatch(clear())
    }

    return(
        <div>
            <input
            type="text"
            placeholder="Search.."
            onChange={(e)=> {handleInputChange(e)}} />
            <button onClick={(e)=> {handleClick(e)}}>🔍</button>
        </div>
    )
}