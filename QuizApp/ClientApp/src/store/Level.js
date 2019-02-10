const receiveLevelType = 'RECEIVE_SELECT_LEVEL';
const initialState = { levels: [], isLoading: false };

export const actionCreatorsLevel = {
    requestGetLevel: () => async (dispatch) => {    
    
    const url = `api/Levels/`;
    const response = await fetch(url);
    const levels = await response.json();

        dispatch({ type: receiveLevelType, levels});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

    if (action.type === receiveLevelType) {
    return {
        ...state,
      levels: action.levels,
      isLoading: false
    };
  }

  return state;
};
