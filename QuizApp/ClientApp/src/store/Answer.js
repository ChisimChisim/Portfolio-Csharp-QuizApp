const receiveAnswerType = 'RECEIVE_SELECT_ANSWER';
const receiveEditAnswerType = 'RECEIVE_EDIT_ANSWER';
const initialState = { selectAnswers: [], isLoading: false, error:false, message:'', };

export const actionCreatorsAnswer = {
    requestGetAnswerByQuestionId: (questionId) => async (dispatch) => {    
    
    const url = `api/Answers/Question/${questionId}`;
    const response = await fetch(url);
    const selectAnswers = await response.json();

        dispatch({ type: receiveAnswerType, selectAnswers});
    },

    requestEditAnswer: (answers) => async (dispatch) => {

        const url = `api/Answers`;
        try {
            const update_quiz = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (update_quiz.status === 204) {
                var message = "Successful!"
                var error = false;
                dispatch({ type: receiveEditAnswerType, message, error });
            } else {
                var message = "Database Error..."
                var error = true;
                dispatch({ type: receiveEditAnswerType, message, error });
            }
        } catch(error){
               var message = "Database Error..."
                var error = true;
                dispatch({ type: receiveEditAnswerType, message, error });
        }
    },

    requestDeleteAnswer: (answers) => async (dispatch) => {

        const url = `api/Answers`;
        try {
            const update_quiz = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (update_quiz.status === 200) {
                var message = "Successful!"
                var error = false;
                dispatch({ type: receiveEditAnswerType, message, error });
            } else {
                var message = "Database Error..."
                var error = true;
                dispatch({ type: receiveEditAnswerType, message, error });
            }
        } catch (error) {
            var message = "Database Error..."
            var error = true;
            dispatch({ type: receiveEditAnswerType, message, error });
        }
    },

    requestAddAnswer: (answers) => async (dispatch) => {

        const url = `api/Answers`;
        try {
            const add_answers = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (add_answers.status === 200 || 201) {
                let message = "Successful!"
                let error = false;
                dispatch({ type: receiveEditAnswerType, message, error });
            } else {
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditAnswerType, message, error });
            }
        } catch (error) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditAnswerType, message, error });
        }
    },

};



export const reducer = (state, action) => {
  state = state || initialState;

    if (action.type === receiveAnswerType ) {
    return {
        ...state,
      selectAnswers: action.selectAnswers,
      isLoading: false
    };
    }

    if (action.type === receiveEditAnswerType) {
        return {
            ...state,
            message: action.message,
            error: action.error
        };
    }

  return state;
};
