import { useState } from "react";

export default function FilePicker({ onFileSelect, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedFile) {
      onFileSelect(selectedFile);
    }
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
          <input
            onChange={handleFileChange}
            type="file"
            id="video"
            disabled={isLoading}
          />

          <p>
            uploaded file:{" "}
            <span>{selectedFile ? selectedFile.name : "None"}</span>
          </p>
        </label>
        <button
          type="submit"
          className="sal-button"
          disabled={isLoading || !selectedFile}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
