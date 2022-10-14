import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSpecialComment, editComment} from "../../store/reducers/posts.reducer";
import { useNavigate, useParams } from "react-router-dom";



function EditComment() {
    const comment = useSelector((store) => store.posts.specialComment);
    const [changes, setChanges] = useState(
      comment || {
        name: "",
        body: "",
      }
    );
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, commID } = useParams();
    
    const changeHandler = (e) => {
      setChanges((item) => {
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      });
    };
  
    useEffect(() => {
      dispatch(getSpecialComment({id, commID}));
    }, []);
  
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(editComment(changes)).then(() => navigate(`/${id}/posts/comments`))
    };

  return (
    <div className="container">
      <h1>Редактировать комментарий</h1>

      <form onSubmit={(e) => submitHandler(e)} className="news__form">
          <div className="news__form-group">
            <textarea
                name='body'
              value={changes[0]?.body}
              placeholder="Редактировать комментарий"
              onChange={changeHandler}
            />
          </div>
          <div className="formbtn-box">
            <button className="btn btn-primary">Сохранить изменения</button>
          </div>
      </form>
    </div>
  )
}

export default EditComment