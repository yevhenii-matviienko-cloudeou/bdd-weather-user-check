export const envConfig = {
    envName: "dev",
    ipApi: {
        baseUrl: "http://ip-api.com/json/",
        urlSettings: "status,message,country,countryCode,region,regionName,city,lat,lon,query"
    },
    openMeteo: {
        baseUrl: "https://api.open-meteo.com/v1/forecast",
        urlSettings: "hourly=apparent_temperature,cloudcover,windspeed_10m,shortwave_radiation&daily=sunrise,sunset&timezone=auto"
    }
}