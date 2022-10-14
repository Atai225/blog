import postsSlice from './reducers/posts.reducer'
import { configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
  }
})
