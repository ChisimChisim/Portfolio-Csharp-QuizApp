const receiveEditGradeType = 'RECEIVE_EDIT_GRADE';
const receiveGetGradeType = 'RECEIVE_GET_GRADE';
const initialState = { isLoading: false, grades: []};

export const actionCreatorsGrade = {
  requestAddGrade: (grade) => async (dispatch) => {
        const urlQuiz = `api/Grades`;

        try {
            const add_grade = await fetch(urlQuiz, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(grade),
            });
            if (add_grade.staus === 201 || 200) {
                var result = await add_grade.json().then(function (data) {
                    let message = "Successful!"
                    let error = true;
                    dispatch({ type: receiveEditGradeType, message, error });
                    return data.id;
                });
                return result;
            } else {
                return { id: 'undefined', error: true }
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditGradeType, message, error });
                return '0';
            }
        } catch (err) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditGradeType, message, error });
            return '0'
        }
    },

    requestAddGradeItem: (gradeItems) => async (dispatch) => {

        const url = `api/GradeItems`;
        try {
            const add_gradeItems = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gradeItems),
            });
            if (add_gradeItems.status === 200 || 201) {
                let message = "Successful!"
                let error = false;
                dispatch({ type: receiveEditGradeType, message, error });
            } else {
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditGradeType, message, error });
            }
        } catch (error) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditGradeType, message, error });
        }
    },

    requestGetHistory: () => async (dispatch) => {

        const url = `api/Grades/`;
        const response = await fetch(url);
        const grades = await response.json();
    
        dispatch({ type: receiveGetGradeType, grades });
    },

    requestDeleteHistory: (id, items) => async (dispatch) => {
        const urlGrade = `api/Grades/${id}`;
        const urlGradeItem = `api/GradeItems/grade/${id}`;

        try {
            const delete_items = await fetch(urlGradeItem, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(items),
            });
            if (delete_items.status === 200) {
                const delete_grade = await fetch(urlGrade, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });
                if (delete_grade.status === 200) {
                    let message = "Successful!"
                    let error = false;
                    dispatch({ type: receiveEditGradeType, message, error });
                } else {
                    let message = "Database Error..."
                    let error = true;
                    dispatch({ type: receiveEditGradeType, message, error });
                }
            } else {
                let message = "Database Error..."
                let error = true;
                dispatch({ type: receiveEditGradeType, message, error });
            }
        } catch (err) {
            let message = "Database Error..."
            let error = true;
            dispatch({ type: receiveEditGradeType, message, error });
        }

    },
               

};

export const reducer = (state, action) => {
  state = state || initialState;

    if (action.type === receiveEditGradeType) {
        return {
            ...state,
            message: action.message,
            error: action.error
        };
    };

    if (action.type === receiveGetGradeType) {
        return {
            ...state,
            grades : action.grades,
        };
    };

  return state;
};
