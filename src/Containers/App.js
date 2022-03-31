import React, { useState, useEffect } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
// import {robots} from './robots';

function App() {
    
    const [searchfield, setSearchField] = useState('');
    // const [filteredRobots, setFilteredRobots] = useState([]);
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        console.log('effect 1');
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            setRobots(users);
            // setFilteredRobots(users);
        })
    }, []);

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
        // setFilteredRobots(robots.filter(robots => {
        //     return robots.name.toLowerCase().includes(searchfield.toLowerCase())
        // }));
    };
    
    const filteredRobots = robots.filter(robots => {
        return robots.name.toLowerCase().includes(searchfield.toLowerCase())
    });

    return !robots.length ? <h1>Loading</h1> :(
        <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots}/>
                </ErrorBoundry>                
            </Scroll>            
        </div>    
    );   
}

export default App;