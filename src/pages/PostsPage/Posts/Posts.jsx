import {useState, useEffect} from 'react';
import './Posts.css'
import PostItems from '../../../components/PostItems/PostItems';
import Search from '../../../components/Search/Search';
import { useSelector, useDispatch } from 'react-redux';
import { filterID, searchTitle, filterABC } from '../../../helpers/helpers';

function Posts({comments}) {
    const posts = useSelector(store => store.posts.posts)
    const [filtered, setFiltered] = useState(posts);
    const [isReversedID, setIsReversedID] = useState(false);
    const [isReversedName, setIsReversedName] = useState(false);
    
    useEffect(() => {
      const reversed = [...posts].reverse()
      setFiltered(reversed);
    }, [posts])

  const filterById = () => {
    setFiltered(filterID(isReversedID, posts))
    setIsReversedID(!isReversedID)
  }

  const filterByName = () => {
    setFiltered(filterABC(isReversedName, posts))
    setIsReversedName(!isReversedName)
  }
  
  const searchByName = (e) => setFiltered(searchTitle(e, posts))

  return (
    <main className="posts">
        <Search search={(e) => searchByName(e)} filterByA={filterById} filterByB={filterByName} isReversedA={isReversedID} isReversedB={isReversedName}/>
          <ul className="posts__list">
              {filtered.length > 0 ? filtered.map((post) => (
                  <PostItems key={post.id} post={post} comments={comments.length}/>
              )) : <h2>Нет совпадений</h2>}
          </ul>
    </main>
  )
}

export default Posts