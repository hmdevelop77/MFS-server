import React from 'react'
import "./PodcastPage.css"
import AddFile from '../../components/DisplayFiles/AddFile'
import DisplayFile from '../../components/DisplayFiles/DisplayFiles'

export default function PodcastPage() {

  return (
    <div className='Podcast-Page'>Podcast Page
    <AddFile />
    <DisplayFile/>
    </div>
  )
}
