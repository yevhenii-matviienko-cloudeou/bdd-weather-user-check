import { envConfig } from "../../env-config";
import { axiosInstance } from "../axiosinstance";
import { OpenMeteoPayloadGenerator } from "./open-meteo.payload-generator";

export default class OpenMeteoClient {
    private _payloadGenerator: OpenMeteoPayloadGenerator;

    constructor () {
        this._payloadGenerator = new OpenMeteoPayloadGenerator;
    }

    public async getWeatherLocation(lat: number, lon: number): Promise<{[key: string]: any}> {
        try {
            console.log(`Coordinates for searching weather: lat - ${lat}, lon - ${lon}`);
            const response: {[key: string]: any} = await axiosInstance({
                method: "GET",
                url: this._payloadGenerator.generateRequestLinkForWeather(lat, lon)
            });
            
            const weatherData = response.data;

            console.log('Data weather => ', weatherData);
            

            const weatherObject = {
                apparent_temperature: weatherData.hourly.apparent_temperature[0], 
                cloudcover: weatherData.hourly.cloudcover[0],
                windspeed_10m: weatherData.hourly.windspeed_10m[0],
                shortwave_radiation: weatherData.hourly.shortwave_radiation[0],
                sunrise: weatherData.daily.sunrise[0],
                sunset: weatherData.daily.sunset[0]
            };
                        
            console.log(`Got weather object: ${weatherObject}`);
            
            return weatherObject;
        } catch (error) {
            const errorText = `Error while getting weather for coordinates: lat - ${lat}, lon - ${lon} \n ${JSON.stringify(error)}`;
            console.log(errorText);
            throw new Error(errorText);
        }      
    }
}