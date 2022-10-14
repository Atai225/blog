import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getUsers = createAsyncThunk(
  "users/get",
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get( `https://jsonplaceholder.typicode.com/users/`)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/get",
  async (id, {rejectWithValue}) => {
    try {
      const res = await axios.get( `http://jsonplaceholder.typicode.com/users/${id}/posts`)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const getComments = createAsyncThunk(
  "comments/get",
  async (id, {rejectWithValue}) => {
    try {
      const res = await axios.get( `http://jsonplaceholder.typicode.com/posts/${id}/comments`)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const getSpecialComment = createAsyncThunk(
  "comment/get",
  async ({id, commID}, {rejectWithValue}) => {
    try {
      const res = await axios.get( `http://jsonplaceholder.typicode.com/posts/${id}/comments?id=${commID}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

// export const editComment = createAsyncThunk(
//   "comment/put",
//   async (data, {rejectWithValue}) => {
//     try {
//       const res = await axios.put(`http://jsonplaceholder.typicode.com/posts/${data.id}/comments?id=${data.commID}`, {data: {...data.changes}});
//       if(!res.data) {
//         throw new Error()
//       }
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

// export const addComment = createAsyncThunk(
//   "comment/add",
//   async (data, {rejectWithValue}) => {
//     try {
//       const res = await axios.post(`http://jsonplaceholder.typicode.com/posts/${data.id}/comments`, data);
//       if(!res.data) {
//         throw new Error()
//       }
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// )

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    users: [],
    comments: [],
    posts: [],
    specialComment: [],

  },
  extraReducers: {
    [getComments.pending]: () => {
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [getComments.rejected]: () => {
    },


    [getPosts.pending]: () => {
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
    },
    [getPosts.rejected]: () => {
    },


    [getUsers.pending]: () => {
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getUsers.rejected]: () => {
    },

    [getSpecialComment.pending]: () => {
    },
    [getSpecialComment.fulfilled]: (state, action) => {
      state.specialComment = action.payload;
    },
    [getSpecialComment.rejected]: () => {
    },

    // [editComment.pending]: () => {
    // },
    // [editComment.fulfilled]: (state, action) => {
    //   state.specialComment = action.payload;
    // },
    // [editComment.rejected]: () => {
    // },

  },
  reducers: {
    addComment: (state, action) => {
			state.comments.push(action.payload)
		},
    deleteComment: (state, action) => {
		  const removed = state.comments.filter(e => e.id !== action.payload);
      state.comments = [...removed];
		},
    editComment: (state, action) => {
      state.comments = action
    }
  }
});

export default postsSlice.reducer;
export const {addComment, deleteComment,editComment } = postsSlice.actions;
