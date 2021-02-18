import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  DELETE_POST,
  POST_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  errors: {},
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };

    default:
      return state;
  }
}
