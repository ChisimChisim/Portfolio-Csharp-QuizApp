import { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Result extends Component {

  
    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            console.log(this.props.message);
        }

    }
    
  
    render() {
        return (
            <div>
                <h2>{this.props.message}</h2>
                <Link className='btn btn-default' to={`/managehome`}>Back to Add/Edit quiz</Link>
            </div>

        )
    }
}

export default connect(
  state => Object.assign({}, state.quiz, state.category, state.level, state.answer),
 
)(Result);
