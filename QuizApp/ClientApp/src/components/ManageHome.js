import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreatorsCategory } from '../store/Category';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';



class ManageHome extends Component {

    constructor(props) {
        super(props);

        this.state = {
           name: '',
            message: '',
            error:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // This method runs when the component is first added to the page
        this.props.requestGetCategory();
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name === '') {
            return this.setState({ message: "Please input Category", error: true })
        } else {
            this.setState({ message: "", error: false })
        }
        this.props.requestAddCategory({ name: this.state.name }).then(data =>
            this.props.requestGetCategory());
    }

  render() {
    return (
      <div>
            <h2>Add/Edit quiz</h2>
            {renderAddCategory(this.props, this.state, this.handleSubmit, this.handleChange)}
            {renderSelectCategory(this.props, this.state)}
      </div>
    );
  }
}

function renderAddCategory(props, state, handleSubmit, handleChange) {
    return (
        <div>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Category</label>
                    <input type="text" className="form-control"
                        value={state.name || ''} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginBottom: '10px' }}><Glyphicon glyph='save-file' /> Add New Category</button>
            </form>
        </div>

            <div>
                {state.error &&
                    <Alert>
                        {state.message}
                    </Alert>}
             </div>
        </div>
    )
}

function renderSelectCategory(props) {
    return (
        
      <div>
          {props.categories.map(category => 
              <p className='clearfix text-center' key={category.id}>
                  <Link className='btn btn-default btn-block' to={`/managequiz/${category.id}/`}>{category.name}</Link>
                  </p>
      
                  )}
                     
  </div>
  );
}

export default connect(
  state => state.category,
  dispatch => bindActionCreators(actionCreatorsCategory, dispatch)
)(ManageHome);
