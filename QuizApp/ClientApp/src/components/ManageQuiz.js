import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsQuiz } from '../store/Quiz';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';


class ManageQuiz extends Component {

    componentDidMount() {
        // This method runs when the component is first added to the page
        const categoryId = parseInt(this.props.match.params.categoryId, 10);
        this.props.requestGetQuizByCategory(categoryId);
    }

  render() {
    return (
        <div>
            <h2>Add/Edit quiz</h2>
            {renderSelectEditQuestion(this.props)}
      </div>
    );
  }
}

function renderSelectEditQuestion(props) {
  return (
      <div>
          <div>
              <Link className='btn btn-primary' to={`/addquiz`}><Glyphicon glyph='save-file' />Add New Quiz</Link>
          </div>
          <table className='table'>
              <thead>
                  <tr>
                      <th>Quiz</th>
                      <th>Category</th>
                      <th>Level</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {props.questions.map(item =>
                      <tr key={item.id}>
                          <td>{item.text}</td>
                          <td>{item.category.name}</td>
                          <td>{item.level.name}</td>
                          <td><Link className='btn btn-default' to={`/editquestion/${item.id}/`}><Glyphicon glyph='edit' />Edit</Link>
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
          <Link className='btn btn-default' to={`/managehome/`}>Back</Link>
                     
  </div>
  );
}

export default connect(
  state => state.quiz,
  dispatch => bindActionCreators(actionCreatorsQuiz, dispatch)
)(ManageQuiz);
