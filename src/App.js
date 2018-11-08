import React from "react";
import Titles from "./components/Titles.js";
import Form from "./components/Form.js";
import Weather from "./components/Weather.js";

// Personal API Key from api.openweathermap.org
const API_Key = "56d86cb13dcbe61184b88695bc68f570";

class App extends React.Component {

  // // Set up inititial state
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    main: undefined,
    error: undefined
  }

  // Create own method for API call to fetch data
  // Async await to make easy http calls
  getWeather = async (e) => {
    // Prevent default behavior of the component like full page refresh when button is pressed
    e.preventDefault();

    // "city", "country" variables grabs whatever is entered into the input
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const temperature = e.target.elements.country.value;

    // Create a variable that contains a function makes the call to the url
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}us&appid=${API_Key}&units=metric`);

    // Whatever we get back from "api_call" will get converted to json this method
    const data = await api_call.json();
    if (city && country) {
      console.log(data);
      // Describe your state values
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        main: data.weather[0].main,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        main: undefined,
        error: "Please enter the values.",
      });
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="col-xs-12 container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/> 
                  <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    main={this.state.main}
                    error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;