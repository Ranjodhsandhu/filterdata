import React,{Component} from 'react';
import './App.css';
import SearchCities from './Components/SearchCities';

class App extends Component{
  render(){
    return(
      <div className="App">
        <header>
          <h1>United States City Data Filter</h1>
        </header>
        <main>  
          <SearchCities />
        </main>
        <footer>
          <p>&copy; All rights reserved 2020</p>
        </footer>
      </div>
    )
  }
}
export default App;
