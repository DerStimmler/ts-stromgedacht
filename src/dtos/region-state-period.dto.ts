import { RegionState } from "../models";

/** @internal */
export interface RegionStatePeriodDto {
  state: RegionState;
  from: string;
  to: string;
}
