import {useState, useEffect} from 'react';
import Search from '../../components/Search/Search';
import CommentItem from '../../components/CommentItem/CommentItem';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {addComment, deleteComment} from '../../store/reducers/posts.reducer'
import Modal from '../../components/UI/Modal/Modal';
import './Comments.css'


function Comments() {
  const {id} = useParams()
    const comments = useSelector(store => store.posts.comments)
    const [filtered, setFiltered] = useState(comments);
    const [newComment, setNewComment] = useState({
    "postId": id,
    "id": comments.length+1,
    "name": '',
    "email": '',
    "body": ''
    });
    
    const [show, setShow] = useState(false);
    const [isReversedID, setIsReversedID] = useState(false);
    const [isReversedName, setIsReversedName] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      const reversed = [...comments].reverse()
      setFiltered(reversed)
    }, [comments])

  const filterById = () => {
     isReversedID ? 
        setFiltered([...comments].sort((a, b) => a.id > b.id ? -1 : 1)) 
        : setFiltered([...comments].sort((a, b) => a.id > b.id ? 1 : -1))
    setIsReversedID(!isReversedID)
  }
  const filterByName = () => {
    isReversedName ? 
        setFiltered([...comments].sort((a, b) => a.title > b.title ? -1 : 1)) 
        : setFiltered([...comments].sort((a, b) => a.title > b.title ? 1 : -1))
    setIsReversedName(!isReversedName)
  }
  
  const searchPost = (e) => {
    setFiltered([...comments].filter((user) => user.name.startsWith(e.target.value)));
  }

  const plusComment = () => {
    dispatch(addComment(newComment));
    setShow(false)
  }

  const removeComment = (id) => {
    dispatch(deleteComment(id));
  }

  const changeHandler = (e) => {
    setNewComment((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  };


  return (
    <div className="posts">
      <Search search={(e) => searchPost(e)} filterByA={filterById} filterByB={filterByName} isReversedA={isReversedID} isReversedB={isReversedName}/>
      <button onClick={()=>setShow(true)}>AddComemnt</button>
        <ul className="posts__list">
            {filtered.length > 0 ? filtered.map((comment) => (
                <CommentItem key={comment.id} removeItem={removeComment} comment={comment}/>
            )) : <h2>Нет совпадений</h2>}
        </ul>

        <Modal show={show} close={() => setShow(false)} continued={plusComment} action={'Добавить'}>
				Добавьте комментарий
            <form className='form'>
              <input name="name" placeholder='Введите ваше имя'/>
              <input name="email" placeholder='Введите вашу почту'/>
            <textarea
                name='body'
                placeholder="Напишите комментарий"
                onChange={changeHandler}
              />
            </form>
			</Modal>
    </div>
  )
}

export default Comments