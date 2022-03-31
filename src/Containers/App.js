import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
// import {robots} from './robots';

class App extends Component {
constructor() {
    super();
    this.state = {
        robots: [],
        searchfield: '',
        filteredRobots: []
    }
    console.log('construtor')
}

componentDidMount(){

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        return response.json();
    }).then(users => {
        this.setState({robots: users, filteredRobots: users})
    })
}

onSearchChange = (event) => {
    this.setState({
        serchfield: event.target.value,
        filteredRobots: this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
    })
}

render() {
    console.log('render')
    return (
        <div className='tc'>
            <h1>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                <CardList robots={this.state.filteredRobots}/>
                </ErrorBoundry>                
            </Scroll>            
        </div>    
    );
}    
}

export default App;