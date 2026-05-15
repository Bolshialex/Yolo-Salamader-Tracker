import { useState, useEffect } from 'react'
import FilePicker from './components/FilePicker';
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState();


  useEffect(()=> {
    async function sendFile() {
      if(!file) return;

      try{
        const formData = new FormData();
        formData.append("video", file);
        const res = await fetch("http://127.0.0.1:8000/track", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        setResponse(data);
      } catch(e){
        console.log(e)
      }
    }
    
    sendFile()

  }, [file])

  return (
    <div className="main">
      <FilePicker onFileSelect={setFile} />
      {response?.video_url ? (
        <>
          <p>Status: {response.status}</p>
          <video src={response.video_url} controls />
        </>) : (
          <p>No video uploaded yet</p>
        )}
    </ div>
  )
}

export default App
