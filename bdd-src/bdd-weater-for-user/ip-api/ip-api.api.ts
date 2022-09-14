import { envConfig } from "../../env-config";
import { axiosInstance } from "../axiosinstance";

export default class IpApiClient {
    constructor () {}

    public async getIpLocation(ipAddress: string): Promise<{lat: number, lon: number}> {
        try {
            console.log(`Ip address for getting location is: ${ipAddress}`);
            const response: {[key: string]: any} = await axiosInstance({
                method: "GET",
                url: `${envConfig.ipApi.baseUrl}/${ipAddress}?fields=${envConfig.ipApi.urlSettings}`
            });
            const coordinates = {lat: response.data?.lat, lon: response.data?.lon};
            console.log(`Got coordinates. Lat: ${coordinates.lat}, Lon: ${coordinates.lon}`);
            return coordinates;
        } catch (error) {
            const errorText = `Error while getting location for ip address: ${ipAddress} \n ${JSON.stringify(error)}`;
            console.log(errorText);
            throw new Error(errorText);
        }      
    }
}