import React from "react";


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import DeleteComment from "./DeleteComment";

export default function DisplayComment({fileId, comments, handleGetAllComments}) {

  return (
    <div className="App">
      {comments && comments.filter((el) => el.postId === fileId).map((comment) => (
        <List
         key={comment._id}
          sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={comment.username}
              secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                   level="h4"
                    color="text.primary"
                  >
                   {comment.text} 
                  </Typography>
              }
            />
 <DeleteComment handleGetAllComments={handleGetAllComments} fileId={fileId} commentId={comment._id}></DeleteComment> 
          </ListItem>
          
          <Divider />
        </List>
      ))}

    </div>
  );
}
