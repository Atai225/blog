import React from 'react';
import './PostItems.css';
import { Link } from 'react-router-dom';


function PostItems({post, comments}) {

  return (
    <li className='posts__item'>
        <div className='posts__info'>
          <h2 className='posts__item--title'>{post.title} <span>#{post.id}</span></h2>
          <p className='posts__item--text'>{post.body}</p>
        </div>
        <div className='link-box'>
          <Link className="link posts__item--comments" to={"comments"}>{comments}</Link>
        </div>
    </li>
  )
}

export default PostItems