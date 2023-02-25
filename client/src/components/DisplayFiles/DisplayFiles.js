
import React, { useState, useEffect } from "react";
import { exampleService } from "../../services/example.service";
import AddComment from "../Comment/AddComment";
import DisplayComment from "../Comment/DisplayComment";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import DeleteFile from "./DeleteFile";

export default function DisplayFiles(props) {
  
  const [comments,setComments] = useState()
  
//   const [propsfiles, setFiles] = useState([]);
 
//  async function handleGetAllPodcasts(props) {
//    const response = await exampleService.getAllPodcasts();
   
//    setFiles(response.data);
//   }
//   useEffect(() => {
  //   }, []);
  
  const handleAllPodcasts = () => props.handleGetAllPodcasts();
  
  async function handleGetAllComments(){
   const response = await exampleService.getAllComments();
   setComments(response.data);
 }
 
 useEffect(() => {
   handleGetAllComments();
  },[]);
  
  
  return (
    <div className="App">
      {props.files.map((file) => {
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
              <DeleteFile handleAllPodcasts={handleAllPodcasts}  fileId={file._id}/>
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
