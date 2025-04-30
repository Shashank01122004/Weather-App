import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp(){
    const [weatherinfo,setweatherinfo]=useState({
        city:"Delhi",
        feelslike:24.84,
        temp:25.05,
        tempmin:25.05,
        tempmax:25.05,
        humidity:47,
        weather:"Haze",
    });

    let updateinfo=(newinfo)=>{
        setweatherinfo(newinfo);
    }

    return(
        <div style={{textAlign:"center"}}>
            <h2>Weather App</h2>
            <SearchBox updateinfo={updateinfo}/>
            <InfoBox info={weatherinfo}/>
        </div>
    )
}