
import React, { useState, useEffect } from "react";
import { exampleService } from "../../services/example.service";
import AddComment from "../Comment/AddComment";
import DisplayComment from "../Comment/DisplayComment";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function DisplayFiles() {
  const [files, setFiles] = useState([]);

 const [comments,setComments] = useState()

 async function handleGetAllComments(){
  const response = await exampleService.getAllComments();
  setComments(response.data);
}

useEffect(() => {
  handleGetAllComments();
 },[]);

  async function handleGetAllPodcasts() {
    const response = await exampleService.getAllPodcasts();
  
    setFiles(response.data);
  }
  useEffect(() => {
    handleGetAllPodcasts();
  }, []);

  return (
    <div className="App">
      {files.map((file) => {
        return (
          <Container  maxWidth="sm" key={file._id} >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  Title: {file.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Description:{file.description}
                </Typography>
              </CardContent>
              <div className="Audio-file">
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <audio src={file.file_URL} type={"audio"} controls />
              </Box>
              </div>
              <DisplayComment handleGetAllComments={handleGetAllComments} fileId={file._id}  comments={comments}  />
              <AddComment handleGetAllComments={handleGetAllComments} fileId={file._id} />
            </Box>
            <br></br>
          </Container>
         
        );
      })}
    </div>
  );
}
