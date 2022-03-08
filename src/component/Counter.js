import React, { useEffect, useState } from 'react';
import axios  from "axios";



const Counter = () => {       


   const [ weather , setweather ] = useState({})   

   const success = (pos) => {
      
     const key = '8fb4fa1c878ea9dde174b0bae9249d87'  
      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then(res => {
            setweather( res.data )
            setCelcius( res.data.main.temp )
        })
             
   }

   const [ celcius , setCelcius ] = useState(0)

  
   const changeCelcius = () => {
       setCelcius(  Math.round((celcius - 273,15)))
   }

   
   
   useEffect(() => {
    navigator.geolocation.getCurrentPosition(success) 
   },[])
   
   console.log(weather)
    
    return (
        <div className="counterClimate">
            
            <h1>Wheather App</h1>
              
            <h2>{weather?.name}</h2>
            <div className="temp">
                <div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <h2>{ Math.round(celcius - 273,15) } °C</h2>
                </div>
               
                <div>
                     <p><strong>Presion Atmosferica: </strong>{weather.main?.pressure} hPa</p>
                     <p><strong>Humedad: </strong>{weather.main?.humidity} %</p>
                </div>

                
            </div>
            <button onClick={changeCelcius}>Cambiar Fahrenheit °F</button>
        </div>
    );
};

export default Counter;
