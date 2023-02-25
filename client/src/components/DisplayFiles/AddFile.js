import React, { useRef } from 'react'
import { useState } from "react";

import { exampleService } from "../../services/example.service";
import Button from '@mui/material/Button';




export default function AddFile(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file_URL, setFile] = useState(null);
    const hiddenFileInput = useRef(null)

   
   

    function handleTitleChange(event) {
        setTitle(event.target.value);
      }
    
      function handleDescriptionChange(event) {
        setDescription(event.target.value);
      }
    
      function handleFileSelect(event) {
        setFile(event.target.files[0]);
      }

      async function handleSubmitForm(event) {
        event.preventDefault();
      
    
        //1. Upload the file through the backend
        const uploadData = new FormData();
        uploadData.append("filename", file_URL);
    
        const response = await exampleService.uploadFile(uploadData);
       
        await exampleService.createFile({
          title,
          description,
          file_URL: response.data.fileUrl,
        });
        
        props.handleGetAllPodcasts()

        alert("file uploaded")
        setTitle("")
        setDescription("")
        setFile(null)
      }
      
  return (
    <>
    <h1>AddFile</h1>
<form onSubmit={handleSubmitForm}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="file_URL">File</label>
        <input id="file_URL" type="file" onChange={handleFileSelect}  ref={hiddenFileInput}  />
        <Button className="button" variant="contained" type="submit">
          Create File
        </Button>
      </form>   
    </>
  )
}


// import { toast } from "react-toastify";

