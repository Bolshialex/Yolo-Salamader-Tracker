import { useState } from 'react'
import FilePicker from './components/FilePicker';
import './App.css'

function App() {
  const [currentFile, setFile] = useState("");
  const [response, setResponse] = useState();


  return (
    <div className="main">
      <FilePicker onFileSelect={setFile} />
    </ div>
  )
}

export default App
