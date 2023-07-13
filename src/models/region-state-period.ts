import { RegionState } from "./region-state";

/**
 * Contains region state for a specific period
 */
export interface RegionStatePeriod {
  /**
   * Region state in this period
   */
  state: RegionState;
  /**
   * Period starting time
   */
  from: Date;
  /**
   * Period end time
   */
  to: Date;
}
