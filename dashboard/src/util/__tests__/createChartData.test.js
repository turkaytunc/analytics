import createChartData from "../createChartData";
import initialGraphState from "../initialGraphState";

const data = [
  {
    DOMLoadTime: 3.237,
    createdAt: "2020-12-12T08:09:56.399Z",
    fcp: 3291.060000003199,
    files: [
      {
        fileLoadTime: 3.104720000002999,
        fileName: "http://localhost:3000/static/js/bundle.js",
        fileType: "script",
      },
    ],
    ttfb: 2.721,
    windowLoadTime: 3.32,
  },
];

it("should work without parameters", () => {
  expect(createChartData()).toEqual(initialGraphState);
});

it("should return formatted data", () => {
  expect(createChartData(data)).toEqual({
    DOMLoadTime: [3.237],
    createdAt: ["11:09"],
    fcp: [3291.060000003199],
    ttfb: [2.721],
    windowLoadTime: [3.32],
  });
});
