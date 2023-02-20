import React, { useState } from 'react'
import { createComment } from '../../services/example.service';

export default function AddComment() {
   
   const[text,setText]=useState("")
   const[postId,setpostId]=useState("")


 
   function handleGetText(event){
    setText(event.target.value);
   }
   function handleGetId(event){
    setpostId(event.target.value);
   }
  
  
  
  async function handleSubmitForm(){
    await createComment({
        text,
        postId
      });  
    }

  return (
    <>
<form onSubmit={handleSubmitForm}>
<textarea onChange={handleGetText} name="text" id="text" required></textarea>
    <input   type="text" value="postId" id="postId" name="postId" hidden />
    <button type='submit' >Comment</button>
</form>
    </>
  )
}
