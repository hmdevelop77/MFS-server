import React from "react";
import { useNavigate } from "react-router-dom";
import { exampleService } from "../../services/example.service";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function DeleteComment(props) {
  const navigate = useNavigate();

  async function handleDeleteComment() {
    await exampleService.deleteComment(props.commentId,props.fileId);
    props.handleGetAllComments();
    navigate("/podcasts");
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleDeleteComment}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
