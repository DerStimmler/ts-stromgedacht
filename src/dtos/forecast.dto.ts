import { ForecastValueDto } from "./forecast-value.dto";

/** @internal */
export interface ForecastDto {
  load: ForecastValueDto[];
  renewableEnergy: ForecastValueDto[];
  residualLoad: ForecastValueDto[];
  superGreenThreshold: ForecastValueDto[];
}
