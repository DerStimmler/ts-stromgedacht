# ts-stromgedacht

[![npm version](https://img.shields.io/npm/v/ts-stromgedacht)](https://www.npmjs.org/package/ts-stromgedacht/)
[![npm downloads](https://img.shields.io/npm/dt/ts-stromgedacht)](https://www.npmjs.org/package/ts-stromgedacht/)
![build](https://github.com/DerStimmler/ts-stromgedacht/actions/workflows/build.yml/badge.svg)
[![codecov](https://codecov.io/gh/DerStimmler/ts-stromgedacht/branch/main/graph/badge.svg?token=458NYX5S9Z)](https://codecov.io/gh/DerStimmler/ts-stromgedacht)
[![GitHub license](https://img.shields.io/github/license/DerStimmler/ts-stromgedacht)](https://github.com/DerStimmler/ts-stromgedacht/blob/main/LICENSE.md)

Typescript library for using [StromGedacht](https://www.stromgedacht.de/) API

## Installation

Available on [npm](https://www.npmjs.org/package/ts-stromgedacht/).

```bash
npm install ts-stromgedacht
```

## Usage

The client can provide the region state at the current time or all states for a given time period.

The period may extend a maximum of 2 days into the future and 4 days into the past.

Each time you make a request, you will need to provide the zip code of the region for which you want to request the state.

Since the API allows all origins this library can be used in a browser without CORS errors.

### Initialization

Just import the client from your node_modules.

```typescript
import { stromgedachtClient } from "ts-stromgedacht";
```

### Get current state

You can fetch the current state of a region by calling the `Now` method and passing the zip code of the region.

```typescript
const state = await stromgedachtClient.now("70173");
```

If the api returns an error, this method returns `null`.
This could happen if the zip code is invalid / not supported.

### Get states for time period

You can fetch all states of a region for a specific time period by calling the `States` method and passing the zip code of the region, the start time and end time.

```typescript
const from = new Date("2023-01-01");
const to = new Date("2023-01-03");

const states = stromgedachtClient.states("70173", from, to);
```

If the api returns an error, this method returns an empty array.
This could happen if the zip code is invalid / not supported or the supported period is exceeded.

### API rate limits

The api is limited to about 6 requests per minute.

## Related

Here are some related projects:

- [StromGedacht.NET](https://github.com/DerStimmler/StromGedacht.NET): C# version of this library

## Shoutout

The used API is provided by [StromGedacht](https://www.stromgedacht.de), TransnetBW GmbH.
