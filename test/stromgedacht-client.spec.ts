import {
  forecastMock,
  noDataMock,
  nowMock,
  statesMock,
} from "./response-mocks";
import {
  Forecast,
  RegionState,
  RegionStatePeriod,
  stromgedachtClient,
} from "../src";

describe("StromgedachtClient", () => {
  it("now", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(nowMock),
      }),
    );

    const state = await stromgedachtClient.now("70173");

    expect(state).toBe(RegionState.Green);
  });

  it("states", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(statesMock),
      }),
    );

    const states = await stromgedachtClient.states(
      "70173",
      new Date("2023-05-14T00:00:00+02:00"),
      new Date("2023-05-20T23:59:59+02:00"),
    );

    expect(states).toBeTruthy();

    expectStates(states);
  });

  it("statesRelative", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(statesMock),
      }),
    );

    const states = await stromgedachtClient.statesRelative("70173", 24, 48);

    expect(states).toBeTruthy();

    expectStates(states);
  });

  it("NoData", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve(noDataMock),
      }),
    );

    const state = await stromgedachtClient.now("70170");

    expect(state).toBeNull();
  });

  it("ServerErrorNow", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    const state = await stromgedachtClient.now("server-error");

    expect(state).toBeNull();
  });

  it("ServerErrorStates", async () => {
    globalThis.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    const states = await stromgedachtClient.states(
      "server-error",
      new Date(),
      new Date(),
    );

    expect(states).toHaveLength(0);
  });
});

it("forecast", async () => {
  globalThis.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(forecastMock),
    }),
  );

  const forecast = await stromgedachtClient.forecast(
    "70173",
    new Date("2023-05-14T00:00:00+02:00"),
    new Date("2023-05-20T23:59:59+02:00"),
  );

  expect(forecast).toBeTruthy();

  expectForecast(forecast!);
});

const expectStates = (states: RegionStatePeriod[]) => {
  expect(states).toHaveLength(5);

  expect(states[0].state).toBe(RegionState.Green);
  expect(states[0].from).toStrictEqual(new Date("2023-05-14T00:00:00+02:00"));
  expect(states[0].to).toStrictEqual(new Date("2023-05-14T23:59:59+02:00"));

  expect(states[1].state).toBe(RegionState.Yellow);
  expect(states[1].from).toStrictEqual(new Date("2023-05-15T00:00:00+02:00"));
  expect(states[1].to).toStrictEqual(new Date("2023-05-15T23:59:59+02:00"));

  expect(states[2].state).toBe(RegionState.Orange);
  expect(states[2].from).toStrictEqual(new Date("2023-05-16T00:00:00+02:00"));
  expect(states[2].to).toStrictEqual(new Date("2023-05-16T23:59:59+02:00"));

  expect(states[3].state).toBe(RegionState.Red);
  expect(states[3].from).toStrictEqual(new Date("2023-05-17T00:00:00+02:00"));
  expect(states[3].to).toStrictEqual(new Date("2023-05-17T23:59:59+02:00"));

  expect(states[4].state).toBe(RegionState.SuperGreen);
  expect(states[4].from).toStrictEqual(new Date("2023-05-18T00:00:00+02:00"));
  expect(states[4].to).toStrictEqual(new Date("2023-05-20T23:59:59+02:00"));
};

const expectForecast = (forecast: Forecast) => {
  expect(forecast.load).toHaveLength(2);
  expect(forecast.renewableEnergy).toHaveLength(2);
  expect(forecast.residualLoad).toHaveLength(2);
  expect(forecast.superGreenThreshold).toHaveLength(2);

  expect(forecast.load[0].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 0, 0)),
  );
  expect(forecast.load[0].value).toBe(8453.12);
  expect(forecast.load[1].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 1, 0)),
  );
  expect(forecast.load[1].value).toBe(8455);

  expect(forecast.renewableEnergy[0].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 0, 0)),
  );
  expect(forecast.renewableEnergy[0].value).toBe(8453.12);
  expect(forecast.renewableEnergy[1].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 1, 0)),
  );
  expect(forecast.renewableEnergy[1].value).toBe(8455);

  expect(forecast.residualLoad[0].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 0, 0)),
  );
  expect(forecast.residualLoad[0].value).toBe(8453.12);
  expect(forecast.residualLoad[1].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 1, 0)),
  );
  expect(forecast.residualLoad[1].value).toBe(8455);

  expect(forecast.superGreenThreshold[0].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 0, 0)),
  );
  expect(forecast.superGreenThreshold[0].value).toBe(8453.12);
  expect(forecast.superGreenThreshold[1].dateTime).toStrictEqual(
    new Date(Date.UTC(2023, 4, 14, 0, 1, 0)),
  );
  expect(forecast.superGreenThreshold[1].value).toBe(8455);
};
