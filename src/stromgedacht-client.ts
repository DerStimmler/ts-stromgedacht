import { Forecast, RegionState, RegionStatePeriod } from "./models";
import { ApiAddresses } from "./utils/api-addresses";
import { ForecastDto } from "./dtos";

/**
 * Client for fetching StromGedacht API
 */
export class StromgedachtClient {
  /**
   * Get current region state
   * @param zip
   */
  public async now(zip: string): Promise<RegionState | null> {
    const uri = ApiAddresses.now(zip);

    const response = await fetch(uri);

    if (response.status !== 200) return null;

    const regionState = await response.json();

    return regionState.state;
  }

  /**
   * Get region states in a specific time period
   * @param zip
   * @param from
   * @param to
   */
  public async states(
    zip: string,
    from: Date,
    to: Date,
  ): Promise<RegionStatePeriod[]> {
    const uri = ApiAddresses.states(zip, from, to);

    const response = await fetch(uri);

    if (response.status !== 200) return [];

    const json = await response.json();

    return json.states.map((regionStatePeriod: RegionStatePeriod) => ({
      state: regionStatePeriod.state,
      from: new Date(regionStatePeriod.from),
      to: new Date(regionStatePeriod.to),
    }));
  }

  /**
   * Get region states in a specific time period
   * @param zip
   * @param hoursInPast
   * @param hoursInFuture
   */
  public async statesRelative(
    zip: string,
    hoursInPast: number,
    hoursInFuture: number,
  ): Promise<RegionStatePeriod[]> {
    const uri = ApiAddresses.statesRelative(zip, hoursInPast, hoursInFuture);

    const response = await fetch(uri);

    if (response.status !== 200) return [];

    const json = await response.json();

    return json.states.map((regionStatePeriod: RegionStatePeriod) => ({
      state: regionStatePeriod.state,
      from: new Date(regionStatePeriod.from),
      to: new Date(regionStatePeriod.to),
    }));
  }

  /**
   * Get forecast in a specific time period
   * @param zip
   * @param from
   * @param to
   */
  public async forecast(
    zip: string,
    from: Date,
    to: Date,
  ): Promise<Forecast | null> {
    const uri = ApiAddresses.forecast(zip, from, to);

    const response = await fetch(uri);

    if (response.status !== 200) return null;

    const dto = (await response.json()) as ForecastDto;

    return {
      load: dto.load.map((fv) => ({
        dateTime: new Date(fv.dateTime),
        value: fv.value,
      })),
      renewableEnergy: dto.renewableEnergy.map((fv) => ({
        dateTime: new Date(fv.dateTime),
        value: fv.value,
      })),
      residualLoad: dto.residualLoad.map((fv) => ({
        dateTime: new Date(fv.dateTime),
        value: fv.value,
      })),
      superGreenThreshold: dto.superGreenThreshold.map((fv) => ({
        dateTime: new Date(fv.dateTime),
        value: fv.value,
      })),
    };
  }
}
