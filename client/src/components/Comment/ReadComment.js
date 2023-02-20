import React, { useState, useEffect } from "react";
import { getAllComments } from "../../services/example.service";



export default function DisplayComment() {
  
  
  const [comments, setComment] = useState([]);
  useEffect(() => {
    async function handleGetAllComments() {
      const response = await getAllComments();
      setComment(response.data);
    }
    handleGetAllComments();
  }, []);
  return (
    <div className="App">   
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment._id}>
              <span>{comment.username}</span>:<p>{comment.text} </p>
              {/* <div>
                <AddComment></AddComment> 
              </div> */}
             
            </li>
          );
        })}
      </ul>
    </div>
  );
}