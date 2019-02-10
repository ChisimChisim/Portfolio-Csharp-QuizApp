import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsQuiz } from '../store/Quiz';
import { actionCreatorsCategory } from '../store/Category';
import { actionCreatorsLevel } from '../store/Level';
import { actionCreatorsAnswer } from '../store/Answer';
import { Glyphicon } from 'react-bootstrap';

class EditQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            category: '',
            level: '',
            answers: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeLevel = this.handleChangeLevel.bind(this);
        this.handleChangeAnswers = this.handleChangeAnswers.bind(this);
        this.handleChangeCorrect = this.handleChangeCorrect.bind(this);
        this.handleDeleteQuiz = this.handleDeleteQuiz.bind(this);
    }

    componentDidMount() {
        // This method runs when the component is first added to the page
        const questionId = parseInt(this.props.match.params.questionId, 10);
        this.props.requestGetQuizByQuestionId(questionId);
        this.props.requestGetCategory();
        this.props.requestGetLevel();
        this.props.requestGetAnswerByQuestionId(questionId);
        this.mount = true;
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                question: this.props.selectQuestion.text,
                category: this.props.selectQuestion.categoryId,
                level: this.props.selectQuestion.levelId,
                answers: this.props.selectAnswers,
            });
        }
        
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const newQuiz = {
            ...this.props.selectQuestion,
            text: this.state.question,
            categoryId: this.state.category,
            levelId: this.state.level,
            answer: this.state.answers,
        };

        await this.props.requestEditAnswer(this.state.answers);
        if (!this.props.error) {
            await this.props.requestEditQuiz(newQuiz, newQuiz.id);
        }

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
        const newAnswer = this.state.answers.map(answer => {
            if (answer.id !== id) return answer;
            return { ...answer, text: e.target.value };
        });
        this.setState({ answers: newAnswer });
    }

    handleChangeCorrect = (e) => {
        const newCorrect = this.state.answers.map(answer => {
            if (answer.id == e.target.value) return { ...answer, isCorrect: true };
            return { ...answer, isCorrect: false };
        });
        this.setState({ answers: newCorrect });
    }

    handleDeleteQuiz = async (id) => {
        await this.props.requestDeleteQuiz(id, this.state.answers).then(reponse => {
            this.props.history.push('/result');
        })

    }

    

    render() {
        if (this.mount) {
            return (
                <div>
                    <h2>Edit question and answers</h2>
                    {renderEditQestion(this.props, this.state, this.handleSubmit, this.handleChangeQuestion,
                        this.handleChangeCategory, this.handleChangeLevel, this.handleChangeAnswers,
                        this.handleChangeCorrect, this.handleDeleteQuiz)}
                </div>
            );
        } else {
            return <p>loading....</p>
        }
  }
}

function renderEditQestion(props, state,
    handleSubmit, handleChangeQuestion, handleChangeCategory, handleChangeLevel,
    handleChangeAnswers, handleChangeCorrect, handleDeleteQuiz) {
  return (
      <div>
          <p><b>Selected Question: </b></p>
          <p>{props.selectQuestion.text}</p>

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
                  <label>Answers</label>
                  {state.answers.map(answer =>
                      <div key={answer.id} >
                      <div className="form-check">
                              <input type="radio" name="isCorrect" className="form-check-input" value={answer.id}
                                  checked={answer.isCorrect} onChange={handleChangeCorrect}/>
                             {answer.isCorrect ? <label>Correct Answer!</label> : <label></label>}
                      </div>
                      <div>
                           <input type="text" className="form-control"
                                  value={answer.text || ''} onChange={handleChangeAnswers(answer.id)} />
                      </div>
                      </div>
                     )}
          </div>
        
              <button type="submit" className="btn btn-primary" ><Glyphicon glyph='edit' />Edit Quiz</button>
          </form>
          <button className="btn btn-danger" style={{ marginTop: '10px' }} onClick={() => { handleDeleteQuiz(props.match.params.questionId) }}><Glyphicon glyph='trash' />Delete Quiz</button>
  </div>
  );
}

export default connect(
    state => Object.assign({}, state.quiz, state.category, state.level, state.answer),
    dispatch => bindActionCreators(Object.assign({}, actionCreatorsQuiz,
        actionCreatorsCategory, actionCreatorsLevel, actionCreatorsAnswer), dispatch)
)(EditQuestion);

