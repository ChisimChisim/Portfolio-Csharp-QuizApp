const receiveQuizByCategoryAndLevelType = 'RECEIVE_QUIZ_CATEGORY_LEVEL';
const receiveWrongType = 'RECEIVE_WRONG';
const receiveQuizByCategoryType = 'RECEIVE_QUIZ_CATEGORY';
const receiveQuizType = 'RECEIVE_QUIZ';
const receiveEditQuizType = 'RECEIVE_EDIT_QUIZ';
const initialState = { questions: [], yourAnswer: [], selectQuestion: [], isLoading: false, firstQuestion: "", firstAnswers: [], correctCount:0,};

export const actionCreatorsQuiz = {
    requestQuiz: (categoryId, levelId) => async (dispatch) => {    

    const url = `api/Questions/CategoryLevel/${categoryId}/${levelId}`;
    const response = await fetch(url);
        const questions = await response.json();
        const firstQuestion = questions[0];
        const firstAnswers = firstQuestion.answer;
        
        dispatch({ type: receiveQuizByCategoryAndLevelType, categoryId, levelId, questions, firstQuestion, firstAnswers });
    },

    saveYourAnswer: (yours) => (dispatch) => {
        var correctCount = 0;
        if (yours.isCorrect) {
            correctCount = 1;
        }
       
        dispatch({ type: receiveWrongType, yours, correctCount});
    },

    requestGetQuizByCategory: (categoryId) => async (dispatch) => {

        const url = `api/Questions/Category/${categoryId}`;
        const response = await fetch(url);
        const questions = await response.json();
        dispatch({ type: receiveQuizByCategoryType, questions });

    },

    requestGetQuizByQuestionId: (questionId) => async (dispatch) => {

        const url = `api/Questions/${questionId}`;
        const response = await fetch(url);
        const selectQuestion = await response.json();
        dispatch({ type: receiveQuizType, selectQuestion });

    },

    requestEditQuiz: (quiz, id) => async (dispatch) => {
        const url = `api/Questions/${id}`;

        try {
            const update_quiz = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quiz),
        });
        if (update_quiz.status === 204) {
            let message = "Successful!"
            let error = false;
            dispatch({ type: receiveEditQuizType, message, error });
        } else {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditQuizType, message, error });
        }
    } catch(error) {
        let message = "Database Error..."
        let error = true;
            dispatch({ type: receiveEditQuizType, message, error });
    }

    },

    requestDeleteQuiz: (id, answers) => async (dispatch) => {
        const urlQuiz = `api/Questions/${id}`;
        const urlAnswer = `api/Answers`;

        try {
            const delete_answer = await fetch(urlAnswer, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });
            if (delete_answer.status === 200) {
                const delete_quiz = await fetch(urlQuiz, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });
                if (delete_quiz.status === 200) {
                    let message = "Successful!"
                    let error = false;
                    dispatch({ type: receiveEditQuizType, message, error });
                } else {
                    let message = "Database Error..."
                    let error = true;
                    dispatch({ type: receiveEditQuizType, message, error });
                }
            } else {
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditQuizType, message, error });
            }
        } catch (err) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditQuizType, message, error });
        }

    },

    requestAddQuiz: (question) => async (dispatch) => {
        const urlQuiz = `api/Questions`;

        try {
            const add_question = await fetch(urlQuiz, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(question),
            });
            if (add_question.staus === 201 || 200) {
                var result = await add_question.json().then(function (data) {
                    let message = "Successful!"
                    let error = true;
                    dispatch({ type: receiveEditQuizType, message, error });
                    return data.id;
                });
                return result;
            } else {
                return { id: 'undefined', error: true }
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditQuizType, message, error });
                return '0';
            }
        } catch (err) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditQuizType, message, error });
            return '0'
        }
    },
               

};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveQuizByCategoryAndLevelType) {
    return {
        ...state,
     categoryId: action.categoryId,
        levelId: action.levelId,
        questions: action.questions,
        firstQuestion: action.firstQuestion,
        firstAnswers: action.firstAnswers,
        yourAnswer: [],
        correctCount: 0,
      isLoading: false
        };

    };

    if (action.type === receiveWrongType) {
        return {
            ...state,
            yourAnswer: state.yourAnswer.concat(action.yours),
            correctCount: state.correctCount + action.correctCount,
            isLoading: false
        };
    };

    if (action.type === receiveQuizByCategoryType) {
        return {
            ...state,
            categoryId: action.categoryId,
            questions: action.questions,
            isLoading: false
        };
    };

    if (action.type === receiveQuizType) {
        return {
            ...state,
            selectQuestion: action.selectQuestion,
            isLoading: false
        };
    };

    if (action.type === receiveEditQuizType) {
        return {
            ...state,
            message: action.message,
            error: action.error
        };
    };

  return state;
};
