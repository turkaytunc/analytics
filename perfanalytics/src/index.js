export function gatherAnalytics(postUrl = 'http://localhost:4000/analytics') {
  window.analytics = {
    currentUrl: window.location.href,
    fcp: 0,
    ttfb: 0,
    DOMLoadTime: 0,
    windowLoadTime: 0,
    analyticsStartTime: 0,
    files: [],
  };

  const getFirstContenfulPaintTime = () => {
    const paint = window.performance.getEntriesByType('paint');
    if (paint[1]?.startTime !== undefined) {
      window.analytics.fcp = paint[1]?.startTime;
    }
  };

  const getFilesLoadTimes = () => {
    const files = window.performance.getEntriesByType('resource');
    window.analytics.files = [];

    for (var file of files) {
      window.analytics.files.push({
        fileName: file.name,
        fileType: file.initiatorType,
        fileLoadTime: file.responseEnd / 1000,
      });
    }
  };

  const calculatePerformanceTiming = () => {
    const { responseStart, requestStart, navigationStart, domContentLoadedEventEnd } = window.performance.timing;

    const metrics = window.analytics;

    metrics.analyticsStartTime = new Date(navigationStart).toString();
    metrics.ttfb = (responseStart - requestStart) / 1000;
    metrics.DOMLoadTime = (domContentLoadedEventEnd - navigationStart) / 1000;
    metrics.windowLoadTime = (new Date().valueOf() - navigationStart) / 1000;
  };

  window.onload = () => {
    getFirstContenfulPaintTime();
    getFilesLoadTimes();
    calculatePerformanceTiming();
  };

  window.addEventListener('visibilitychange', () => {
    navigator.sendBeacon(`${postUrl}`, JSON.stringify(window.analytics));
  });
}
