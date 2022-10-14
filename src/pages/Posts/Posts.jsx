import {useState, useEffect} from 'react';
import './Posts.css'
import PostItems from '../../components/PostItems/PostItems';
import Search from '../../components/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import {getPosts, getComments} from '../../store/reducers/posts.reducer'
import {useParams} from 'react-router-dom'

function Posts() {
    const dispatch = useDispatch();
	  const {id} = useParams();
    const posts = useSelector(store => store.posts.posts)
    const comments = useSelector(store => store.posts.comments)
    const [filtered, setFiltered] = useState(posts);
    const [commentsAmount, setCommentsAmount] = useState(comments.length || 5);
    const [isReversedID, setIsReversedID] = useState(false);
    const [isReversedName, setIsReversedName] = useState(false);

    useEffect(() => {
      dispatch(getPosts(id))
    }, [id]) 
    useEffect(() => {
      dispatch(getComments(id))
    }, [id]) 
    
    useEffect(() => {
      const reversed = [...posts].reverse()
      setFiltered(reversed);
      setCommentsAmount(comments.length)
    }, [posts])

  const filterById = () => {
     isReversedID ? 
        setFiltered([...posts].sort((a, b) => a.id > b.id ? -1 : 1)) 
        : setFiltered([...posts].sort((a, b) => a.id > b.id ? 1 : -1))
    setIsReversedID(!isReversedID)
  }
  const filterByName = () => {
    isReversedName ? 
        setFiltered([...posts].sort((a, b) => a.title > b.title ? -1 : 1)) 
        : setFiltered([...posts].sort((a, b) => a.title > b.title ? 1 : -1))
    setIsReversedName(!isReversedName)
  }
  
  const searchPost = (e) => {
    setFiltered([...posts].filter((user) => user.title.startsWith(e.target.value)));
  }

  return (
    <div className="posts">
      <Search search={(e) => searchPost(e)} filterByA={filterById} filterByB={filterByName} isReversedA={isReversedID} isReversedB={isReversedName}/>
        <ul className="posts__list">
            {filtered.length > 0 ? filtered.map((post) => (
                <PostItems key={post.id} post={post} comments={commentsAmount}/>
            )) : <h2>Нет совпадений</h2>}
        </ul>
    </div>
  )
}

export default Posts