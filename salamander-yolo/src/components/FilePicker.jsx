import { useState } from "react";

export default function FilePicker({ onFileSelect }) {
    const [selectedFile, setSelectedFile] = useState(null);

    function handleFileChange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    }

    return (
        <div className="file-picker">
            <label className="file-picker-label">Drop a file
                <input type="file" onChange={handleFileChange} />
            </label>
            {selectedFile && (
                <p>Selected: {selectedFile.name}</p>
            )}
        </div>
    )
}