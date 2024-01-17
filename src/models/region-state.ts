/**
 * Describes different region states
 */
export enum RegionState {
  /**
   * Bring consumption forward - use electricity now
   */
  SuperGreen = -1,
  /**
   * Normal operation - nothing to do
   */
  Green = 1,
  /**
   * Bring consumption forward - use electricity now
   * @deprecated Use SuperGreen instead
   */
  Yellow = 2,
  /**
   * Reduce consumption to save costs and CO2
   */
  Orange = 3,
  /**
   * Reduce consumption to prevent power shortage
   */
  Red = 4,
}
