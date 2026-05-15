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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/track`, {
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
      <header>
        <h1 className='app-title'>Sally the Salamander tracker</h1>
      </header>
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
