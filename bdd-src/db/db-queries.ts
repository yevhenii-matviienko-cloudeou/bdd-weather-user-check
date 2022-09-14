export const writeCoordinatesToWeatherQuery = (
    weatherId: number,
    latCol: string,
    lonCol: string,
    lat: number,
    lon: number,
): string => `UPDATE weathers SET ${latCol}=${lat}, ${lonCol}=${lon} WHERE id=${weatherId}`;


export const writeWeatherForUserQuery = (
    weatherId: number,
    apparentTemperatureCol: string,
    cloudcoverCol: string,
    windspeedCol: string,
    shortwaveCol: string,
    sunriseCol: string,
    sunsetCol: string,

    apparent_temperature: number,
    cloudcover: number,
    windspeed_10m: number,
    shortwave_radiation: number,
    sunrise: string,
    sunset: string
): string => { 
    const query = `UPDATE weathers SET 
                ${apparentTemperatureCol}=${apparent_temperature}, 
                ${cloudcoverCol}=${cloudcover},
                ${windspeedCol}=${windspeed_10m},
                ${shortwaveCol}=${shortwave_radiation},
                ${sunriseCol}='${sunrise}',
                ${sunsetCol}='${sunset}'
                WHERE id=${weatherId}`
            console.log('query', query);
            return query;
            };


export const finishProcessForTableQuery = (
    primaryKey: number, 
    tableName: string, 
    errorText: string | null
): string => `UPDATE ${tableName} SET
                processing=false, 
                processed=true,
                error='${errorText}',
                updated_date=now()
                WHERE id=${primaryKey}`;
