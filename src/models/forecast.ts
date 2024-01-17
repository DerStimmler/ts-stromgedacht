import { ForecastValue } from "./forecast-value";

/**
 * Forecast data for specific zip
 */
export interface Forecast {
  /**
   * Load
   */
  load: ForecastValue[];
  /**
   * Renewable Energy
   */
  renewableEnergy: ForecastValue[];
  /**
   * Residual Load
   */
  residualLoad: ForecastValue[];
  /**
   * Super Green Threshold
   */
  superGreenThreshold: ForecastValue[];
}
