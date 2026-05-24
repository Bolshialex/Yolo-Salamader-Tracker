import { useState, useEffect } from "react";
import FilePicker from "./components/FilePicker";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const [status, setStatus] = useState("idle");
  const [percent, setPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function handleReset() {
    setFile(null);
    setResponse(null);
    setStatus("idle");
    setPercent(0);
    setErrorMsg("");
  }

  useEffect(() => {
    let isPolling = true;

    async function sendFileAndPoll() {
      if (!file) return;

      setStatus("processing");
      setPercent(0);
      setErrorMsg("");
      setResponse(null);

      try {
        const formData = new FormData();
        formData.append("video", file);

        await fetch(`${import.meta.env.VITE_API_URL}/track`, {
          method: "POST",
          body: formData,
        });

        while (isPolling) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/track`);
          const data = await res.json();

          if (data.status === "processing") {
            setPercent(data.percent || 0);
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else if (data.status === "done") {
            setPercent(100);
            setResponse(data.result);
            setStatus("done");
            break;
          } else if (data.status === "error") {
            setErrorMsg(data.message || "An unknown error occurred.");
            setStatus("error");
            break;
          } else {
            break;
          }
        }
      } catch (e) {
        console.log(e);
        setStatus("error");
        setErrorMsg(e.message || "Network error");
      }
    }

    sendFileAndPoll();

    return () => {
      isPolling = false;
    };
  }, [file]);

  return (
    <div className="main">
      <header>
        <h1 className="app-title">Sally the Salamander tracker</h1>
      </header>
      {status === "idle" && (
        <FilePicker
          key={file ? file.name : "empty"}
          onFileSelect={setFile}
          isLoading={false}
        />
      )}

      {status === "processing" && (
        <div>
          <p>Processing video: {percent}%</p>
          <progress value={percent} max={100} />
        </div>
      )}

      {status === "error" && (
        <div>
          <p>Error: {errorMsg}</p>
          <button onClick={handleReset} className="sal-button">
            Try Again
          </button>
        </div>
      )}

      {status === "done" && response?.video_url && (
        <div>
          <p>Status: Complete</p>
          <video src={response.video_url} controls width="100%" />

          {response.heatmap_url && (
            <>
              <p>Heatmap:</p>
              <video src={response.heatmap_url} controls width="100%" />
            </>
          )}

          <div>
            <button onClick={handleReset} className="sal-button">
              Upload Another Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
