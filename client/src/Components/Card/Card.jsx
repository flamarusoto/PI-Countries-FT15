import React from "react";
import s from '../Cards/Cards.module.css'
import { Link } from 'react-router-dom';

export default function Card ({id, name, continent, image_flag}){
    console.log('id',id)
    return (
        <div className={s.container}>
        <h2 className={s.name}>{name}</h2>
         <div>
             <Link to={`/countries/${id}`}>
                 <img src={image_flag} alt="img not found" width="210px" height="200px" />
             </Link>
         </div>
         <h3 className={s.continent}>{continent}</h3>

        </div>
    )
}