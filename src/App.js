import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Posts from './pages/Posts/Posts';
import Main from './pages/Main/Main';
import {getUsers} from './store/reducers/posts.reducer'
import Comments from './pages/Comments/Comments';
import EditComment from './components/EditComment/EditComment';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  
  return (
    <Layout>
      <Routes>
        <Route path= '/' element={<Main/>}/>
        <Route path= ':id/posts' element={<Posts/>}/>
        <Route path= ':id/posts/comments' element={<Comments/>}/>
        <Route path= ':id/posts/comments/:commID' element={<EditComment/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
