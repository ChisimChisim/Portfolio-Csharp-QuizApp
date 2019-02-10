const receiveCategoryType = 'RECEIVE_SELECT_CATEGORY';
const initialState = { categories: [], isLoading: false };

export const actionCreatorsCategory = {
    requestGetCategory: () => async (dispatch) => {    
    
    const url = `api/Categories/`;
    const response = await fetch(url);
    const categories = await response.json();

        dispatch({ type: receiveCategoryType, categories});
    },

    requestAddCategory: (category) => async (dispatch) => {
        const url = `api/Categories/`;
      
            const add_category = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
        });
        if (add_category.status === 200) {
            const response = await fetch(url);
            const categories = await response.json();

            dispatch({ type: receiveCategoryType, categories });
        }
        
    },
};

export const reducer = (state, action) => {
  state = state || initialState;

    if (action.type === receiveCategoryType) {
    return {
        ...state,
      categories: action.categories,
      isLoading: false
    };
  }

  return state;
};
