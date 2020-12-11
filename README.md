# :tada: PerfAnalytics

PerfAnalytics is an ecosystem which collects and criticizes web performance data.

---

## :package: window-perf-analytics library

<https://www.npmjs.com/package/window-perf-analytics>

### :clap: Bundle Size Under 3kb

![Bundle Size](https://github.com/turkaytunc/analytics/blob/main/static-files/library-size.png)

### :pencil: How to use library

### npm

```sh
npm i window-perf-analytics
```

### yarn

```sh
yarn add window-perf-analytics
```

```js
import { gatherAnalytics } from "window-perf-analytics";

const url = "http://localhost:4000/analytics"; // default post url for sending metrics
gatherAnalytics(url);
```

## Analytics API

- For gathering data:

  - POST /analytics

- For emitting analytics used websockets instead of get request.
- Websocket better fits for analytics broadcast api.

---

### :chart_with_upwards_trend: Dashboard graphs

![graph-1](https://github.com/turkaytunc/analytics/blob/main/static-files/graph-1.png)

![graph-2](https://github.com/turkaytunc/analytics/blob/main/static-files/graph-2.png)

## Overall Setup

## References

- <https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp>
- <https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp>
- <https://designingforperformance.com/basics-of-page-speed/>
- <https://www.tripadvisor.com/engineering/html5-navigation-timing/>
- <https://www.w3.org/webperf/>
