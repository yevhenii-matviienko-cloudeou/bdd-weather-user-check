import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import ErrorContext from '../../contexts/bdd-weater-for-user/ErrorContext';
import WeatherContext from '../../contexts/bdd-weater-for-user/WeatherContext';
import { finishProcessForTableQuery } from '../../../bdd-src/db/db-queries';


type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
  ) => void;

export const commonSteps = ({given, when, and, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext => 
        featureContext().getContextById(Identificators.ErrorContext);
    const weatherContext = (): WeatherContext => 
        featureContext().getContextById(Identificators.WeatherContext);

    when(/^finish process for (.*)$/, async (tableName: string) => {
        try {
            const primaryKey = weatherContext().id;
            const errorText = errorContext().error;
            console.log(`Finishing process for ${tableName}, row id ${primaryKey}. \n Writing error: ${errorText}`);
            console.dir(await postgresQueryExecutor(finishProcessForTableQuery(primaryKey, tableName, errorText)));
        } catch (error) {
            console.log(error);
        }
    });

}

