import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { searchByName } from '../Redux/Actions';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(searchByName(name));
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