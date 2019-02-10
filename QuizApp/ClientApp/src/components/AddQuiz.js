import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsQuiz } from '../store/Quiz';
import { actionCreatorsCategory } from '../store/Category';
import { actionCreatorsLevel } from '../store/Level';
import { actionCreatorsAnswer } from '../store/Answer';
import { Alert } from 'react-bootstrap';

class EditQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            category: '',
            level: '',
            answers: [{ text: '', isCorrect:true, questionId:'0' },
                { text: '', isCorrect:false, questionId:'0' },
                { text: '', isCorrect:false, questionId:'0' },
                { text: '', isCorrect:false, questionId:'0' },],
            isCorrect: '',
            message: '',
            error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
       
    }

    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestGetCategory();
        this.props.requestGetLevel();
        this.mount = true;
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.categories !== prevProps.categories || this.props.levels !== prevProps.levels) {
           
            if (typeof this.props.categories[0] !== 'undefined' && typeof this.props.levels[0] !== 'undefined') {
                this.setState({
                    category: this.props.categories[0].id,
                    level: this.props.levels[0].id
                }
                );
            }
            
            
        }
    
    }

    handleSubmit = async(e)=> {
        e.preventDefault();
        if (this.state.question === '') {
            return this.setState({ message: "Please input Question", error: true })
        } else {
            this.setState({ message: "", error: false })
        }

        for (var i = 0; i < this.state.answers.length; i++) {
            if (this.state.answers[i].text === '') {
                return this.setState({ message: "Please input all answers", error: true })
            }
            this.setState({ message: "", error: false })
        }

        var newQuiz = { text: this.state.question, categoryId: this.state.category, levelId: this.state.level };
        this.props.requestAddQuiz(newQuiz).then(result => {
         
            if (result !== 0) {
                var answers = this.state.answers;
                for (var i = 0; i < answers.length; i++) {
                    answers[i].questionId = result;
                }
                this.props.requestAddAnswer(answers);
            }
        });
        
        
        
        this.props.history.push('/result');
    };

    handleChangeQuestion = (e) => {
        this.setState({ question: e.target.value });
    }

    handleChangeCategory = (e) => {
        this.setState({ category: e.target.value });
    }

    handleChangeLevel = (e) => {
        this.setState({ level: e.target.value });
    }

    handleChangeAnswers = (id) => (e) => {
        var newAnswers = this.state.answers;
        newAnswers[id].text = e.target.value;
        this.setState({ answers: newAnswers });
    }

    handleChangeCorrect = (e) => {
        var newAnswers = this.state.answers;
        for (var i = 0; i < newAnswers.length; i++) {
            if (i == e.target.value) {
                newAnswers[i].isCorrect = true;
            } else {
                newAnswers[i].isCorrect = false;
            }
        }
        this.setState({ answers: newAnswers });
      
    }

   
    render() {
        if (this.mount) {
            return (
                <div>
                    <h2>Add new quiz</h2>
                    {renderEditQestion(this.props, this.state, this.handleSubmit, this.handleChangeQuestion,
                        this.handleChangeCategory, this.handleChangeLevel, this.handleChangeAnswers,
                        this.handleChangeCorrect)}
                </div>
            );
        } else {
            return <p>loading....</p>
        }
  }
}

function renderEditQestion(props, state,
    handleSubmit, handleChangeQuestion, handleChangeCategory, handleChangeLevel,
    handleChangeAnswers, handleChangeCorrect) {
  return (
      <div>
          <div>
          {state.error &&
              <Alert>
                  {state.message}
        </Alert>
              }
          </div>
          <form onSubmit={handleSubmit}>
         <div className="form-group">
                  <label>Question</label>
                  <input type="text" className="form-control"
                      value={state.question||''} onChange={handleChangeQuestion}/>
         </div>
         <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={state.category} onChange={handleChangeCategory}>
                      {props.categories.map(category =>
                          <option key={category.id} value={category.id}> { category.name }</option>
                  )}
                  </select>
         </div>
         <div className="form-group">
                  <label>Level</label>
                  <select className="form-control" value={state.level} onChange={handleChangeLevel}>
                      {props.levels.map(level =>
                          <option key={level.id} value={level.id} > {level.name}</option>
                      )}
                  </select>
          </div>
          <div className="form-group">
                  <label>Answers1</label>
                      <div className="form-check">
                      <input type="radio" name="isCorrect" className="form-check-input" value='0'
                          checked={state.answers[0].isCorrect} onChange={handleChangeCorrect} />
                             {state.answers[0].isCorrect ? <label>Correct Answer!</label> : <label></label>}
                      </div>
                      <div>
                           <input type="text" className="form-control"
                                  value={state.answers[0].text || ''} onChange={handleChangeAnswers('0')} />
                  </div>

                  <label>Answers2</label>
                  <div className="form-check">
                      <input type="radio" name="isCorrect" className="form-check-input" value='1'
                          checked={state.answers[1].isCorrect} onChange={handleChangeCorrect} />
                      {state.answers[1].isCorrect ? <label>Correct Answer!</label> : <label></label>}
                  </div>
                  <div>
                      <input type="text" className="form-control"
                          value={state.answers[1].text || ''} onChange={handleChangeAnswers('1')} />
                  </div>

                  <label>Answers3</label>
                  <div className="form-check">
                      <input type="radio" name="isCorrect" className="form-check-input" value='2'
                          checked={state.answers[2].isCorrect} onChange={handleChangeCorrect} />
                      {state.answers[2].isCorrect ? <label>Correct Answer!</label> : <label></label>}
                  </div>
                  <div>
                      <input type="text" className="form-control"
                          value={state.answers[2].text || ''} onChange={handleChangeAnswers('2')} />
                  </div>

                  <label>Answers4</label>
                  <div className="form-check">
                      <input type="radio" name="isCorrect" className="form-check-input" value='3'
                          checked={state.answers[3].isCorrect} onChange={handleChangeCorrect} />
                      {state.answers[3].isCorrect ? <label>Correct Answer!</label> : <label></label>}
                  </div>
                  <div>
                      <input type="text" className="form-control"
                          value={state.answers[3].text || ''} onChange={handleChangeAnswers('3')} />
                  </div>

          </div>
              <button type="submit" className="btn btn-primary" >Add Quiz</button>
          </form>
         </div>
  );
}

export default connect(
    state => Object.assign({}, state.quiz, state.category, state.level, state.answer),
    dispatch => bindActionCreators(Object.assign({}, actionCreatorsQuiz,
        actionCreatorsCategory, actionCreatorsLevel, actionCreatorsAnswer), dispatch)
)(EditQuestion);

