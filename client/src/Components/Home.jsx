import React from 'react';
import Cards from './Cards';
import SearchBar from './SearchBar';

export default function Home () {
    return (
        <div>
        <SearchBar />
        <h1>Countries App</h1>
        <Cards />
        </div>
    )
}