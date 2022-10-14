import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CommentItem.css'


function CommentItem({comment, removeItem, edit}) {

  return (
    <li className='comments__item'>
    <div className='comments__info'>
      <h2 className='comments__item--title'>{comment.name} <span>#{comment.id}</span></h2>
      <p className='comments__item--email'>E-mail: {comment.email}</p>
      <p className='comments__item--text'>{comment.body}</p>
      <div className='comments__btn'>
        <button className='btn' onClick={edit}>Change</button>
        <button className='btn red' onClick={()=> removeItem(comment.id)}>Delete</button>
      </div>
    </div>
</li>
  )
}

export default CommentItem