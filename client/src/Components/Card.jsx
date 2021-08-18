import React from "react";
import { Link } from 'react-router-dom';

export default function Card ({id, name, continent, image_flag}){
    console.log('id',id)
    return (
        <div>
        <h2>{name}</h2>
         <div>
             <Link to={`/countries/${id}`}>
                 <img src={image_flag} alt="img not found" width="210px" height="200px" />
             </Link>
         </div>
         <h3>{continent}</h3>

        </div>
    )
}