import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getPosts } from '../../store/reducers/posts.reducer';
import Posts from './Posts/Posts';

function PostsPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const comments = useSelector(store => store.posts.comments)

    useEffect(() => {
        comments.length <= 0 && dispatch(getComments(id))
      }, [id]) 

    useEffect(() => {
        dispatch(getPosts(id))
      }, [id]) 
  
      
  return <Posts comments={comments}/>
}

export default PostsPage