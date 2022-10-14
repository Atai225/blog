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
  
  const edit = (id, e) => {
    const edited = newComment.forEach(item => {
      if(item.id === id){
        item.body = e.target.value;
      }
    })
    setNewComment(edited)
  }


  return (
    <main className="comments">
        <Search search={(e) => searchByTitle(e)} filterByA={filterById} filterByB={filterByName} isReversedA={isReversedID} isReversedB={isReversedName}/>
        <button className="btn" onClick={()=>setShow(true)}>Add Comment</button>
          <ul className="comments__list">
              {filtered.length > 0 ? filtered.map((comment) => (
                  <CommentItem key={comment.id} edit={() => setEnableToEdit(true)} removeItem={removeComment} comment={comment}/>
              )) : <h2>Нет совпадений</h2>}
          </ul>
  
          <Modal show={show} close={() => setShow(false)} continued={plusComment} action={'Добавить'}>
  				Добавьте комментарий
              <form className='form'>
                <input value={newComment.name} name="name" placeholder='Введите ваше имя'/>
                <input value={newComment.body} name="email" placeholder='Введите вашу почту'/>
              <textarea
                  name='body'
                  placeholder="Напишите комментарий"
                  onChange={changeHandler}
                />
              </form>
  			</Modal>
        <Modal show={enableToEdit} close={() => setEnableToEdit(false)} continued={edit} action={'Изменить'}>
  				Добавьте комментарий
              <form className='form'>
                <input value={newComment.name} name="name" placeholder='Введите ваше имя'/>
                <input value={newComment.body} name="email" placeholder='Введите вашу почту'/>
              <textarea
                  name='body'
                  placeholder="Напишите комментарий"
                  onChange={changeHandler}
                />
              </form>
  			</Modal>
    </main>
  )
}

export default Comments