import { envConfig } from "../../env-config";

export class OpenMeteoPayloadGenerator {
    constructor () {}

    public generateRequestLinkForWeather(latitude: number, longitude: number): string {
        return `${envConfig.openMeteo.baseUrl}?latitude=${latitude}&longitude=${longitude}&${envConfig.openMeteo.urlSettings}`
    }
}