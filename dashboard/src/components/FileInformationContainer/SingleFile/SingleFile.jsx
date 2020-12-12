import React from "react";
import "./singlefile.scss";

const SingleFile = ({ file }) => {
  return (
    <ul className="singlefile-container">
      <li key={`${file.fileLoadTime}+1`}>File Name: {file.fileName}</li>
      <li key={`${file.fileLoadTime}+2`}>File Type: {file.fileType}</li>
      <li key={`${file.fileLoadTime}+3`}>
        File Load Time: {file.fileLoadTime}
      </li>
    </ul>
  );
};

export default SingleFile;
