import { useState } from "react";

export default function FilePicker({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);

<<<<<<< HEAD
  function handleSubmit(e) {
    e.preventDefault();

    if (selectedFile) {
      onFileSelect(selectedFile);
    }
=======
  function handleFileChange(e) {
    e.preventDefault();
    onFileSelect(selectedFile);
>>>>>>> 0aafee8abb36f573c6b8d62a6918b44dfdafc934
  }

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      console.log(file.name);
    } else {
      setSelectedFile(null);
    }
  }

  return (
    <div>
      <form className="sal-form" onSubmit={handleSubmit}>
        <label className="file-picker" htmlFor="video">
          <div className="file-picker-label">
            Drop a File or <span>Browse</span>
          </div>

          <input onChange={handleFileChange} type="file" id="video" />

          <p>
            uploaded file:{" "}
            <span>{selectedFile ? selectedFile.name : "None"}</span>
          </p>
        </label>

        <button type="submit" className="sal-button">
          Submit
        </button>
      </form>
    </div>
  );
}
