import React, { useState } from "react";
import { exampleService } from "../../services/example.service";

import IconButton from "@mui/material/IconButton";

import Textarea from '@mui/joy/Textarea';

export default function AddComment(props) {
  const [text, setText] = useState("");

  function handleGetText(event) {
    setText(event.target.value);
  }
  async function handleSubmitForm(e) {
    e.preventDefault();
    await exampleService.createComment({
      text,
      postId: props.fileId,
    });
    props.handleGetAllComments()
    setText("")
  }
  return (
    <>
      <form onSubmit={handleSubmitForm}>
      <Textarea
      placeholder="Type something ...."
  color="primary"
  minRows={3}
  size="lg"
  variant="outlined"
  onChange={handleGetText}
          value={text}
          name="text"
          id="text"
          required
/>      
        {/* <input type="text" id={postId} onChange={handleGetId} name={postId} hidden /> */}
        <IconButton type="submit">
        Comment
        </IconButton>
    
        {/* <button type="submit">Comment</button> */}
      </form>
    </>
  );
}



