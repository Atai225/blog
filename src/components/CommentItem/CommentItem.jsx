import React from 'react';
import { useNavigate } from 'react-router-dom';



function CommentItem({comment, removeItem}) {
  const nav = useNavigate()

  return (
    <li className='posts__item'>
        <h2 className='posts__item--title'>{comment.name} <span>#{comment.id}</span></h2>
        <p className='posts__item--text'>{comment.body}</p>
        <p className='posts__item--email'>{comment.email}</p>
        <button onClick={()=>nav(`${comment.id}`)}>Change</button>
        <button onClick={()=> removeItem(comment.id)}>Deltere</button>
    </li>
  )
}

export default CommentItem