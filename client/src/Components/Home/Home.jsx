import React from 'react';
import Cards from '../Cards/Cards'
import Filters from '../Filters/Filters';
import SearchBar from '../SearchBar/SearchBar'
import { Link } from 'react-router-dom';
import s from '../Home/home.module.css'

export default function Home () {
    return (
        <div className={s.background}>
            <div className={s.containers}>
                <Link to="/addActivity" className={s.link}>
                    <h3 className={s.h3}>Add Activities</h3>
                </Link>
                <div className={s.search}>
                    <SearchBar />
                </div>
                <div>
                    <Filters />
                </div>
                <h1 className={s.text}>Countries App</h1>
                </div>
                <div>
                <Cards />
                </div>
            
        </div>
        
    )
}