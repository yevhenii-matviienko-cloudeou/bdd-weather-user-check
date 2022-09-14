import { Identificators } from "../Identificators"; 

export default class WeatherContext {
    public identificator: string = Identificators.WeatherContext;
    
    public id: number = NaN;
    public ipAddress: string = '';
    public weatherTable = '';
    public lat: number = NaN;
    public lon: number = NaN;
    public table: string = '';

    public apparent_temperature: number = NaN;
    public cloudcover: number = NaN;
    public windspeed_10m: number = NaN;
    public shortwave_radiation: number = NaN;
    public sunrise: string = '';
    public sunset: string = '';

}