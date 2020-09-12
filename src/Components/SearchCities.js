import React,{Component} from 'react';
import CitiesJson from '../Util/CitiesJson';
import ReactHtmlParser from 'react-html-parser';

class SearchCities extends Component{
    constructor(){
        super();
        this.state = {
            citiesArray:null,
            userInput:'',
            html:`<li>City</li>
                <li>Population</li>
                <li>Growth</li>
                <li>Latitude</li>
                <li>Longitude</li>`
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
    displayDynamicCityList = (event) => {
        let dynamicHtml = `<li>City</li>
                <li>Population</li>
                <li>Growth</li>
                <li>Latitude</li>
                <li>Longitude</li>`;
        // get rid of extra space in string
        const matchWord = (this.state.userInput).trim();
        // get array of matched values
        let matchedArray = this.findMatches(matchWord);
        // check if there is any array returned
        if (matchWord !== '' && matchedArray.length) {
            // map the values by wrapping them in semantic html tags
            dynamicHtml = matchedArray.map((entry) => {
                return `<li><span class='zone'>${entry.city}</span></li>`
            }).join('');
        }

        this.setState({
            userInput: event.target.value,
            html: dynamicHtml
        })
    }
    // checks for each item in the time Zone List from timezonedb.com
    // @params: matchWord - the word in input field to be matched
    findMatches = (matchWord) => {
        // first check if the word to find has all characters or a space
        const isCharacter = /^[a-zA-Z ]+$/.test(matchWord);
        return isCharacter ? this.state.citiesArray.filter(entry => {
            const regex = new RegExp(matchWord, 'gi');
            return entry.city.match(regex)
        }) : [];
    }
    render(){
        console.log(this.state.citiesArray);//this.getCityList);
        return(
            <div style={{margin:"0 auto",color:"red"}}>
                <form 
                    action=""
                    id="search"
                    className="search-form"
                    autoComplete="off"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <label 
                        htmlFor="search"
                        aria-label="Enter Country or Zone name"
                        className="sr-only">Enter City Name
                    </label>
                    <input 
                        className="search"
                        type="text" 
                        id="cityName" 
                        value={this.state.userInput}
                        placeholder="City Name"
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
