import React from 'react';
import './PostItems.css';
import { useNavigate } from 'react-router-dom';


function PostItems({post, comments}) {
  const nav = useNavigate()

  return (
    <li className='posts__item' onClick={()=>nav("comments")}>
        <h2 className='posts__item--title'>{post.title} <span>#{post.id}</span></h2>
        <p className='posts__item--text'>{post.body}</p>
        <p className='posts__item--text'>{comments}</p>
    </li>
  )
}

export default PostItems