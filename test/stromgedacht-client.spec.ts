import { StromgedachtClient } from "../src/stromgedacht-client";
import { noDataMock, nowMock, statesMock } from "./response-mocks";
import { RegionState } from "../src";

describe("StromgedachtClient", () => {
  it("now", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(nowMock),
      }),
    );

    const client = new StromgedachtClient();
    const state = await client.now("70173");

    expect(state).toBe(RegionState.Green);
  });

  it("states", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(statesMock),
      }),
    );

    const client = new StromgedachtClient();
    const states = await client.states(
      "70173",
      new Date("2023-05-14T00:00:00+02:00"),
      new Date("2023-05-20T23:59:59+02:00"),
    );

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

    expect(states[4].state).toBe(RegionState.Green);
    expect(states[4].from).toStrictEqual(new Date("2023-05-18T00:00:00+02:00"));
    expect(states[4].to).toStrictEqual(new Date("2023-05-20T23:59:59+02:00"));
  });

  it("NoData", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve(noDataMock),
      }),
    );

    const client = new StromgedachtClient();
    const state = await client.now("70170");

    expect(state).toBeNull();
  });

  it("ServerErrorNow", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    const client = new StromgedachtClient();
    const state = await client.now("server-error");

    expect(state).toBeNull();
  });

  it("ServerErrorStates", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
      }),
    );

    const client = new StromgedachtClient();
    const states = await client.states("server-error", new Date(), new Date());

    expect(states).toHaveLength(0);
  });
});
