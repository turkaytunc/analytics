const formatData = (items) => {
  return items.map((item) => {
    return {
      fcp: item.fcp,
      ttfb: item.ttfb,
      DOMLoadTime: item.DOMLoadTime,
      windowLoadTime: item.windowLoadTime,
      createdAt: item.createdAt,
      files: item.files.map((file) => {
        return {
          fileName: file.fileName,
          fileType: file.fileType,
          fileLoadTime: file.fileLoadTime,
        };
      }),
    };
  });
};

module.exports = formatData;
