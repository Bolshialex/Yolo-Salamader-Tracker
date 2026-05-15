import { useState } from "react";

export default function FilePicker({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    onFileSelect(file);
  }

  function handleFileNameUpdate(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log(file.name);
  }

  return (
    <div>
      <form className="sal-form" onSubmit={handleFileChange}>
        <label className="file-picker" htmlFor="video">
          <div className="file-picker-label">
            Drop a File or <span>Browse</span>
          </div>
          <input onChange={handleFileNameUpdate} type="file" id="video" />
          <p>
            uploaded file: <span>{selectedFile ? selectedFile.name : ""}</span>
          </p>
        </label>
        <button type="submit" className="sal-button">
          Submit
        </button>
      </form>
    </div>
  );
}
