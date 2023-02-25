import React from "react";

import { exampleService } from "../../services/example.service";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function DeleteFile(props) {
 

  async function handleDeleteFile() {
    await exampleService.deleteFile(props.fileId);
    props.handleAllPodcasts()
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleDeleteFile}>
       Delete This file <DeleteIcon />
      </IconButton>
    </div>
  );
}