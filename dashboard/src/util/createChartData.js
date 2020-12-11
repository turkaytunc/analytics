const createChartData = (items = []) => {
  const data = {
    createdAt: [],
    fcp: [],
    ttfb: [],
    windowLoadTime: [],
    DOMLoadTime: [],
  };
  for (const item of items) {
    const date = new Date(item.createdAt);
    data.createdAt.push(
      `${date.getHours()}:${
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
      }`
    );
    data.fcp.push(item.fcp);
    data.ttfb.push(item.ttfb);
    data.DOMLoadTime.push(item.DOMLoadTime);
    data.windowLoadTime.push(item.windowLoadTime);
  }

  return data;
};

export default createChartData;
