import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsQuiz } from '../store/Quiz';
import { actionCreatorsGrade } from '../store/Grade';
import { Chart } from 'react-google-charts';
import { Glyphicon, Button } from 'react-bootstrap';


class Grade extends Component {

    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = () => {
        var date = new Date();
       
        var grade = {
            date: date,
            categoryId: this.props.categoryId,
            levelId: this.props.levelId,
        }

        this.props.requestAddGrade(grade).then(newId => {

            if (newId !== 0) {
                var gradeItem = [];
                var result = this.props.yourAnswer;
                for (var i = 0; i < result.length; i++) {
                    var item = {
                        questionId: result[i].question.id,
                        yourAnswerId: result[i].id,
                        correctAnswerId: result[i].correctId,
                        gradeId: newId
                    }
                    gradeItem = gradeItem.concat(item);
                }
                this.props.requestAddGradeItem(gradeItem);
            }
        });
        this.props.history.push('/');

    }



    render() {
        return (
            <div>
                <h2>Your score: {this.props.correctCount} / {this.props.yourAnswer.length} </h2>
                <Button bsStyle="primary" style={{ margin: '10px' }}
                    onClick={this.handleSave}>
                    <Glyphicon glyph="save-file" />Save the grade</Button>
                {renderResult(this.props)}
                {renderChart(this.props)}
            </div>

        )
    }
}

function renderChart(props) {
    return (
        <div style={{margin:'0 auto'}}>
            <Chart
                width={'80vmin'}
                height={'80vmin'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Jedge', 'Number'],
                    ['Correct', props.correctCount],
                    ['Incorrect', props.yourAnswer.length - props.correctCount],
                   
                ]}
                options={{
                    //title: 'Your Grade',
                    // Just add this option
                    pieHole: 0.4,
                    chartArea: { left: '10%', top: 0, width: '100%', height: '100%' },
                    legend: {
                        position: 'right', alignment: 'center', textStyle: { color: 'black', fontSize: 16 }},
         
        }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>

    );
}

function renderResult(props) {
    return (
        <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Result</th>
                    <th>Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                </tr>
            </thead>
            <tbody>
                    {props.yourAnswer.map(item =>
                        <tr key={item.question.id}>
                            {item.isCorrect &&
                                <td><Glyphicon glyph='ok'/></td>}
                            {!item.isCorrect &&
                                <td><Glyphicon glyph='remove' /></td>}
                            <td>{item.question.text}</td>
                            <td>{item.text}</td>
                            <td>{item.correctText}</td>
                    </tr>
                )}
            </tbody>
            </table>
            </div>

    );
}
export default connect(
    state => Object.assign({}, state.quiz, state.grade),
    dispatch => bindActionCreators(Object.assign({}, actionCreatorsQuiz,
        actionCreatorsGrade), dispatch)
)(Grade);
