import './App.css';
import React, {useState} from 'react';

const api = {
  key: "c82b1a94b8af19b14ef3e51c220c554d",
  base: "https://api.openweathermap.org/data/2.5/"
}
const n = new Date() 
const hourTime = {
  hour: n.getHours()
}


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}/weather?q=${city}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result =>{
        setCity('');
        setWeather(result);
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months =["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`

  }

  const timeBuilder = (t) => {
    let time = t.getHours();
    if (t.getHours() >= 0 && t.getHours() < 12){
      if (t.getMinutes() >=0 && t.getMinutes() < 10){
        return `${time}:0${t.getMinutes()} AM`
      }
      else{
        return `${time}:${t.getMinutes()} AM`
      }
        
    }
    else{
      if (t.getMinutes() >=0 && t.getMinutes() < 10){
        return `${time}:0${t.getMinutes()} PM`
      }
      else{
        return `${time}:${t.getMinutes()} PM`
      }
    }
  }


  const weatherPic = (w) => {
    if (w === "Clouds"){
      return "./images/cloud.png";
    }
    else if (w === "Rain"){
      return "./images/rain.png";
    }
    else if (w === "Clear"){
      return "./images/Clear.png";
    }
    else if (w === "Snow"){
      return "./images/snow.png";
    }
    else if ( w=== "Mist"){
      return "./images/fog.jpg";
    }

  }


  return (
    <div className={ ((hourTime.hour >= 6 && hourTime.hour <= 18) ? 'appDay' : 'app')}>
      <main>
      <h1 className="title"> Weather Application {hourTime.hour} </h1>
      <div className="date"> Today is {dateBuilder(new Date())}</div>
      <div className="time"> It is currently {timeBuilder(new Date())} ET</div>
      <div className="searchBox">
        <input type="text-center" className="searchBar" placeholder="Type in City" onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={search}
        />
      </div>
      {(typeof weather.main != "undefined") ? (
      <div className="box">
        <div className="pictureBox">
          <div className="picture"><img src={weatherPic(weather.weather[0].main)} alt='' width="250" height="250"/></div>
        </div>
        <div className="locationBox">
          <div className="location"> {weather.name}, {weather.sys.country}  </div>
          <div className="temperature"> {Math.round(weather.main.temp)}°C</div>
          <div className="weather"> {weather.weather[0].main}</div>
        </div>
      </div>
      ) : ('')} 
      </main>
    </div>
  );
}



export default App;
