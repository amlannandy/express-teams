import {
  FETCH_TEAMS,
  SET_TEAMS_ERROR,
  TOGGLE_TEAMS_LOADING,
} from '../actions/teams';

const initialState = {
  teams: [],
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TEAMS:
      return {
        ...state,
        teams: payload,
        isLoading: false,
        error: null,
      };
    case SET_TEAMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case TOGGLE_TEAMS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: payload,
      };
    default:
      return state;
  }
};

export default reducer;