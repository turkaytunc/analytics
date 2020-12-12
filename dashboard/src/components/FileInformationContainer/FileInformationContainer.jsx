import React from "react";
import SingleFile from "./SingleFile/SingleFile";

const FileInformationContainer = ({ files }) => {
  return (
    <div>
      {files.map((e) => (
        <SingleFile key={Math.random()} file={e} />
      ))}
    </div>
  );
};

export default FileInformationContainer;
