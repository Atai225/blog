import {useState, useEffect} from 'react';
import Search from '../../components/Search/Search';
import CommentItem from '../../components/CommentItem/CommentItem';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {addComment, deleteComment} from '../../store/reducers/posts.reducer'
import Modal from '../../components/UI/Modal/Modal';
import './Comments.css'
import { filterABC, filterID,searchName } from '../../helpers/helpers';


function Comments() {
  const {id} = useParams()
    const comments = useSelector(store => store.posts.comments)
    const [filtered, setFiltered] = useState(comments);
    const [newComment, setNewComment] = useState(comments || {
    "postId": id,
    "id": comments.length+1,
    "name": '',
    "email": '',
    "body": ''
    });
    
    const [show, setShow] = useState(false);
    const [specialComment, setSpecialComment] = useState(0);
    const [enableToEdit, setEnableToEdit] = useState(false);
    const [isReversedID, setIsReversedID] = useState(false);
    const [isReversedName, setIsReversedName] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      const reversed = [...comments].reverse()
      setFiltered(reversed)
    }, [comments])

    const filterById = () => {
      setFiltered(filterID(isReversedID, comments))
      setIsReversedID(!isReversedID)
    }
  
    const filterByName = () => {
      setFiltered(filterABC(isReversedName, comments))
      setIsReversedName(!isReversedName)
    }
    
    const searchByTitle = (e) => setFiltered(searchName(e, comments))

  const plusComment = () => {
    dispatch(addComment(newComment));
    setShow(false)
    setNewComment({
      "postId": id,
      "id": comments.length+1,
      "name": '',
      "email": '',
      "body": ''
      })
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

  const changeEditStatus = (id) => {
    setSpecialComment(id);
    setEnableToEdit(true)
  }
  const editComment = () => {
    setFiltered(filtered.forEach((item) => {
        if(item.id === specialComment){
          item.body = newComment[0].body;
      }
    }))
    setEnableToEdit(false);
  }


  return (
    <main className="comments">
        <Search search={(e) => searchByTitle(e)} filterByA={filterById} filterByB={filterByName} isReversedA={isReversedID} isReversedB={isReversedName}/>
        <button className="btn" onClick={()=>setShow(true)}>Add Comment</button>
          <ul className="comments__list">
              {filtered.length > 0 ? filtered.map((comment) => (
                  <CommentItem key={comment.id} edit={() => changeEditStatus(id)} removeItem={removeComment} comment={comment}/>
              )) : <h2>Нет совпадений</h2>}
          </ul>
  
          <Modal show={show} close={() => setShow(false)} continued={plusComment} action={'Добавить'}>
  				Добавьте комментарий
              <form className='form'>
                <input onChange={changeHandler} value={newComment.name} name="name" placeholder='Введите ваше имя'/>
                <input onChange={changeHandler} value={newComment.email} name="email" placeholder='Введите вашу почту'/>
              <input
                  name='body'
                  value={newComment.body}
                  placeholder="Напишите комментарий"
                  onChange={changeHandler}
                />
              </form>
  			</Modal>
        <Modal show={enableToEdit} close={() => setEnableToEdit(false)} continued={editComment} action={'Изменить'}>
  				Добавьте комментарий
              <form className='form'>
              <input
                  name='body'
                  value={newComment[0].body}
                  placeholder="Напишите комментарий"
                  onChange={changeHandler}
                />
              </form>
  			</Modal>
    </main>
  )
}

export default Comments