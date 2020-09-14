import React,{Component} from 'react';
import CitiesJson from '../Util/CitiesJson';
import ReactHtmlParser from 'react-html-parser';
import '../App.css';
class SearchCities extends Component{
    constructor(){
        super();
        this.state = {
            citiesArray:null,
            userInput:'',
            html:`<li>Start Typing</li>`
        }
    }
    componentDidMount() {
        if (!this.state.citiesArray) {
            CitiesJson().then(result => 
                    this.setState({ 
                        citiesArray:result.data 
                    })
                )
                //.catch(err => {  });
        }
    }
    titleCase = (stringWords)=>{
        return stringWords.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }
    displayDynamicCityList = (event) => {
        let dynamicHtml = `<li>Start Typing</li>`;

        const matchWord = (this.state.userInput).trim();

        let matchedArray = this.findMatches(matchWord);

        if (matchWord !== '' && matchedArray.length) {

            dynamicHtml = matchedArray.map((entry) => {
                const regex = new RegExp(matchWord, 'gi');

                const cityName = entry.city.replace(regex, `<span class='highLight'>${this.titleCase(matchWord)}</span>`);

                return `<li>
                    <span class='city'>${cityName}, ${entry.state}</span> </br>
                    <span class='city-data'>
                        Population: ${entry.population}</br>
                        Growth from 2000 to 2013: ${entry.growth_from_2000_to_2013} </br>
                        Latitude: ${entry.latitude} </br>
                        Longitude: ${entry.longitude} </br>
                    </span>
                </li>`
            }).join('');
        }

        this.setState({
            userInput: event.target.value,
            html: dynamicHtml
        })
    }

    findMatches = (matchWord) => {
        const isCharacter = /^[a-zA-Z ]+$/.test(matchWord);
        return isCharacter ? this.state.citiesArray.filter(entry => {
            const regex = new RegExp(matchWord, 'gi');
            return entry.city.match(regex)
        }) : [];
    }

    render(){
        return(
            <div style={{margin:"0 auto"}}>
                <form 
                    action=""
                    id="search"
                    className="search-form"
                    autoComplete="off"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label 
                        htmlFor="cityName"
                        aria-label="Enter Country or Zone name"
                        className="sr-only">Enter City Name
                    </label>
                    <input 
                        className="search"
                        type="text" 
                        id="cityName" 
                        value={this.state.userInput}
                        placeholder="Enter City Name"
                        onChange={this.displayDynamicCityList}
                        onKeyUp={this.displayDynamicCityList}
                    />
                    <div className="city-list-container">
                        <ul className="search-results" >
                            {ReactHtmlParser(this.state.html)}
                        </ul>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchCities;
