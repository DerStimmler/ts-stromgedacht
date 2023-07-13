/** @internal */
export class ApiAddresses {
  private static readonly baseAddress = "https://api.stromgedacht.de/v1/";

  static now(zip: string): string {
    return `${this.baseAddress}/now?zip=${zip}`;
  }

  static states(zip: string, from: Date, to: Date): string {
    return `${
      this.baseAddress
    }/states?zip=${zip}&from=${from.toISOString()}&to=${to.toISOString()}`;
  }
}
