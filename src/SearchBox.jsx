import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
import Alert from '@mui/material/Alert';

export default function SearchBox({updateinfo}){

    let[city,setcity]=useState("");
    let [error,seterror]=useState(false);

    const URL=import.meta.env.VITE_API_URL;
    const key=import.meta.env.VITE_API_KEY;

    let getWeatherInfo=async()=>{
        try{
            let response=await fetch(`${URL}?q=${city}&appid=${key}&units=metric`);
            let jsonResponse=await response.json();
            let result=
            {
                city:city,
                temp:jsonResponse.main.temp,
                tempmin:jsonResponse.main.temp_min,
                tempmax:jsonResponse.main.temp_max,
                humidity:jsonResponse.main.humidity,
                feelslike:jsonResponse.main.feels_like,
                weather:jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
    };

    let handlecity=(event)=>{
        setcity(event.target.value);
    };

    let handlesubmit=async(event)=>{
        try{
            event.preventDefault();
            console.log(city);
            setcity("");
            let newinfo=await getWeatherInfo();
            updateinfo(newinfo);
        }catch(err){
            seterror(true);
        }
    };


    return(
        <div className='SearchBox'>
            <form onSubmit={handlesubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handlecity}/>
            <br></br><br></br>
            <Button variant="contained" type='submit'>Submit</Button>
            {error&&<Alert severity="error">No Such Place in our API</Alert>}
            </form>
        </div>
    )
}
