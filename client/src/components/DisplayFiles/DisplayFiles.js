import React, { useState, useEffect } from "react";
import { getAllPodcasts } from "../../services/example.service";
import AddComment from "../Comment/AddComment";
import DisplayComment from "../Comment/ReadComment";

// if you need to display video use this component
// import { ControleFile } from "./ControleFile";


export default function DisplayFiles() {
  
  
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function handleGetAllPodcasts() {
      const response = await getAllPodcasts();
      setFiles(response.data);
    }
    handleGetAllPodcasts();
  }, []);
  return (
    <div className="App">   
      <h3>Podcasts</h3>
      <ul>
        {files.map((file) => {
          return (
            <li key={file._id}>
              <h3>The title : {file.title}</h3>
              <audio
          src={file.file_URL}
          type={"audio"}
   controls
        />
              <p>Description:{file.description} </p>
              <div>
              <DisplayComment/>
                <AddComment/>
              </div>
             
            </li>
          );
        })}
      </ul>
    </div>
  );
}
