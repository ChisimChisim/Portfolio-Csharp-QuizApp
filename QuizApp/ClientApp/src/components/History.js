import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsGrade } from '../store/Grade';
import { Glyphicon, Button } from 'react-bootstrap';


class History extends Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestGetHistory();
    }


    handleDelete = (gradeId) => (e) => {
        e.preventDefault();
        this.props.requestDeleteHistory(gradeId).then(data =>
            this.props.requestGetHistory());
       
    }

    render() {
        return (
            <div>
                <h2>Grade History</h2>
                {renderHistory(this.props, this.handleDelete)}
            </div>

        )
    }
}

function renderHistory(props, handleDelete) {
    return (
        <div>
            {props.grades.map(grade =>

        <div key={grade.id}>      
                    <h4>{grade.date.slice(0, 10)}/{grade.category.name}/{grade.level.name}
                        <Button bsStyle="danger" style={{ margin: '10px' }}
                            onClick={handleDelete(grade.id)}>
                        <Glyphicon glyph="trash" />Delete</Button>
                    </h4>
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
                    {grade.gradeItem.map(item =>
                        <tr key={item.question.id}>
                            {(item.yourAnswerId === item.correctAnswerId) &&
                                <td><Glyphicon glyph='ok'/></td>}
                            {(item.yourAnswerId !== item.correctAnswerId) &&
                                <td><Glyphicon glyph='remove' /></td>}
                            <td>{item.question.text}</td>
                            <td>{item.yourAnswer.text}</td>
                            <td>{item.correctAnswer.text}</td>
                    </tr>
                )}
            </tbody>
                    </table>
                   

                </div>
               
            )}

            </div>

    );
}
export default connect(
    state => state.grade,
    dispatch => bindActionCreators(actionCreatorsGrade, dispatch)
)(History);
