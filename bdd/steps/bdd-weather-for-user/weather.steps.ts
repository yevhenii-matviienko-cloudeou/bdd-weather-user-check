import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import IpApiClient from '../../../bdd-src/bdd-weater-for-user/ip-api/ip-api.api';
import OpenMeteoClient from '../../../bdd-src/bdd-weater-for-user/open-meteo/open-meteo.api';
import ErrorContext from '../../contexts/bdd-weater-for-user/ErrorContext';
import WeatherContext from '../../contexts/bdd-weater-for-user/WeatherContext';
import { writeCoordinatesToWeatherQuery, writeWeatherForUserQuery } from '../../../bdd-src/db/db-queries';


type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
  ) => void;

export const weatherSteps = ({given, when, and, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext => 
        featureContext().getContextById(Identificators.ErrorContext);
    const weatherContext = (): WeatherContext => 
        featureContext().getContextById(Identificators.WeatherContext);
    
    const ipApiClient = new IpApiClient();
    const openMeteoClient = new OpenMeteoClient();

    given(/^(.*) for user weather is (.*)$/, (paramName: string, paramValue: any) => {
        console.log(`Setting context variable ${paramName} to value ${paramValue}`);
        switch (paramName) {
            case 'ip': return (weatherContext().ipAddress = paramValue)
            case 'table': return (weatherContext().table = paramValue)
            case 'id': return (weatherContext().id = paramValue)
        }
    });

    when('getting position for ip', async () => {
        console.log(`Getting position for ip: ${weatherContext().ipAddress}`);
        try {
            const ipAddress: string = weatherContext().ipAddress;
            const {lat, lon} = await ipApiClient.getIpLocation(ipAddress);
            weatherContext().lat = lat;
            weatherContext().lon = lon;
        } catch (error) {
            errorContext().error = <string>error;
        }
    });

    when('getting weather from user position', async () => {
        console.log(`Getting weather for position: lat - ${weatherContext().lat}, lon - ${weatherContext().lon}`);

        try {
            const lat: number = weatherContext().lat;
            const lon: number = weatherContext().lon;

            const {
                apparent_temperature,
                cloudcover,
                windspeed_10m,
                shortwave_radiation,
                sunrise,
                sunset
            } = await openMeteoClient.getWeatherLocation(lat, lon);

            console.log('apparent_temperature', apparent_temperature);
            console.log('sunset', sunset);

            weatherContext().apparent_temperature = apparent_temperature;
            weatherContext().cloudcover = cloudcover;
            weatherContext().windspeed_10m = windspeed_10m;
            weatherContext().shortwave_radiation = shortwave_radiation;
            weatherContext().sunrise = sunrise;
            weatherContext().sunset = sunset;
            
        } catch (error) {
            errorContext().error = <string>error;
        }
    });

    then(/^write location to db lat (.*) lon (.*)$/, async (latCol: string, lonCol: string) => {
        try {
            console.log(`Writing coordinates to DB`);
            await postgresQueryExecutor(
                writeCoordinatesToWeatherQuery(
                    weatherContext().id,
                    latCol,
                    lonCol,
                    weatherContext().lat,
                    weatherContext().lon
                )
            );
        } catch (error) {
            const errorText: string = `Error while writing coordinates to DB: ${JSON.stringify(error)}`;
            errorContext().error = errorText;
        }
    });

    then(/^write weather to db apparent_temperature (.*) cloudcover (.*) windspeed_10m (.*) shortwave_radiation (.*) sunrise (.*) sunset (.*)$/, async (
        apparentTemperatureCol: string, 
        cloudcoverCol: string,
        windspeedCol: string,
        shortwaveCol: string,
        sunriseCol: string,
        sunsetCol: string
        ) => {
        try {
            console.log(`Writing weather data to DB`);

            console.log(apparentTemperatureCol,
                cloudcoverCol,
                windspeedCol,
                shortwaveCol,
                sunriseCol,
                sunsetCol, '=========');

            console.log(weatherContext().apparent_temperature,
                weatherContext().cloudcover,
                weatherContext().windspeed_10m,
                weatherContext().shortwave_radiation,
                weatherContext().sunrise,
                weatherContext().sunset, '=========');
            
            await postgresQueryExecutor(
                writeWeatherForUserQuery(
                    weatherContext().id,
                    apparentTemperatureCol,
                    cloudcoverCol,
                    windspeedCol,
                    shortwaveCol,
                    sunriseCol,
                    sunsetCol,
                    
                    weatherContext().apparent_temperature,
                    weatherContext().cloudcover,
                    weatherContext().windspeed_10m,
                    weatherContext().shortwave_radiation,
                    weatherContext().sunrise,
                    weatherContext().sunset
                )
            );
        } catch (error) {
            const errorText: string = `Error while writing weather data to DB: ${JSON.stringify(error)}`;
            errorContext().error = errorText;
        }
    });

}