import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsQuiz } from '../store/Quiz';
import { Button, Badge } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            select: { question: {}, id: 0, isCorrect: false, text:'', correctId:0, correctText:'' },
            nextQuestion: 'undefined',
            nextAnswers: 'undefined',
            nextCorrect: '',
            nextCorrectId: 0,

        };
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.answerShaffule = this.answerShaffule.bind(this);
    }
    componentDidMount() {
        // This method runs when the component is first added to the page
        const categoryId = parseInt(this.props.match.params.categoryId, 10);
        const levelId = parseInt(this.props.match.params.levelId, 10);
        this.props.requestQuiz(categoryId, levelId);
        this.mount = true;
    }

    handleNextPage = () => {
        if (this.state.select.id !== 0) {
            this.props.saveYourAnswer(this.state.select);

            var item = (this.props.questions.slice(this.state.page + 1, this.state.page + 2))[0].answer;
            for (var i = 0; i < item.length; i++) {
                if (item[i].isCorrect) {
                    var correctId = item[i].id;
                    var correctText = item[i].text;
                    break;
                }
            }

            
            this.setState(state => ({
                nextQuestion: (this.props.questions.slice(state.page + 1, state.page + 2))[0],
                nextAnswers: this.answerShaffule((this.props.questions.slice(state.page + 1, state.page + 2))[0].answer),
                nextCorrect: correctText,
                nextCorrectId: correctId,
            }));
            
            this.setState(state => ({ page: state.page + 1, select: { question: {}, id: 0, text: '', isCorrect: false, correctId:0, correctText:'' } }));
        }

    };

    handleSubmit = () => {
        if (this.state.select.id !== 0) {
            this.props.saveYourAnswer(this.state.select);
        }
        this.props.history.push('/grade');
    };

    handleSelect = (question, id, isCorrect, text, correctId, correctText) => {
        this.setState({ select: { question: question, id: id, isCorrect: isCorrect, text: text, correctId: correctId, correctText: correctText } });
    };

    answerShaffule = (array) => {
            for (var i = array.length - 1; i > 0; i--) {
                var r = Math.floor(Math.random() * (i + 1));
                var tmp = array[i];
                array[i] = array[r];
                array[r] = tmp;
                return array;
            }
   
}

    render() {
        if (this.mount) {
            var nextq;
            var nexta;
            var correct;
            var correctId;
            if (this.state.page === 0) {
                nextq = this.props.firstQuestion;
                nexta = this.props.firstAnswers;
                for (var i = 0; i < nexta.length; i++) {
                    if (nexta[i].isCorrect) {
                        correct = nexta[i].text;
                        correctId= nexta[i].id;
                        break;
                    }
                }
            } else {
                nextq = this.state.nextQuestion;
                nexta = this.state.nextAnswers;
                correct = this.state.nextCorrect;
                correctId = this.state.nextCorrectId;
            }
           
            return (
                
                    <div>
                    <h1>
                        {nextq.category.name} Quiz
                        <Badge bsStyle="primary" style={{ margin: '10px' }}>{nextq.level.name}</Badge>
                            {this.state.page + 1}/{this.props.questions.length}
                    </h1>
                    {renderQuiz(this.state, this.handleSelect, nextq, nexta, correctId, correct)}
                    {renderPage(this.props, this.state, this.handleNextPage, this.handleSubmit)}
                    </div>
            );
        } else {
            return (<p>No data</p>);
        }
    }
}

function renderQuiz(state, handleSelect, nextQuestion, nextAnswers, nextCorrectId, nextCorrect,) {
  return (
      <div>
          {(() => {
                  return (
                      <div>
                          <h4>{nextQuestion.text}</h4>
                          {nextAnswers.map(a =>
                          <p key={a.id} className='clearfix text-center'>
                                  {a.id === state.select.id &&
                                      <Button bsSize='lg' bsStyle="info" block onClick={() => { handleSelect(nextQuestion, a.id, a.isCorrect, a.text, nextCorrectId, nextCorrect) }}>{a.text}</Button>}
                              {a.id !== state.select.id &&
                                      <Button bsSize='lg' bsStyle="default" block onClick={() => { handleSelect(nextQuestion, a.id, a.isCorrect, a.text, nextCorrectId, nextCorrect) }}>{a.text}</Button>}
                          </p>
                          )}
                          </div>
                  );
              
          })()}
</div>
   
  );
}

function renderPage(props, state, handleNextPage, handleSubmit) {

    return <div className='text-center'>
       
        <div style={{margin:"20px"}}>
        {state.page < props.questions.length - 1 &&
                <Button bsStyle="info" onClick={handleNextPage}>Next<Glyphicon glyph="step-forward" /></Button>}
        {state.page === props.questions.length - 1 &&
                    <Button bsStyle="success" onClick={handleSubmit}><Glyphicon glyph="send"/ >Submit</Button>}
            </div>
        <div>
        {state.select.id === 0 &&
            <Alert>
                Please select your answer!
        </Alert>
            }
            </div>
     
    </div>;

}

export default connect(
  state => state.quiz,
  dispatch => bindActionCreators(actionCreatorsQuiz, dispatch)
)(Quiz);
