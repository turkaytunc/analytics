const createFileData = (items = []) => {
  const placeholder = {
    fileName: "unknown",
    fileLoadTime: 0,
    fileType: "script",
  };

  if (items.length < 1 || items == null) {
    return [placeholder];
  }

  const lastItem = items[items.length - 1];
  const files = lastItem?.files;

  return files ? files : [placeholder];
};

export default createFileData;
