import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Main from './pages/Main/Main';
import {getUsers} from './store/reducers/posts.reducer'
import Comments from './pages/Comments/Comments';
import PostsPage from './pages/PostsPage/PostsPage';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  
  return (
    <Layout>
      <Routes>
        <Route path= '/' element={<Main/>}/>
        <Route path= ':id/posts' element={<PostsPage/>}/>
        <Route path= ':id/posts/comments' element={<Comments/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
